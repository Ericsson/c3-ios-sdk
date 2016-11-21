import C3Lib
import IGIdenticon
import JSQMessagesViewController

class ChatViewController: JSQMessagesViewController {

    weak var room: C3Room?
    weak var client: C3Client?
    weak var user: C3User?

    var messages = [JSQMessage]()
    
    var factory = JSQMessagesBubbleImageFactory()
    
    var outgoingBubbleImageView: JSQMessageBubbleImageDataSource?
    var incomingBubbleImageView: JSQMessageBubbleImageDataSource? 
    var avatarGenerator: IGImageGenerator?
    var avatars = [String:JSQMessagesAvatarImage]()

    override func viewDidLoad() {
        super.viewDidLoad()

        outgoingBubbleImageView = factory?.outgoingMessagesBubbleImage(with: UIColor.jsq_messageBubbleBlue())
        incomingBubbleImageView = factory?.incomingMessagesBubbleImage(with: UIColor.jsq_messageBubbleLightGray())
        
        avatarGenerator = IGImageGenerator(imageProducer: IGGitHubIdenticon(), hashFunction: { IGJenkinsHashFromData($0!) })

        room?.on("event:m.room.message", target: self, callback: #selector(handleRoomMessage))
        room?.on("typing", target: self, callback: #selector(handleTypingEvent))
        
        DispatchQueue.global(qos: .default).async {
            self.room?.events.forEach { self.parseAndAddEvent($0) }
            self.loadEvents()
        }
    }

    override func collectionView(_ collectionView: JSQMessagesCollectionView!, messageDataForItemAt indexPath: IndexPath!) -> JSQMessageData! {
        return messages[indexPath.row]
    }

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return messages.count
    }

    override func collectionView(_ collectionView: JSQMessagesCollectionView!, messageBubbleImageDataForItemAt indexPath: IndexPath!) -> JSQMessageBubbleImageDataSource! {
        let message = messages[indexPath.item]
        if message.senderId == senderId {
            return outgoingBubbleImageView
        } else {
            return incomingBubbleImageView
        }
    }

    override func collectionView(_ collectionView: JSQMessagesCollectionView!, avatarImageDataForItemAt indexPath: IndexPath!) -> JSQMessageAvatarImageDataSource! {
        let message = messages[indexPath.item]
        if let imageData = avatars[message.senderId] {
            return imageData
        }
        
        guard let user = client?.user(withId: message.senderId) else {
            return nil
        }
        
        if let avatar = user.avatar {
            let imageData = JSQMessagesAvatarImage(
                avatarImage: UIImage(data: try! Data(contentsOf: URL(string: avatar.uri)!)),
                highlightedImage: nil,
                placeholderImage: avatarGenerator?.image(from: user.name, size: CGSize(width: 25.0, height: 25.0)))
            avatars[message.senderId] = imageData
            return imageData
        } else {
            return JSQMessagesAvatarImage(placeholder: avatarGenerator?.image(from: user.name, size: CGSize(width: 25.0, height: 25.0)))
        }
    }

    override func didPressSend(_ button: UIButton!, withMessageText text: String!, senderId: String!, senderDisplayName: String!, date: Date!) {
        room?.send(["body": text, "msgtype": "m.text"], success: { _ in
            print("Did send message")
            self.finishSendingMessage()
        }, failure: {
            print("Did fail to send message: \($0.localizedDescription)")
        })
    }

    @objc func handleRoomMessage(_ event: C3Event) {
        parseAndAddEvent(event)
    }
    
    @objc func handleTypingEvent() {
        showTypingIndicator = (room?.typing.count ?? 0) > 0
        scrollToBottom(animated: true)
    }
    
    private func loadEvents() {
        room?.load(count: UInt.max, chunkSize: 100, filterFunction: { $0.type == "m.room.message" }, success: { events in
            print("Did receive \(events.count) events")
            events.forEach {
                if $0.type != "m.room.message" {
                    return
                }
                
                self.parseAndAddEvent($0)
            }
            
            if events.count == 100 {
                self.loadEvents()
            }
        }, failure: { error in
            print("Did fail to load events: \(error.localizedDescription)")
        })
    }
    
    private func parseAndAddEvent(_ event: C3Event) {
        guard let text = event.content["body"] as? String else {
            return
        }
        
        let message = JSQMessage(
            senderId: event.sender.id,
            senderDisplayName: event.sender.name,
            date: Date(timeIntervalSince1970: event.timeInterval),
            text: text)!
        let index = messages.insertionIndexOf(elem: message) { $0.date.compare($1.date) }
        messages.insert(message, at: index)
        
        finishReceivingMessage()
    }
}

private extension Array {
    
    func insertionIndexOf(elem: Element, compare: (Element, Element) -> ComparisonResult) -> Int {
        var lo = 0
        var hi = self.count - 1
        while lo <= hi {
            let mid = (lo + hi)/2
            if compare(self[mid], elem) == .orderedAscending {
                lo = mid + 1
            } else if compare(elem, self[mid]) == .orderedAscending {
                hi = mid - 1
            } else {
                return mid
            }
        }
        return lo
    }
}
