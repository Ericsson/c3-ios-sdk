import C3Lib
import Foundation
import IGIdenticon
import SDWebImage
import UIKit

class MembersViewController: UITableViewController {

    weak var client: C3Client?
    weak var room: C3Room?
    
    var onlineColor = UIColor(red: 0.24, green: 0.68, blue: 0.11, alpha: 1.0).cgColor
    var offlineColor = UIColor(white: 0.67, alpha: 1.0).cgColor
    var unavailableColor = UIColor(red: 0.98, green: 0.78, blue: 0.18, alpha: 1.0).cgColor
    var avatarGenerator: IGImageGenerator?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tableView.tableFooterView = UIView()
        
        room?.otherMembers.forEach { $0.on("presence", target: self, callback: #selector(self.onPresence(user:))) }
        
        avatarGenerator = IGImageGenerator(imageProducer: IGGitHubIdenticon(), hashFunction: { IGJenkinsHashFromData($0!) })
    }
    
    override func willMove(toParentViewController parent: UIViewController?) {
        if parent == nil {
            room?.off("event:m.room.message")
        }
    }
    
    @objc private func onPresence(user: C3User) {
        guard let index = room?.otherMembers.index(of: user) else {
            return
        }
        
        tableView.reloadRows(at: [IndexPath(row: index, section: 0)], with: .automatic)
    }
}

// MARK: UITableViewDataSource

extension MembersViewController {
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return room?.otherMembers.count ?? 0
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell")!
        
        guard let member = room?.otherMembers[indexPath.row] else {
            return cell
        }
        
        cell.textLabel?.text = member.name

        if let avatar = member.avatar {
            cell.imageView?.sd_setImage(with: URL(string: avatar.uri)!, placeholderImage: avatarGenerator?.image(from: member.name, size: CGSize(width: 100.0, height: 100.0)))
        } else {
            cell.imageView?.image = avatarGenerator?.image(from: member.name, size: CGSize(width: 80.0, height: 80.0))
        }
        cell.imageView?.contentMode = .scaleAspectFill
        cell.imageView?.clipsToBounds = true
        cell.imageView?.backgroundColor = UIColor(red: 0.84, green: 0.84, blue: 0.84, alpha: 1.0)
        cell.imageView?.layer.cornerRadius = 40.0
        cell.imageView?.layer.borderWidth = 3.0
        
        switch member.presence {
        case .offline:
            cell.detailTextLabel?.text = "offline"
            cell.imageView?.layer.borderColor = offlineColor
        case .online:
            cell.detailTextLabel?.text = "online"
            cell.imageView?.layer.borderColor = onlineColor
        case .unavailable:
            cell.detailTextLabel?.text = "busy"
            cell.imageView?.layer.borderColor = unavailableColor
        }
        
        return cell
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "startCall" {
            guard let cell = sender as? UITableViewCell else {
                return
            }

            guard let indexPath = tableView.indexPath(for: cell) else {
                return
            }

            guard let member = room?.otherMembers[indexPath.row] else {
                return
            }

            guard let controller = segue.destination as? CallViewController else {
                return
            }

            guard let call = room?.startCall(with: member) else {
                return
            }
            
            controller.title = call.peer.name
            controller.call = call
        } else if segue.identifier == "showChat" {
            guard let user = client?.user else {
                return
            }

            guard let controller = segue.destination as? ChatViewController else {
                return
            }

            controller.senderId = user.id
            controller.senderDisplayName = user.name

            controller.user = user
            controller.room = room
            controller.client = client
        }
    }
}

// MARK: UITableViewDelegate

extension MembersViewController {
    
    override func tableView(_ tableView: UITableView, didHighlightRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
}
