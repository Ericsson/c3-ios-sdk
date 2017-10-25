import cct
import IGIdenticon
import SDWebImage

class RoomSettingsViewController: RoomDetailsItemViewController {

    var imagePickerController: UIImagePickerController?

    override func viewDidLoad() {
        super.viewDidLoad()

        room?.on("avatar", target: self, callback: #selector(reloadSettings))
        room?.on("historyVisibility", target: self, callback: #selector(reloadSettings))
        room?.on("joinRule", target: self, callback: #selector(reloadSettings))
        room?.on("name", target: self, callback: #selector(reloadSettings))
        room?.on("topic", target: self, callback: #selector(reloadSettings))

        tableView.backgroundView = nil
        tableView.backgroundColor = UIColor.white
    }

    override func willMove(toParentViewController parent: UIViewController?) {
        if parent == nil {
            room?.off("avatar", target: self)
            room?.off("historyVisibility", target: self)
            room?.off("joinRule", target: self)
            room?.off("name", target: self)
            room?.off("topic", target: self)
        }

        super.willMove(toParentViewController: parent)
    }

    @objc func reloadSettings() {
        log.verbose("Reloading settings")
        tableView.reloadData()
    }

    func handleRoomId() {
        let controller = UIAlertController(title: "Room ID", message: nil, preferredStyle: .actionSheet)
        controller.view.tintColor = UIColor.ericssonBlue

        controller.addAction(UIAlertAction(title: "Copy Room ID", style: .default) { _ in
            UIPasteboard.general.string = self.room?.id
        })
        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    func handleRoomName() {
        let controller = UIAlertController(
            title: "Room Name",
            message: "What should be the new room name?",
            preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue

        controller.addTextField(configurationHandler: { textField in
            textField.text = self.room?.name
            textField.placeholder = "Room name"
        })

        controller.addAction(UIAlertAction(title: "Change", style: .default) { _ in
            guard let name = controller.textFields?.first?.text, name != self.room?.name else {
                return
            }

            self.room?.setName(name, success: { _ in
                self.tableView.reloadData()
            }, failure: self.handleFormError)
        })
        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    func handleAvatar() {
        if imagePickerController == nil {
            imagePickerController = UIImagePickerController()
            imagePickerController?.allowsEditing = false
            imagePickerController?.sourceType = .photoLibrary
            imagePickerController?.delegate = self
        }
        present(imagePickerController!, animated: true)
    }

    func handleTopic() {
        let controller = UIAlertController(
            title: "Topic",
            message: "What should be the new topic?",
            preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue

        controller.addTextField(configurationHandler: { textField in
            textField.text = self.room?.topic
            textField.placeholder = "Topic"
        })

        controller.addAction(UIAlertAction(title: "Change", style: .default) { _ in
            guard let topic = controller.textFields?.first?.text, topic != self.room?.topic else {
                return
            }

            self.room?.setTopic(topic, success: { _ in
                self.tableView.reloadData()
            }, failure: self.handleFormError)
        })
        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    func handleJoinRule() {
        let controller = UIAlertController(
            title: "Join Rule",
            message: "Who can access the room?",
            preferredStyle: .actionSheet)
        controller.view.tintColor = UIColor.ericssonBlue

        controller.addAction(UIAlertAction(title: "Anyone", style: .default) { _ in
            self.room?.setJoinRule(.open, success: { _ in
                self.tableView.reloadData()
            }, failure: self.handleFormError)
        })
        controller.addAction(UIAlertAction(title: "Invited users", style: .default) { _ in
            self.room?.setJoinRule(.invite, success: { _ in
                self.tableView.reloadData()
            }, failure: self.handleFormError)
        })
        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    func handleHistoryVisibility() {
        let controller = UIAlertController(
            title: "History Visibility",
            message: "Who can read history?",
            preferredStyle: .actionSheet)
        controller.view.tintColor = UIColor.ericssonBlue

        controller.addAction(UIAlertAction(title: "Anyone", style: .default) { _ in
            self.room?.setHistoryVisibility(.public, success: { _ in
                self.tableView.reloadData()
            }, failure: self.handleFormError)
        })
        controller.addAction(UIAlertAction(title: "Members", style: .default) { _ in
            self.room?.setHistoryVisibility(.shared, success: { _ in
                self.tableView.reloadData()
            }, failure: self.handleFormError)
        })
        controller.addAction(UIAlertAction(title: "Members (Since invited)", style: .default) { _ in
            self.room?.setHistoryVisibility(.invited, success: { _ in
                self.tableView.reloadData()
            }, failure: self.handleFormError)
        })
        controller.addAction(UIAlertAction(title: "Members (Since joined)", style: .default) { _ in
            self.room?.setHistoryVisibility(.joined, success: { _ in
                self.tableView.reloadData()
            }, failure: self.handleFormError)
        })
        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    func handleFormError(_ error: C3Error) {
        log.error("Encountered error: \(error.reason)")
        let controller = UIAlertController(title: "Error", message: error.reason, preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue
        controller.addAction(UIAlertAction(title: "Dismiss", style: .default))
        self.present(controller, animated: true)
    }
    
    func handleLeaveRoom() {
        let controller = UIAlertController(
            title: "Leave room",
            message: "Are you sure you want to leave room \(room!.label)?",
            preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue
        
        controller.addAction(UIAlertAction(title: "Leave", style: .default) { _ in
            self.room?.leave(success: { _ in
                self.navigationController?.popToHomeView(animated: true)
            }, failure: self.handleFormError)
        })
        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))
        
        present(controller, animated: true)
    }
}

// MARK: UITableViewDataSource

extension RoomSettingsViewController {

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 3
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch section {
        case 0: return 1
        case 1: return 5
        default: return 1
        }
    }

    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return indexPath.section == 1 && indexPath.row == 1 ? 100.5 : 50.5
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell: UITableViewCell

        if indexPath.section == 0 {
            cell = tableView.dequeueReusableCell(withIdentifier: "TextCell", for: indexPath)
            cell.textLabel?.text = "Room ID"
            cell.detailTextLabel?.text = room?.id
        } else if indexPath.section == 1 {
            if indexPath.row == 0 {
                cell = tableView.dequeueReusableCell(withIdentifier: "TextCell", for: indexPath)
                cell.textLabel?.text = "Room Name"
                cell.detailTextLabel?.text = room?.label
            } else if indexPath.row == 1 {
                cell = tableView.dequeueReusableCell(withIdentifier: "ImageCell", for: indexPath)
                cell.textLabel?.text = "Room Photo"
                cell.imageView?.backgroundColor = UIColor(red: 0.84, green: 0.84, blue: 0.84, alpha: 1.0)
                cell.imageView?.layer.cornerRadius = 45.0
                cell.imageView?.layer.borderWidth = 1.0 / UIScreen.main.scale
                cell.imageView?.layer.borderColor = UIColor.lightGray.cgColor

                if let url = room?.avatar?.uri {
                    cell.imageView?.sd_setImage(with: URL(string: url)!)
                } else {
                    cell.imageView?.image = Identicon.instance.icon(
                        from: room!.id,
                        size: CGSize(width: 90.0, height: 90.0))
                }
            } else if indexPath.row == 2 {
                cell = tableView.dequeueReusableCell(withIdentifier: "TextCell", for: indexPath)
                cell.textLabel?.text = "Topic"
                cell.detailTextLabel?.text = room?.topic
            } else if indexPath.row == 3 {
                cell = tableView.dequeueReusableCell(withIdentifier: "TextCell", for: indexPath)
                cell.textLabel?.text = "Join Rule"
                cell.detailTextLabel?.text = room?.joinRule.name
            } else {
                cell = tableView.dequeueReusableCell(withIdentifier: "TextCell", for: indexPath)
                cell.textLabel?.text = "History Visibility"
                cell.detailTextLabel?.text = room?.historyVisibility.name
            }
        } else {
            cell = tableView.dequeueReusableCell(withIdentifier: "ButtonCell", for: indexPath)
            cell.textLabel?.text = "Leave room"
        }

        return cell
    }
}

// MARK: UITableViewDelegate

extension RoomSettingsViewController {

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)

        if indexPath.section == 0 {
            if indexPath.row == 0 {
                handleRoomId()
            }
        } else if indexPath.section == 1 {
            if indexPath.row == 0 {
                handleRoomName()
            } else if indexPath.row == 1 {
                handleAvatar()
            } else if indexPath.row == 2 {
                handleTopic()
            } else if indexPath.row == 3 {
                handleJoinRule()
            } else if indexPath.row == 4 {
                handleHistoryVisibility()
            }
        } else {
            handleLeaveRoom()
        }
    }
}

// MARK: UIImagePickerControllerDelegate
extension RoomSettingsViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    public func imagePickerController(_ picker: UIImagePickerController,
                                      didFinishPickingMediaWithInfo info: [String : Any]) {
        picker.dismiss(animated: true)

        guard let image = info[UIImagePickerControllerOriginalImage] as? UIImage else {
            return
        }

        let data = UIImagePNGRepresentation(image)!

        let _ = client?.uploadMedia(data, ofType: "image/png", success: { resource in
            self.room?.setAvatar(resource.resourceUri, success: { _ in
                log.verbose("Updated room avatar")
            }, failure: self.handleFormError)
        }, failure: handleFormError)
    }
}
