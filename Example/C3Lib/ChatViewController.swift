import cct
import DZNEmptyDataSet
import IGIdenticon
import JSQMessagesViewController
import JTSImageViewController
import SDWebImage

class ChatViewController: JSQMessagesViewController {

    weak var room: Room?
    weak var client: Client?

    var messages = [JSQMessage]()

    var factory = JSQMessagesBubbleImageFactory()

    var outgoingBubbleImageView: JSQMessageBubbleImageDataSource?
    var incomingBubbleImageView: JSQMessageBubbleImageDataSource?
    var avatars = [String: JSQMessagesAvatarImage]()

    var imagePickerController: UIImagePickerController?

    let refreshControl = UIRefreshControl()

    override func viewDidLoad() {
        super.viewDidLoad()

        if #available(iOS 11.0, *) {
            navigationItem.largeTitleDisplayMode = .never
        }

        guard let room = room else {
            return
        }

        collectionView.emptyDataSetSource = self
        collectionView.emptyDataSetDelegate = self

        updateTitle()

        automaticallyScrollsToMostRecentMessage = false

        outgoingBubbleImageView = factory?.outgoingMessagesBubbleImage(with: UIColor.ericssonBlue)
        incomingBubbleImageView = factory?.incomingMessagesBubbleImage(with: UIColor.jsq_messageBubbleLightGray())

        room.on("name", target: self, callback: #selector(updateTitle))
        room.on("topic", target: self, callback: #selector(updateTitle))
        room.on("event:m.room.message", target: self, callback: #selector(onRoomMessage))
        room.on("typing", target: self, callback: #selector(onTypingEvent))

        refreshControl.attributedTitle = NSAttributedString(
            string: "Load more messages",
            attributes: [NSForegroundColorAttributeName: UIColor.lightGray])
        refreshControl.addTarget(self, action: #selector(onPullToRefresh), for: .valueChanged)
        collectionView.addSubview(refreshControl)

        if room.events.count == 0 && !room.allEventsLoaded {
            print("Will load remote events")

            loadMoreEvents(scrollToBottom: true)
        } else {
            DispatchQueue.global(qos: .background).async {
                print("Will read \(room.events.count) local events")

                self.messages = room.events.flatMap(self.jsqMessageFromC3Event).reversed()

                DispatchQueue.main.async {
                    self.finishReceivingMessage()

                    self.scrollToBottom(animated: false)

                    if room.allEventsLoaded {
                        self.refreshControl.removeFromSuperview()
                    }
                }
            }
        }
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showSettings" {
            guard let controller = segue.destination as? RoomDetailsViewController else {
                return
            }

            controller.client = client
            controller.room = room
        }
    }

    override func willMove(toParentViewController parent: UIViewController?) {
        if parent == nil {
            room?.off("name", target: self)
            room?.off("topic", target: self)
            room?.off("event:m.room.message", target: self)
            room?.off("typing", target: self)

            room = nil
            client = nil

            outgoingBubbleImageView = nil
            incomingBubbleImageView = nil
        }
    }

    override func collectionView(_ collectionView: UICollectionView,
                                 cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = super.collectionView(collectionView, cellForItemAt: indexPath)

        if let cell = cell as? JSQMessagesCollectionViewCell {
            let message = messages[indexPath.row]

            if message.senderId == senderId {
                cell.textView?.textColor = UIColor.white
            } else {
                cell.textView?.textColor = UIColor.black
            }
        }

        return cell
    }

    override func collectionView(_ collectionView: JSQMessagesCollectionView!,
                                 messageDataForItemAt indexPath: IndexPath!) -> JSQMessageData! {
        return messages[indexPath.row]
    }

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return messages.count
    }

    override func collectionView(_ collectionView: JSQMessagesCollectionView!,
                                 messageBubbleImageDataForItemAt path: IndexPath!) -> JSQMessageBubbleImageDataSource! {
        let message = messages[path.item]
        if message.senderId == senderId {
            return outgoingBubbleImageView
        } else {
            return incomingBubbleImageView
        }
    }

    override func collectionView(_ collectionView: JSQMessagesCollectionView!,
                                 avatarImageDataForItemAt indexPath: IndexPath!) -> JSQMessageAvatarImageDataSource! {
        let message = messages[indexPath.item]

        if let imageData = avatars[message.senderId] {
            return imageData
        }

        guard let user = client?.user(withId: message.senderId) else {
            return nil
        }

        let avatar = JSQMessagesAvatarImage(placeholder: Identicon.instance.icon(
            from: user.name,
            size: CGSize(width: 30.0, height: 30.0)))
        avatars[message.senderId] = avatar

        if let uri = user.avatar?.thumbnail(width: 30.0, height: 30.0, resizeMethod: .crop),
            let url = URL(string: uri) {

            SDWebImageDownloader.shared().downloadImage(
                with: url,
                options: [.useNSURLCache],
                progress: nil,
                completed: { image, _, _, _ in
                    if let image = image {
                        avatar?.avatarImage = image
                        collectionView.reloadData()
                    }
            })
        }

        return avatar
    }

    override func didPressSend(_ button: UIButton!,
                               withMessageText text: String!,
                               senderId: String!,
                               senderDisplayName: String!,
                               date: Date!) {
        room?.send(Message(text), success: { _ in
            print("Did send message")

            self.messages.append(
                JSQMessage(
                    senderId: senderId,
                    senderDisplayName:
                    senderDisplayName,
                    date: Date(),
                    text: text))
            self.finishSendingMessage()
        }, failure: {
            print("Did fail to send message: \($0.reason)")
        })
    }

    override func didPressAccessoryButton(_ sender: UIButton!) {
        if imagePickerController == nil {
            imagePickerController = UIImagePickerController()
            imagePickerController?.allowsEditing = false
            imagePickerController?.sourceType = .photoLibrary
            imagePickerController?.delegate = self
        }
        present(imagePickerController!, animated: true)
    }

    @objc func onPullToRefresh() {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            self.loadMoreEvents(scrollToBottom: false)
        }
    }

    @objc func updateTitle() {
        if let topic = room?.topic, topic.characters.count > 0 {
            title = "\(topic) (\(room!.name ?? room!.alias ?? room!.id))"
        } else {
            title = "\(room!.name ?? room!.alias ?? room!.id)"
        }
    }

    @objc func onRoomMessage(_ event: Event) {
        guard event.sender.id != senderId else {
            return
        }

        guard let jsqMessage = jsqMessageFromC3Event(event) else {
            return
        }

        messages.append(jsqMessage)
        finishReceivingMessage()
    }

    @objc func onTypingEvent() {
        if let typing = room?.typing {
            if let _ = typing.index(of: client!.user!) {
                if typing.count == 1 {
                    print("Our own user is typing, hiding typing indicator")
                    showTypingIndicator = false
                } else {
                    print("Someone else is typing together with out own user")
                    showTypingIndicator = true
                }
            } else
                if typing.count == 0 {
                    print("Nobody is typing, hiding typing indicator")
                    showTypingIndicator = false
                } else {
                    print("Someone else is typing, showing typing indicator")
                    showTypingIndicator = true
            }
        } else {
            print("Nobody is typing, hiding typing indicator")
            showTypingIndicator = false
        }
    }

    private func loadMoreEvents(scrollToBottom: Bool) {
        self.room?.load(count: 10, chunkSize: 1000, filterFunction: { $0.type == "m.room.message" }, success: { events in
            DispatchQueue.global(qos: .default).async {
                print("Did receive \(events.count) events")

                self.messages.insert(contentsOf: events.flatMap(self.jsqMessageFromC3Event).reversed(), at: 0)

                DispatchQueue.main.async {
                    self.refreshControl.endRefreshing()
                    self.finishReceivingMessage()

                    if let allEventsLoaded = self.room?.allEventsLoaded, allEventsLoaded {
                        self.refreshControl.removeFromSuperview()
                    }

                    if scrollToBottom {
                        self.scrollToBottom(animated: false)
                    } else {
                        self.scroll(to: IndexPath(row: max(0, events.count - 1), section: 0), animated: false)
                    }
                }
            }
        }, failure: { error in
            print("Did fail to load events: \(error.reason)")
        })
    }

    private func jsqMessageFromC3Event(_ event: Event) -> JSQMessage? {
        guard let message = Message.fromEvent(event) else {
            return nil
        }

        let jsqMessage: JSQMessage
        if let message = message as? MediaMessage,
            let url = client?.parseResourceUri(message.url) {
            let media = AsyncPhotoMediaItem(withUrl: url, isOutgoing: event.sender.id == senderId)

            jsqMessage = JSQMessage(
                senderId: event.sender.id,
                senderDisplayName: event.sender.name,
                date: Date(timeIntervalSince1970: event.timeInterval),
                media: media)!
        } else {
            jsqMessage = JSQMessage(
                senderId: event.sender.id,
                senderDisplayName: event.sender.name,
                date: Date(timeIntervalSince1970: event.timeInterval),
                text: message.body)!
        }

        return jsqMessage
    }

    override func collectionView(_ collectionView: JSQMessagesCollectionView!,
                                 didTapMessageBubbleAt indexPath: IndexPath!) {
        let message = messages[indexPath.row]

        guard let media = message.media as? AsyncPhotoMediaItem else {
            return
        }

        guard let image = media.image else {
            return
        }

        let imageInfo = JTSImageInfo()
        imageInfo.altText = message.text
        imageInfo.image = image
        imageInfo.referenceRect = media.mediaView().superview!.convert(media.mediaView().frame, to: nil)
        imageInfo.referenceView = view
        let controller = JTSImageViewController(imageInfo: imageInfo, mode: .image)
        controller?.show(from: self, transition: .fromOriginalPosition)
    }

    override func textViewDidChange(_ textView: UITextView) {
        super.textViewDidChange(textView)

        let typing = textView.text.characters.count > 0

        print("Will update typing notification to \(typing)")
        room?.setTyping(typing, success: { _ in
            print("Did update typing notification")
        }, failure: { error in
            print("Did fail to update typing notification: \(error.reason)")
        })
    }
}

extension ChatViewController: DZNEmptyDataSetSource, DZNEmptyDataSetDelegate {

    func title(forEmptyDataSet scrollView: UIScrollView!) -> NSAttributedString! {
        if let allEventsLoaded = room?.allEventsLoaded, allEventsLoaded {
            let string = NSMutableAttributedString()
            string.append(NSAttributedString(
                string: "No messages in this chat",
                attributes: [NSFontAttributeName: UIFont.systemFont(ofSize: 20.0)]))
            string.append(NSAttributedString(
                string: "\n\nWrite something to your friends!",
                attributes: [NSFontAttributeName: UIFont.systemFont(ofSize: 14.0)]))
            return string
        } else {
            let string = NSMutableAttributedString()
            string.append(NSAttributedString(
                string: "Loading chat history…",
                attributes: [NSFontAttributeName: UIFont.systemFont(ofSize: 20.0)]))
            string.append(NSAttributedString(
                string: "\n\nThis may take a while, depending\non your internet connection quality.",
                attributes: [NSFontAttributeName: UIFont.systemFont(ofSize: 14.0)]))
            return string
        }
    }

    func image(forEmptyDataSet scrollView: UIScrollView!) -> UIImage! {
        return #imageLiteral(resourceName: "ChatImage")
    }

    func imageTintColor(forEmptyDataSet scrollView: UIScrollView!) -> UIColor! {
        return UIColor.lightGray
    }
}

extension ChatViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    public func imagePickerController(_ picker: UIImagePickerController,
                                      didFinishPickingMediaWithInfo info: [String : Any]) {
        picker.dismiss(animated: true)

        guard let image = info[UIImagePickerControllerOriginalImage] as? UIImage else {
            return
        }

        let data = UIImagePNGRepresentation(image)!

        let _ = client?.uploadMedia(data, ofType: "image/png", success: { resource in
            self.room?.send(
                ["msgtype": "m.image", "url": resource.resourceUri, "body": resource.resourceUri],
                success: { _ in
                    print("Did send image")
            }, failure: {
                print("Did fail to send message: \($0.reason)")
            })
        }, failure: { error in
            let controller = UIAlertController(
                title: "Warning",
                message: error.reason,
                preferredStyle: .alert)
            controller.view.tintColor = UIColor.ericssonBlue
            controller.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default))
            self.present(controller, animated: true)
        })

        let media = JSQPhotoMediaItem(image: image)

        messages.append(JSQMessage(
            senderId: senderId,
            senderDisplayName: senderDisplayName,
            date: Date(),
            media: media)!)

        finishSendingMessage()
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
