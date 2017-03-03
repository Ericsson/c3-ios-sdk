import JSQMessagesViewController
import SDWebImage

class AsyncPhotoMediaItem: JSQMediaItem {

    var image: UIImage?

    private let asyncImageView = UIImageView()

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override init!(maskAsOutgoing: Bool) {
        super.init(maskAsOutgoing: maskAsOutgoing)
    }

    init(withUrl url: String, isOutgoing: Bool) {
        super.init()

        let imageSize = mediaViewDisplaySize()

        asyncImageView.frame = CGRect(x: 0, y: 0, width: imageSize.width, height: imageSize.height)
        asyncImageView.contentMode = .scaleAspectFill
        asyncImageView.clipsToBounds = true
        JSQMessagesMediaViewBubbleImageMasker.applyBubbleImageMask(toMediaView: asyncImageView, isOutgoing: isOutgoing)

        let activityIndicator = JSQMessagesMediaPlaceholderView.withActivityIndicator()
        activityIndicator?.frame = asyncImageView.frame
        asyncImageView.addSubview(activityIndicator!)

        asyncImageView.sd_setImage(with: URL(string: url)!, completed: { image, _, _, url in
            self.image = image

            if let _ = image {
                activityIndicator?.removeFromSuperview()
            }
        })
    }

    override func mediaView() -> UIView! {
        return asyncImageView
    }

    override func mediaHash() -> UInt {
        return UInt(bitPattern: hash)
    }
}
