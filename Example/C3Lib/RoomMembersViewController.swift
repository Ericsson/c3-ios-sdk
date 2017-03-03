import cct
import Foundation
import IGIdenticon
import SDWebImage
import UIKit

class MemberCell: TableViewCell {

    @IBOutlet var statusTextLabel: UILabel?

    override func prepareForReuse() {
        super.prepareForReuse()

        statusTextLabel?.text = nil
    }
}

class RoomMembersViewController: RoomDetailsItemViewController {

    var onlineColor = UIColor(red: 0.24, green: 0.68, blue: 0.11, alpha: 1.0).cgColor
    var offlineColor = UIColor(white: 0.67, alpha: 1.0).cgColor
    var unavailableColor = UIColor(red: 0.98, green: 0.78, blue: 0.18, alpha: 1.0).cgColor

    var members: [User]?

    override func viewDidLoad() {
        super.viewDidLoad()

        tableView.tableFooterView = UIView()

        room?.on("members", target: self, callback: #selector(updateMembers))

        updateMembers()
    }

    override func willMove(toParentViewController parent: UIViewController?) {
        if parent == nil {
            room?.off("members", target: self)

            members?.forEach {
                $0.off("name", target: self)
                $0.off("presence", target: self)
            }
        }

        super.willMove(toParentViewController: parent)
    }

    @IBAction func inviteUser(_ button: UIBarButtonItem) {
        var controller = UIAlertController(
            title: "Invite user",
            message: "What is the ID of the user to invite?",
            preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue

        controller.addTextField { textField in
            textField.placeholder = "User ID"
        }

        controller.addAction(UIAlertAction(title: "Invite", style: .default) { _ in
            guard let id = controller.textFields?.first?.text else {
                return
            }

            self.client?.fetchUser(withId: id, success: { user in
                self.room?.invite(user, success: { _ in
                    user.on("presence", target: self, callback: #selector(self.updateMembers))
                }, failure: { error in
                    controller = UIAlertController(title: "Error", message: error.reason, preferredStyle: .alert)
                    controller.view.tintColor = UIColor.ericssonBlue
                    controller.addAction(UIAlertAction(title: "Dismiss", style: .default))
                    self.present(controller, animated: true)
                })
            }, failure: { error in
                controller = UIAlertController(title: "Error", message: error.reason, preferredStyle: .alert)
                controller.view.tintColor = UIColor.ericssonBlue
                controller.addAction(UIAlertAction(title: "Dismiss", style: .default))
                self.present(controller, animated: true)
            })
        })

        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    @objc private func updateMembers() {
        members?.forEach {
            $0.off("name", target: self)
            $0.off("presence", target: self)
        }

        members = room?.members.sorted { left, right in
            if left.presence == right.presence {
                return left.name.compare(right.name) == .orderedAscending
            }

            return left.presence.rawValue < right.presence.rawValue
        }

        members?.forEach {
            $0.on("name", target: self, callback: #selector(updateMembers))
            $0.on("presence", target: self, callback: #selector(updateMembers))
        }

        tableView.reloadData()
    }
}

// MARK: UITableViewDataSource

extension RoomMembersViewController {

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return members?.count ?? 0
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)

        guard let member = members?[indexPath.row] else {
            return cell
        }

        cell.textLabel?.text = member.name

        if let cell = cell as? MemberCell {
            if let statusMessage = member.statusMessage {
                cell.statusTextLabel?.isHidden = false
                cell.statusTextLabel?.text = statusMessage
            } else {
                cell.statusTextLabel?.isHidden = true
            }
        }

        if let thumbnail = member.avatar?.thumbnail(width: 90.0, height: 90.0, resizeMethod: .crop) {
            cell.imageView?.sd_setImage(
                with: URL(string: thumbnail)!,
                placeholderImage: Identicon.instance.icon(from: member.name, size: CGSize(width: 90.0, height: 90.0)))
        } else {
            cell.imageView?.image = Identicon.instance.icon(from: member.name, size: CGSize(width: 90.0, height: 90.0))
        }
        cell.imageView?.clipsToBounds = true
        cell.imageView?.backgroundColor = UIColor(red: 0.84, green: 0.84, blue: 0.84, alpha: 1.0)
        cell.imageView?.layer.borderWidth = 1.0 / UIScreen.main.scale
        cell.imageView?.layer.cornerRadius = 45.0

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

            guard let member = members?[indexPath.row] else {
                return
            }

            guard let controller = segue.destination as? CallViewController else {
                return
            }

            guard let call = room?.startCall(with: member) else {
                return
            }

            controller.title = call.peer?.name
            controller.call = call
            controller.client = client
        } else if segue.identifier == "startConference" {
            guard let controller = segue.destination as? CallViewController else {
                return
            }

            guard let conference = room?.startConference() else {
                return
            }

            controller.title = "Conference call"
            controller.conference = conference
            controller.client = client
        }
    }
}

// MARK: UITableViewDelegate

extension RoomMembersViewController {

    override func tableView(_ tableView: UITableView, didHighlightRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
}
