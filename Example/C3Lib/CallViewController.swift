import C3Lib
import Foundation
import UIKit

class CallViewController: UIViewController {
    
    var call: C3Call?
    var source: C3DeviceSource?
    var dataShare: C3DataShare?
    var fileShare: C3FileShare?
    
    @IBOutlet var localView: UIView?
    @IBOutlet var remoteView: UIView?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        source = C3DeviceSource()
        source?.connect(to: localView!)
        
        call?.setLocalSource(source!, as: "main")
        
        call?.remoteSource("main").connect(to: remoteView!)
        
        call?.on("closed", target: self, callback: #selector(onClosed(info:)))
        
//        dataShare = C3DataShare()
//        call?.attach(dataShare!, as: "data")
//        
//        dataShare?.on("update", target: self, callback: #selector(onDataUpdate))
//        
//        fileShare = C3FileShare()
//        fileShare?.on("update", target: self, callback: #selector(onFileUpdate(change:)))
//        
//        call?.attach(fileShare!, as: "files")
    }
    
    @IBAction func pressedCameraSwitchButton(_ button: UIButton) {
        guard let source = source else {
            return
        }
        
        if source.cameraPosition == .back {
            source.cameraPosition = .front
        } else if source.cameraPosition == .front {
            source.cameraPosition = .back
        }
    }
    
    @IBAction func pressedHangupButton(_ button: UIButton) {
        call?.hangup(success: { call in
            print("Did hang up call \(call.id)")
        }, failure: { error in
            print("Did fail to hang up: \(error.localizedDescription)")
        })
    }
    
    @IBAction func pressedMuteButton(_ button: UIButton) {
        guard let source = source else {
            return
        }
        
        if source.muteAudio {
            source.muteAudio = false
            button.setImage(#imageLiteral(resourceName: "MuteIcon"), for: .normal)
        } else {
            source.muteAudio = true
            button.setImage(#imageLiteral(resourceName: "UnmuteIcon"), for: .normal)
        }
    }
}

private extension CallViewController {
    
    @objc func onClosed(info: [String:Any]) {
        dismiss(animated: true) {
            self.call = nil
            
            self.dataShare?.off("update", target: self)
            self.dataShare = nil

            self.fileShare?.off("update", target: self)
            self.fileShare = nil
        }
    }
    
    @objc func onDataUpdate(_ update: C3DataUpdate) {
        guard let value = update.value else {
            return
        }
        
        print("Did receive data for key \(update.key): \(value)")
        
        dataShare?.set("world", for: "hello")
    }
    
    @objc func onFileUpdate(change: [String:Any]) {
        print("Did receive file update")
        
        guard let file = change["value"] as? C3FileRef else {
            return
        }
        
        file.fetch(success: {
            guard let data = $0.data else {
                return
            }
            
            guard let content = String(data: data, encoding: .utf8) else {
                return
            }
            print("Did fetch file \($0.name): \(content)")
        }, failure: {
            print("Did fail to fetch file \(file.name): \($0.localizedDescription)")
        })
    }
    
    @objc func onTransfer(transfer: C3FileTransfer) {
        print("Did start transfer")
        
        transfer.on("progress", target: self, callback: #selector(onProgress(progress:)))
        transfer.on("done", target: self, callback: #selector(onDone))
    }
    
    @objc func onProgress(progress: Float) {
        print("Transfer did progress: \(progress)")
    }
    
    @objc func onDone() {
        print("Transfer did finish")
    }
}
