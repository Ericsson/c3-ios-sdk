# Ericsson Contextual Communication Cloud iOS SDK
[![Version](https://img.shields.io/cocoapods/v/C3Lib.svg?style=flat)](https://cocoapods.org/pods/C3Lib)
[![License](https://img.shields.io/cocoapods/l/C3Lib.svg?style=flat)](https://cocoapods.org/pods/C3Lib)
[![Platform](https://img.shields.io/cocoapods/p/C3Lib.svg?style=flat)](https://cocoapods.org/pods/C3Lib)
[![Downloads](https://img.shields.io/cocoapods/dt/C3Lib.svg?style=flat)](https://cocoapods.org/pods/C3Lib)
[![Apps](https://img.shields.io/cocoapods/at/C3Lib.svg?style=flat)](https://cocoapods.org/pods/C3Lib)

If you have questions about Ericsson Contextual Communication Cloud, feel free to reach out at https://discuss.c3.ericsson.net/

## Example

To run the example project, clone the repository, and run `pod install` from the Example directory first.

## Installation

C3Lib is available through [CocoaPods](http://cocoapods.org). To install
it, simply add the following line to your Podfile:

```ruby
pod "C3Lib"                                                                                                                                                      
```

## Requirements.

In order to be able to use the C3Lib framework, you will need to have access to the following prerequisites:
* [Xcode](https://developer.apple.com/xcode/) >= 8 (you can check which version you have by launching Xcode and selecting `About Xcode` from the Xcode menu)
* [CocoaPods](http://cocoapods.org) >= 1.0.0 (you can check which version you have by launching the Terminal app and typing `pod --version` in the terminal window
* iOS >= 8

## Usage

C3Lib framework comes with an introductory document which guides you through the basic use cases. You will find it [here](Documentation/).

The `Client` is the starting point for every application, and manages state and connection to a server.

```swift
let client = Client()
```

A client is authenticated using a `AuthInfo` object, which can be acquired in different ways. The `Auth` class contains some static methods with common authentication methods. Let's start by logging on to a user that was previously registered using `Auth.register()`.

```swift
Auth.login(as: "foo",
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
Check out the full documentation [here](Documentation/).

## Author

Ericsson AB

## License

The C3Lib example is available under the BSD-2 license. See the LICENSE file for more info.
