import cct
import Foundation
import IGIdenticon
import SDWebImage
import UIKit

extension UINavigationController {
    
    func popToHomeView(animated: Bool = true) {
        if let controller = viewControllers.filter({ $0.isKind(of: RoomsViewController.self) }).first {
            popToViewController(controller, animated: animated)
        }
    }
}

extension Room {
    
    var label: String {
        return name ?? alias ?? id
    }
}

class RoomsViewController: UITableViewController {

    var client: Client?

    var rooms: [Room]?

    override func viewDidLoad() {
        super.viewDidLoad()

        navigationItem.hidesBackButton = true

        tableView.tableFooterView = UIView()

        client?.user?.on("name", target: self, callback: #selector(onUserName))

        client?.on("call", target: self, callback: #selector(onCall))

        client?.on("invite", target: self, callback: #selector(onInvite))
        client?.on("leave", target: self, callback: #selector(reloadRooms))
        client?.on("rooms", target: self, callback: #selector(reloadRooms))

        reloadRooms()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        tableView.indexPathsForSelectedRows?.forEach {
            tableView.deselectRow(at: $0, animated: animated)
        }
    }

    override func willMove(toParentViewController parent: UIViewController?) {
        if parent == nil {
            client?.user?.off("name", target: self)

            client?.off("call", target: self)
            client?.off("invite", target: self)
            client?.off("leave", target: self)
            client?.off("rooms", target: self)

            client = nil

            rooms?.forEach {
                $0.off("avatar", target: self)
                $0.off("name", target: self)
                $0.off("members", target: self)
            }
            rooms = nil
        }
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showChat" {
            guard let cell = sender as? UITableViewCell else {
                return
            }

            guard let controller = segue.destination as? ChatViewController else {
                return
            }

            guard let indexPath = tableView.indexPath(for: cell) else {
                return
            }

            guard let room = rooms?[indexPath.row] else {
                return
            }

            controller.senderId = client?.user?.id
            controller.senderDisplayName = client?.user?.name

            controller.client = client
            controller.room = room
        } else if segue.identifier == "showSettings" {
            guard let controller = segue.destination as? SettingsViewController else {
                return
            }

            controller.client = client
        } else if segue.identifier == "answerCall" {
            guard let controller = segue.destination as? CallViewController else {
                return
            }

            let call = sender as? Call

            controller.title = call?.peer?.name
            controller.client = client
            controller.call = call
        } else if segue.identifier == "answerConference" {
            guard let conference = sender as? Conference else {
                return
            }

            guard let controller = segue.destination as? CallViewController else {
                return
            }

            controller.title = "Conference"
            controller.client = client
            controller.conference = conference
        }
    }

    @IBAction func addRoom(_ button: UIBarButtonItem) {
        var controller = UIAlertController(
            title: "New room",
            message: "What should be the name of the new room?",
            preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue

        controller.addTextField { textField in
            textField.placeholder = "Room name"
        }

        controller.addAction(UIAlertAction(title: "Add", style: .default) { _ in
            guard let name = controller.textFields?.first?.text else {
                return
            }

            self.client?.createRoom(name: name, alias: name, visibility: .public, success: { room in
                room.on("avatar", target: self, callback: #selector(self.reloadRooms))
                room.on("name", target: self, callback: #selector(self.reloadRooms))
                room.on("members", target: self, callback: #selector(self.reloadRooms))
                self.tableView.reloadData()
            }, failure: { error in
                if let _ = error as? ConflictError {
                    self.client?.fetchRoom(withAlias: name, success: { room in
                        room.join(success: { room in
                            room.on("avatar", target: self, callback: #selector(self.reloadRooms))
                            room.on("name", target: self, callback: #selector(self.reloadRooms))
                            room.on("members", target: self, callback: #selector(self.reloadRooms))
                            self.tableView.reloadData()
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
                } else {
                    controller = UIAlertController(title: "Error", message: error.reason, preferredStyle: .alert)
                    controller.view.tintColor = UIColor.ericssonBlue
                    controller.addAction(UIAlertAction(title: "Dismiss", style: .default))
                    self.present(controller, animated: true)
                }
            })
        })

        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    @objc private func onUserName(_ name: String) {
        log.debug("Received username change to \(name)")
        
        navigationItem.title = name
    }

    @objc private func onCall(_ call: Call) {
        log.debug("Received call from \(call.peer?.name ?? "nil")")
        
        let controller = UIAlertController(
            title: "Incoming call",
            message: "You have received an incoming call from \(call.peer!.name)",
            preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue
        
        controller.addAction(UIAlertAction(title: "Answer", style: .default) { _ in
            call.start()
            self.performSegue(withIdentifier: "answerCall", sender: call)
        })
        
        controller.addAction(UIAlertAction(title: "Reject", style: .destructive) { _ in
            call.hangup()
        })
        
        present(controller, animated: true)
    }

    @objc private func onInvite(_ room: Room) {
        DispatchQueue.main.async {
            log.debug("Received invite to room \(room.label) (\(room.membership.rawValue))")
            
            room.join(success: { _ in
                log.verbose("Did join room \(room.label) (\(room.membership.rawValue))")
                self.tableView.reloadData()
            }, failure: {
                log.error("Failed to join room \(room.label): \($0.reason)")
            })
        }
    }

    @objc private func reloadRooms() {
        rooms?.forEach {
            $0.on("avatar", target: self, callback: #selector(reloadRooms))
            $0.off("name", target: self)
            $0.off("members", target: self)
        }

        rooms = client?.rooms.sorted { $0.0.label.compare($0.1.label) == .orderedAscending }

        rooms?.forEach {
            $0.on("avatar", target: self, callback: #selector(reloadRooms))
            $0.on("name", target: self, callback: #selector(reloadRooms))
            $0.on("members", target: self, callback: #selector(reloadRooms))
        }
        
        DispatchQueue.main.async {
            self.tableView.reloadData()
        }
    }
}

// MARK: UITableViewDataSource

extension RoomsViewController {

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return rooms?.count ?? 0
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell")!
        guard let room = rooms?[indexPath.row] else {
            return cell
        }

        let count = room.members.count

        cell.textLabel?.text = room.label
        cell.detailTextLabel?.text = "\(room.members.count) member\(count == 1 ? "" : "s")"
        cell.imageView?.backgroundColor = UIColor(red: 0.84, green: 0.84, blue: 0.84, alpha: 1.0)
        cell.imageView?.layer.cornerRadius = 45.0
        cell.imageView?.layer.borderWidth = 1.0 / UIScreen.main.scale
        cell.imageView?.layer.borderColor = UIColor.lightGray.cgColor

        if let thumbnail = room.avatar?.thumbnail(width: 90.0, height: 90.0, resizeMethod: .crop) {
            cell.imageView?.sd_setImage(with: URL(string: thumbnail)!)
        } else {
            cell.imageView?.image = Identicon.instance.icon(from: room.id, size: CGSize(width: 90.0, height: 90.0))
        }

        return cell
    }
}
