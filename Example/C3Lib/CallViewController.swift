import cct
import Foundation
import UIKit

class CallViewController: UIViewController {

    var mediaSource: DeviceSource?
    var client: Client?
    var call: Call?
    var conference: Conference?
    var audioDetected = false
    var thumbnailBroadcaster: ThumbnailBroadcaster?

    var userAgent: DataShare?
    var muteState: DataShare?

    @IBOutlet var mainView: UIView?
    @IBOutlet var cameraPositionButton: UIButton?
    @IBOutlet var thumbnailViews: UIScrollView?

    override func viewDidLoad() {
        super.viewDidLoad()

        mediaSource = DeviceSource(constraints: MediaConstraints()
            .with(minWidth: 320, maxWidth: 800)
            .with(minHeight: 240, maxHeight: 600)
            .with(minFrameRate: 10, maxFrameRate: 30)
            .with(autoGainControl: true)
            .with(echoCancellation: true)
            .with(noiseSuppression: true))

        if mediaSource?.cameraPosition == .none {
            cameraPositionButton?.isEnabled = false
        }

        if let call = call {
            let view = createThumbnailView(for: client!.user!.id)
            mediaSource?.connect(to: view)

            call.setLocalSource(mediaSource!, as: "main")
            call.remoteSource("main").connect(to: mainView!)

            call.once("closed", target: self, callback: #selector(onClosed))
        } else if let conference = conference {
            initBroadcasters(for: conference)
        }
    }
    
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }

    @IBAction func pressedCameraSwitchButton(_ button: UIButton) {
        if mediaSource!.cameraPosition == .back {
            mediaSource!.cameraPosition = .front
        } else if mediaSource!.cameraPosition == .front {
            mediaSource!.cameraPosition = .back
        }
    }

    @IBAction func pressedHangupButton(_ button: UIButton) {
        if let call = call {
            call.hangup()
        } else if let conference = conference {
            conference.close()
            dismiss(animated: true) {
                self.cleanup()
            }
        }
    }

    @IBAction func pressedMuteButton(_ button: UIButton) {
        if mediaSource!.muteAudio {
            mediaSource!.muteAudio = false
            button.setImage(#imageLiteral(resourceName: "UnmuteIcon"), for: .normal)
        } else {
            mediaSource!.muteAudio = true
            button.setImage(#imageLiteral(resourceName: "MuteIcon"), for: .normal)
        }

        muteState?.set(NSNumber(value: mediaSource!.muteAudio), for: client!.user!.id)
    }
}

private extension CallViewController {

    @objc func onUserAgentUpdate(_ update: DataUpdate) {
        if let view = thumbnailViews?.viewWithTag(update.key.hash) as? ThumbnailView,
            let value = update.value as? [String: Any] {
            decorate(view: view, for: update.key, withUserAgent: value)
        }
    }
    
    @objc func onMuteStateUpdate(_ update: DataUpdate) {
        if let view = thumbnailViews?.viewWithTag(update.key.hash) as? ThumbnailView,
            let value = update.value as? NSNumber {
            view.isMuted = value.boolValue
        }
    }

    func initBroadcasters(for conference: Conference) {
        userAgent = DataShare()
        userAgent?.on("update", target: self, callback: #selector(onUserAgentUpdate))
        conference.attach(userAgent!, as: "userAgent")

        var systemInfo = utsname()
        uname(&systemInfo)
        let machineMirror = Mirror(reflecting: systemInfo.machine)
        let identifier = machineMirror.children.reduce("") { identifier, element in
            guard let value = element.value as? Int8, value != 0 else { return identifier }
            return identifier + String(UnicodeScalar(UInt8(value)))
        }

        var info: [String: Any] = [
            "platform": UIDevice.current.systemName,
            "device": identifier,
            "webview": false
        ]

        if let browser = Bundle.main.infoDictionary?["CFBundleName"] as? String {
            info["browser"] = browser
        }

        if let version = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String {
            info["version"] = version
        }

        userAgent?.set(info, for: client!.user!.id)

        muteState = DataShare()
        muteState?.on("update", target: self, callback: #selector(onMuteStateUpdate))
        conference.attach(muteState!, as: "muteState")
        
        let mediaSplitter = StreamSplitter()
        mediaSource?.connect(to: mediaSplitter)

        thumbnailBroadcaster = ThumbnailBroadcaster(
            projectionConfiguration: ProjectionConfiguration(width: 100),
            frameRate: 1.0)
        let renderer = thumbnailBroadcaster!.createRenderer()
        renderer.on("added", target: self, callback: #selector(onViewsAdded(views:)))
        renderer.on("removed", target: self, callback: #selector(onViewsRemoved))
        mediaSplitter.videoOutput.connect(to: thumbnailBroadcaster!)
        conference.attach(thumbnailBroadcaster!, as: "thumbnails")

        let mutableAudioSource = MuteFilter()
        mediaSplitter.audioOutput.connect(to: mutableAudioSource)

        let audioBroadcaster = MediaBroadcaster()
        mutableAudioSource.connect(to: audioBroadcaster)
        conference.attach(audioBroadcaster, as: "audio")

        if let switcher = conference.switcher, let mainView = mainView {
            mediaSplitter.videoOutput.connect(to: switcher)
            switcher.connect(to: mainView)
        }
    }

    @objc func onClosed(_ info: [String:Any]) {
        dismiss(animated: true) {
            self.cleanup()
        }
    }
    
    @objc func onViewsAdded(views: [UIView]) {
        views.forEach { view in
            let peerId = view.accessibilityValue!
            let thumbnail = createThumbnailView(for: peerId)
            view.frame = thumbnail.bounds
            thumbnail.addSubview(view)
            
            if let userAgent = userAgent?.get(peerId) as? [String: Any] {
                decorate(view: thumbnail, for: peerId, withUserAgent: userAgent)
            }
        }
    }
    
    @objc func onViewsRemoved(_ views: [UIView]) {
        views.forEach { view in
            thumbnailViews?.viewWithTag(view.accessibilityValue!.hash)?.removeFromSuperview()
        }
    }

    func createThumbnailView(for peerId: String) -> ThumbnailView {
        print("[\(type(of: self))] Will create thumbnail view for \(peerId)")

        let height = Int(thumbnailViews!.frame.size.height)
        let width = 16 * height / 9
        let space = 5

        let view = ThumbnailView(frame: CGRect(
            x: (thumbnailViews!.subviews.count - 1)  * (width + space) + space,
            y: 0,
            width: width,
            height: height))
        view.tag = peerId.hash
        view.backgroundColor = UIColor.ericssonBlue
        view.contentMode = .scaleAspectFit

        thumbnailViews?.addSubview(view)
        thumbnailViews?.contentSize = CGSize(
            width: (thumbnailViews!.subviews.count - 1) * (width + space) + space,
            height: height)

        view.addConstraint(NSLayoutConstraint(
            item: view,
            attribute: .width,
            relatedBy: .equal,
            toItem: nil,
            attribute: .notAnAttribute,
            multiplier: 1.0,
            constant: CGFloat(width)))
        view.addConstraint(NSLayoutConstraint(
            item: view,
            attribute: .height,
            relatedBy: .equal,
            toItem: nil,
            attribute: .notAnAttribute,
            multiplier: 1.0,
            constant: CGFloat(height)))

        view.layer.cornerRadius = 5.0
        view.layer.borderColor = UIColor.white.cgColor
        view.layer.borderWidth = 1.0
        view.clipsToBounds = true

        return view
    }

    func decorate(view: ThumbnailView, for peerId: String, withUserAgent userAgent: [String: Any]) {
        view.peerLabel.text = peerId

        let description = "\(userAgent["browser"] ?? "unknown") \(userAgent["version"] ?? "unknown"), " +
        "\(userAgent["device"] ?? "unknown") \(userAgent["platform"] ?? "unknown")"

        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = .center
        paragraphStyle.lineSpacing = 1.0

        view.userAgentLabel.attributedText = NSAttributedString(string: description, attributes: [
            NSParagraphStyleAttributeName: paragraphStyle
        ])
    }

    func cleanup() {
        mediaSource?.close()
        mediaSource = nil

        thumbnailBroadcaster?.close()
        thumbnailBroadcaster = nil

        userAgent = nil
        muteState = nil
        
        call = nil
        conference = nil
        client = nil
    }
}

class ThumbnailView: UIView {
    let peerLabel: UILabel!
    let userAgentLabel: UILabel!
    let muteView: UIImageView!
    
    var isMuted: Bool {
        get {
            return !muteView.isHidden
        }
        set {
            muteView.isHidden = !newValue
        }
    }
    
    required init?(coder aDecoder: NSCoder) {
        peerLabel = nil
        userAgentLabel = nil
        muteView = nil
        
        super.init(coder: aDecoder)
    }
    
    override init(frame: CGRect) {
        peerLabel = UILabel(frame: CGRect(x: 5.0, y: 5.0, width: frame.size.width - 10.0, height: 15.0))
        peerLabel.textAlignment = .left
        peerLabel.textColor = UIColor.white
        peerLabel.font = UIFont(descriptor: peerLabel.font.fontDescriptor, size: 15.0)
        peerLabel.numberOfLines = 1
        peerLabel.shadowColor = UIColor.black
        peerLabel.shadowOffset = CGSize(width: 1, height: 1)
        
        muteView = UIImageView(frame: CGRect(
            x: frame.size.width - 20.0,
            y: frame.size.height - 20.0,
            width: 15.0,
            height: 15.0))
        muteView.image = #imageLiteral(resourceName: "MuteIcon")
        muteView.backgroundColor = UIColor(white: 0.0, alpha: 0.4)
        muteView.tintColor = UIColor.red
        muteView.isHidden = true
        
        userAgentLabel = UILabel(frame: CGRect(
            x: 5.0,
            y: frame.size.height - 30.0,
            width: frame.size.width - 25.0,
            height: 30.0))
        userAgentLabel.textColor = UIColor.white
        userAgentLabel.font = UIFont(descriptor: userAgentLabel.font.fontDescriptor, size: 12.0)
        userAgentLabel.lineBreakMode = .byWordWrapping
        userAgentLabel.numberOfLines = 2
        userAgentLabel.shadowColor = UIColor.black
        userAgentLabel.shadowOffset = CGSize(width: 1, height: 1)
        
        super.init(frame: frame)
        
        addSubview(peerLabel)
        
        addConstraint(NSLayoutConstraint(
            item: peerLabel,
            attribute: .left,
            relatedBy: .equal,
            toItem: self,
            attribute: .left,
            multiplier: 1.0,
            constant: 5.0))
        addConstraint(NSLayoutConstraint(
            item: peerLabel,
            attribute: .right,
            relatedBy: .equal,
            toItem: self,
            attribute: .right,
            multiplier: 1.0,
            constant: 5.0))
        addConstraint(NSLayoutConstraint(
            item: peerLabel,
            attribute: .top,
            relatedBy: .equal,
            toItem: self,
            attribute: .top,
            multiplier: 1.0,
            constant: 5.0))
        addConstraint(NSLayoutConstraint(
            item: peerLabel,
            attribute: .height,
            relatedBy: .equal,
            toItem: nil,
            attribute: .notAnAttribute,
            multiplier: 1.0,
            constant: 15.0))
        
        addSubview(muteView)
        
        addConstraint(NSLayoutConstraint(
            item: muteView,
            attribute: .right,
            relatedBy: .equal,
            toItem: self,
            attribute: .right,
            multiplier: 1.0,
            constant: 5.0))
        addConstraint(NSLayoutConstraint(
            item: muteView,
            attribute: .bottom,
            relatedBy: .equal,
            toItem: self,
            attribute: .bottom,
            multiplier: 1.0,
            constant: 5.0))
        addConstraint(NSLayoutConstraint(
            item: muteView,
            attribute: .width,
            relatedBy: .equal,
            toItem: nil,
            attribute: .notAnAttribute,
            multiplier: 1.0,
            constant: 15.0))
        addConstraint(NSLayoutConstraint(
            item: muteView,
            attribute: .height,
            relatedBy: .equal,
            toItem: nil,
            attribute: .notAnAttribute,
            multiplier: 1.0,
            constant: 15.0))
        
        addSubview(userAgentLabel)
        
        addConstraint(NSLayoutConstraint(
            item: userAgentLabel,
            attribute: .left,
            relatedBy: .equal,
            toItem: self,
            attribute: .left,
            multiplier: 1.0,
            constant: 5.0))
        addConstraint(NSLayoutConstraint(
            item: userAgentLabel,
            attribute: .right,
            relatedBy: .equal,
            toItem: muteView,
            attribute: .left,
            multiplier: 1.0,
            constant: 5.0))
        addConstraint(NSLayoutConstraint(
            item: userAgentLabel,
            attribute: .bottom,
            relatedBy: .equal,
            toItem: self,
            attribute: .bottom,
            multiplier: 1.0,
            constant: 0.0))
        addConstraint(NSLayoutConstraint(
            item: userAgentLabel,
            attribute: .height,
            relatedBy: .equal,
            toItem: nil,
            attribute: .notAnAttribute,
            multiplier: 1.0,
            constant: 30.0))
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
        bringSubview(toFront: peerLabel)
        bringSubview(toFront: muteView)
        bringSubview(toFront: userAgentLabel)
    }
}
