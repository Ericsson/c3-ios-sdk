import cct
import Foundation
import UIKit

class CallViewController: UIViewController {

    var source: DeviceSource?
    var client: Client?
    var call: Call?
    var conference: Conference?
    var switcher: MediaSwitcher?
    var broadcaster: MediaBroadcaster?
    var audioDetected = false

    @IBOutlet var mainView: UIView?
    @IBOutlet var cameraPositionButton: UIButton?
    @IBOutlet var thumbnailViews: UIScrollView?

    override func viewDidLoad() {
        super.viewDidLoad()

        source = DeviceSource()

        if source!.cameraPosition == .none {
            cameraPositionButton?.isEnabled = false
        } else {
            let view = createThumbnailView(for: client!.user!.id)
            source?.connect(to: view)
        }

        if let call = call {
            call.setLocalSource(source!, as: "main")
            call.remoteSource("main").connect(to: mainView!)

            call.on("closed", target: self, callback: #selector(onClosed))
        } else if let conference = conference {
            switcher = MediaSwitcher()

            source?.connect(to: switcher!)
            switcher?.connect(to: mainView!)
            switcher?.on("activeSpeaker", target: self, callback: #selector(onActiveSpeaker))

            conference.attach(switcher!, as: "switcher")

            broadcaster = MediaBroadcaster()
            source?.connect(to: broadcaster!)

            broadcaster!.on("remoteSource", target: self, callback: #selector(onRemoteSource))
            conference.attach(broadcaster!, as: "broadcaster")

            switcher?.setActive()
        }
    }

    @IBAction func pressedCameraSwitchButton(_ button: UIButton) {
        if source!.cameraPosition == .back {
            source!.cameraPosition = .front
        } else if source!.cameraPosition == .front {
            source!.cameraPosition = .back
        }
    }

    @IBAction func pressedHangupButton(_ button: UIButton) {
        if let call = call {
            call.hangup(success: { call in
                print("Did hang up call \(call.id)")
            }, failure: { error in
                print("Did fail to hang up: \(error.reason)")
            })
        } else if let conference = conference {
            conference.close()

            dismiss(animated: true) {
                self.cleanup()
            }
        }
    }

    @IBAction func pressedMuteButton(_ button: UIButton) {
        if source!.muteAudio {
            source!.muteAudio = false
            button.setImage(#imageLiteral(resourceName: "UnmuteIcon"), for: .normal)
        } else {
            source!.muteAudio = true
            button.setImage(#imageLiteral(resourceName: "MuteIcon"), for: .normal)
        }
    }
}

private extension CallViewController {

    @objc func onClosed(_ info: [String:Any]) {
        dismiss(animated: true) {
            self.cleanup()
        }
    }

    @objc func onRemoteSource(_ data: [String:Any]) {
        guard let peerId = data["peerId"] as? String else {
            return
        }

        if let source = data["source"] as? MediaTee {
            print("[\(type(of: self))] Did receive remote source from \(peerId)")

            let view = createThumbnailView(for: peerId)
            source.connect(to: view)

            if let peer = client?.user(withId: peerId) {
                switcher?.setActive(peer)
            }
        } else {
            print("[\(type(of: self))] Did lose remote source from \(peerId)")

            thumbnailViews?.subviews.filter { $0.accessibilityValue == peerId }.forEach { $0.removeFromSuperview() }

            let height = Int(thumbnailViews!.frame.size.height)
            let width = 16 * height / 9
            let space = 5

            for i in 0 ... thumbnailViews!.subviews.count - 1 {
                let view = thumbnailViews!.subviews[i]
                view.frame = CGRect(
                    x: CGFloat(i  * (width + space) + space),
                    y: 0,
                    width: view.frame.size.width,
                    height: view.frame.size.height)
            }

            switcher?.setActive()
        }
    }

    @objc func onActiveSpeaker(_ activeSpeaker: String) {
        print("[\(type(of: self))] Did change active speaker to \(activeSpeaker)")
    }

    func createThumbnailView(for peerId: String) -> UIView {
        print("[\(type(of: self))] Will create thumbnail view for \(peerId)")

        let height = Int(thumbnailViews!.frame.size.height)
        let width = 16 * height / 9
        let space = 5

        let view = UIView(frame: CGRect(
            x: (thumbnailViews!.subviews.count - 1)  * (width + space) + space,
            y: 0,
            width: width,
            height: height))
        view.accessibilityValue = peerId
        view.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(onThumbnailTapped)))

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

    @objc func onThumbnailTapped(_ gestureRecognizer: UIGestureRecognizer) {
        if let peerId = gestureRecognizer.view?.accessibilityValue,
            let user = client?.user(withId: peerId),
            let switcher = switcher {
            print("[\(type(of: self))] Will switch active user to \(peerId)")
            switcher.setActive(user)
        }
    }

    func cleanup() {
        source?.close()
        source = nil

        broadcaster?.close()
        broadcaster = nil

        switcher?.close()
        switcher = nil

        client = nil
        call = nil
        conference = nil
    }
}
