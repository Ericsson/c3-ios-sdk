# Contextual Communication Toolbox Library

This is an introduction and a general overview of the client-side Swift/Objective-C framework that is used for building Ericsson C3 apps. There are also an example application availabile, as well as an [API Reference](http://htmlpreview.github.com/?https://github.com/Ericsson/c3-ios-sdk/blob/master/Documentation/reference/index.html).

A basic knowledge of [Swift](http://www.apple.com/se/swift/) is needed to follow this guide. The API is callback based, so most methods take success and failure callbacks and don't return anything.

## Introduction

After including `C3Lib` in your project, the first step is to create a `C3Client`. The client is the starting point for every application, and manages state and connection to a server.

```swift
let client = C3Client()
```

## Authentication

A client is authenticated using a `C3AuthInfo` object, which can be acquired in different ways. The `C3Auth` class contains some static methods with common authentication methods. Let's start by logging on to a user that was previously registered using `C3Auth.register()`.

```swift
C3Auth.login(as: "foo",
             password:  "password123",
             serverUrl: "https://example.com",
             success: { authInfo in
    client.auth(authInfo, success: { client in
        print("Authenticated with user id: \(client.user!.id)")
    }, failure: { error in
        print("Failed to authenticate user: \(error.localizedDescription)")
    })
}, failure: { error in
    print("Failed to authenticate user: \(error.localizedDescription)")
})
```

Once authenticated, we can change our display name and status.

```swift
client.setName("Test User", success: { client in
    client.setStatus("Ready to roll", ...)
})
```

## Events

Many classes in C3Lib make use to the `C3EventEmitter` interface. In general, classes that have members that change over time will emit an event with the same name whenever the value is changed.

For example, `client.state` indicates the current connection state of the client. Try setting the following listener before authenticating the client:
```swift
client.on("state", target: self, callback: #selector(onStateChange))

...

@objc func onStateChange(_ stateNumber: NSNumber) {
   let state = C3ClientConnectionState(rawValue: stateNumber.intValue)!
   let name: String                                                                                            
   switch state {
   case .inactive:     name = "inactive"
   case .connecting:   name = "connecting"
   case .connected:    name = "connected"
   case .disconnected: name = "disconnected"
   }

    print("New client state: \(name)")
}
```

## Users
Users are represented by instances of the `C3User` class, which have an `id`, `name`, and `avatar`. There is also presence information available via `presence`, `lastActive`, and `statusMessage`. All of these properties have matching events that are emitted whenever a property is changed, except for id.

Users are identified by an id with the format `@<localId>:<serverName>`. The `localId` uniquely identifies the user on the server where the user is registered, while the `serverName` typically is the hostname of the server, e.g. `@foo:example.com`. When creating and authenticating users, the value of the `localId` will depend on what authentication method is used. As an example, users registered with `C3Auth.register()` will get a `localId` that is equal to the `username` that is used.

The client's own user is accessible via `client.user`, although modifications to the user are done via the client, e.g. with `client.setName()`. It is also safe to compare users directly with `===`, as there is only a single instance for each user per client. Note that this is limited to users from the same client.

## Rooms

The communication is built around a room metaphor. Every user can participate in any number of rooms. They are the central component that connect users together, and where all direct communication takes place.

Rooms have a lot of different properties that can be set at creation and usually changed anytime afterwards as well. An example is `room.name`, which is a human-readable name of the room that doesn't have to be unique.

The most important room property is `room.id`, which is a globally unique identifier for the room that is generated when the room is created. Rooms can be accessed by id via either `client.fetchRoom(withId:)` or `client.room(withId:)`. The difference between the two is that `client.fetchRoom(withId:)` will do a roundtrip to the server to check if the room exists, while `client.room(withId:)` returns instantly, but subsequent actions, e.g. joining, might fail if the room doesn't exist. In general `client.room(withId:)` should be used when the application logic is set up in such a way that you can be sure that the room exists, while `client.fetchRoom(withId:)` will be more straightforward to use when e.g. getting the room id from user input.

Let's create a room with the name `"Test room"`.

```swift
client.createRoom(name: "Test room", success: { room in
    print("Created a room: \(room.id)")
}, failure: { error in
    print("Failed to create room: \(error.localizedDescription)")
})
```

## Joinig a room

By default, users can only join rooms they have been invited to. If we wanted to invite `"@foo:example.com"` to our room, we would do that using `room.invite()`:

```swift
if let user = client.user(withId: "@foo:example.com") {
    room.invite(user, success: { _ in
        print("Invited Foo")
    }, ...)
}
```

This could also be done at room creation using the invite option of `client.createRoom()`.

On foo's end, this would show up as a new room in the `client.rooms` list, and also be emitted via the `invite` event of the client. This lets foo wait for incoming invites

```swift
fooClient.on("invite", target: self, callback: #selector(onInvite))

...

@objc func onInvite(_ room: C3Room) {
    print("Got invited to the room \(room.name ?? room.id), joining!")
    room.join(success: { room in
        print("Joined room \(room.name ?? room.id)")
    }, ...)
}
```

When invited, it is only possible to see some limited information about the room, namely `room.invitedBy`, `room.name`, `room.joinRule`, `room.alias`, and your own `room.membership`.

## Room join rules

Another way to let Foo access the room would be to open up the room so that anyone that has the room id can join it. This is done by setting the `room.joinRule` to `.open` using `room.setJoinRule()`, which can also be done at room creation with the `joinRule` option.

We can now send the room id to Foo via another room, email, or some other communication channel, and once Foo receives the room id it can be joined directly.

```swift
fooClient.room(withId: roomIdFromEmail)?.join(success: { room in
    print("Joined room \(room.name ?? room.id)")
}, failure: { error in
    print("Failed to join room: \(error.localizedDescription)")
})
```

## Messaging

Rooms support text messaging through `events` that can contain arbitrary data (not to be confused with `C3EventEmitter` events). Every event has a `type` and `content`, and every client can choose to interpret events in any way they like. The events also have other information like the sender, timestamp, and whether it's your own event.

The standard type for message events is `"m.room.message"`, while the content should be an object with the `"body"` and `"msgtype"` keys. For text messages the `"msgtype"` should be set to `"m.text"`, and the `"body"` should be the text content of the message.

This is how you would list all text messages, and then listen for new ones.

```swift
func logTextMessage(_ message: C3Event) {
   if let type = message.content["msgtype"] as? String, type == "m.text" {
        if let body = message.content["body"] as? String {
            print("\(message.sender.name ?? message.sender.id) says \(body)")
        }
    }
}

...

room.events.filter { $0.type == "m.room.message" }.forEach(logTextMessage)

...

room.on("event:m.room.message", target: self, callback: #selector(logTextMessage))
```

## Loading old events

When joining a room with a long event history only a small portion of the history is loaded to begin with. It is possible to load in more events using the `load()` method.

```swift
// load in 10 more events
room.load(count: 10, success: { events in
    // Past events that are loaded in will not be emitted as events.
    // If we want to handle the events individually we have to do it here.
    events.filter { $0.type == "m.room.message" }.forEach(logTextMessage)
}, ...)
```

## Sending messages

To send any type of event you use the `send()` method. It takes two arguments, the first one being the type of the event, which for a message would be `"m.room.message"`, and then the content of the event, which in out case will be an object with the `"body"` and `"msgtype"` keys.

```swift
room.send([
    "msgtype": "m.text",
    "body": "This is a text message"
], type: "m.room.message", ...)
```

## Room State

In addition to events, rooms also have states, which are pieces of persistant information tied to a room. The difference between a room state and event is that the current state of the room is always available if you're a member of the room. While you have to scroll back in the history of the room to find past events, states can be accessed directly, which makes them a better fit for storing things like room metadata and other application specific information within a room. In fact, room properties like `room.name`, `room.joinRule`, and `room members`, are all internally represented by room states.

Just like events, states also have a `type` and `content`, but they may optionally also have a `stateKey`, which can be used to differentiate between different states of the same type.

When a state in a room is changed, a matching event will be emitted, with both the new and the old state of the room. For example, it's possible to look at the history of name changes of a room by looking at all events of the type 'm.room.name'.

```swift
room.events.filter { $0.type == "m.room.name" }.forEach {
    // There might not be any old content
    let oldName = $0.oldContent?["name"] as? String ?? "nil"
    let newName = $0.content["name"] as? String ?? "nil"
    print("Changed name from \(oldName) to \(newName)")
}
```

## WebRTC

WebRTC is a technology that enables realtime peer-to-peer communication directly between browsers and other clients and services. It supports both audio & video calls as well as generic data transferring. If you want to know more WebRTC you can read [this](https://www.html5rocks.com/en/tutorials/webrtc/basics/) article, which covers the basics of WebRTC.

All webrtc communication in C3Lib happens within a call, which are represented by the `C3Call` class. A call always takes place between two users within the context of a room. A user can have multiple calls active at the same time, and there can also be multiple simultaneous calls between different users in a single room.

## Setting up a call

Calls always take place in a room between two users, so to start a call we first need to make sure we're in a room together with the person whom we want to call. Calls are initiated with `room.startCall()`, which requires the callee to be passed as the first parameter. Let's just call the first person in the room.

```swift
let call = room.startCall(with: room.otherMembers.first!)
```

## Call attachments

Once we've created a call object, we can attach local sources using to `call.setLocalSource()`, and get remotely attached sources using `call.remoteSource()`. The attachement point of a source is identified by a name, and there can only be one local source attached for each point at the same time. To create a self-view and attach it to the call we do the following:

```swift
call.setLocalSource(localMedia, as: "foo");
```

In the above code the first argument to `call.setLocalSource()`, `"foo"`, is the name of the attachment point. The remote peer can now get a reference to the first user's self-view by calling `call.remoteSource()` with the argument `"foo"`, and then render it to a remote view as follows:

```swift
let remoteView: UIView

...

let remoteMedia = call.remoteSource("foo").connect(to: remoteView)
```

## Answering calls

In the callee's end, we can detect the incoming call via either the client `call` or room `call` event. Incoming calls need to be `started` before the call setup is initiated, and they can also be ignored, `closed` or `hung up`. Apart from starting the call, the setup is identical to an outgoing call:

```swift
let remoteView: UIView

...

@objc func onCall(_ call: C3Call) {
    // Before starting we can e.g. inspect call.room and call.peer
    call.start()
    call.setLocalSource(localMedia, as: "media")
    call.remoteSource("media").connect(to: remoteView)
}

...

client.on("call", target: self, callback: #selector(onCall))
```
