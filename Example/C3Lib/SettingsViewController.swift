import cct
import IGIdenticon
import UIKit

class SettingsViewController: UITableViewController {

    var imagePickerController: UIImagePickerController?

    var client: Client?

    override func viewDidLoad() {
        super.viewDidLoad()

        tableView.backgroundView = nil
        tableView.backgroundColor = UIColor.white

        client?.user?.on("avatar", target: self, callback: #selector(reloadSettings))
        client?.user?.on("name", target: self, callback: #selector(reloadSettings))

        tableView.tableFooterView = UIView()
    }

    override func willMove(toParentViewController parent: UIViewController?) {
        if parent == nil {
            client?.user?.off("avatar", target: self)
            client?.user?.off("name", target: self)
        }
    }

    @objc func reloadSettings() {
        print("Will reload settings")
        tableView.reloadData()
    }

}

// MARK: UITableViewDataSource
extension SettingsViewController {

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == 0 {
            return 1
        } else {
            return 3
        }
    }

    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return indexPath.section == 1 && indexPath.row == 0 ? 100.5 : 50.5
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell: UITableViewCell

        if indexPath.section == 0 {
            cell = tableView.dequeueReusableCell(withIdentifier: "ButtonCell", for: indexPath)
            cell.textLabel?.text = "Log Out"
        } else {
            if indexPath.row == 0 {
                cell = tableView.dequeueReusableCell(withIdentifier: "ImageCell", for: indexPath)
                cell.textLabel?.text = "Profile Picture"

                cell.imageView?.backgroundColor = UIColor(red: 0.84, green: 0.84, blue: 0.84, alpha: 1.0)
                cell.imageView?.layer.cornerRadius = 45.0
                cell.imageView?.layer.borderWidth = 0.5
                cell.imageView?.layer.borderColor = UIColor.lightGray.cgColor

                if let thumbnail = client?.user?.avatar?.thumbnail(width: 90.0, height: 90.0) {
                    cell.imageView?.sd_setImage(with: URL(string: thumbnail)!)
                } else {
                    cell.imageView?.image = Identicon.instance.icon(
                        from: client!.user!.id,
                        size: CGSize(width: 90.0, height: 90.0))
                }
            } else if indexPath.row == 1 {
                cell = tableView.dequeueReusableCell(withIdentifier: "TextCell", for: indexPath)
                cell.textLabel?.text = "Display Name"
                cell.detailTextLabel?.text = client?.user?.name
            } else {
                cell = tableView.dequeueReusableCell(withIdentifier: "TextCell", for: indexPath)
                cell.textLabel?.text = "Change Password"
                cell.detailTextLabel?.text = "*************"
            }
        }

        return cell
    }
}

// MARK: UITableViewDelegate
extension SettingsViewController {

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)

        if indexPath.section == 0 {
            if indexPath.row == 0 {
                handleLogout()
            }
        } else if indexPath.section == 1 {
            if indexPath.row == 0 {
                handleProfilePicture()
            } else if indexPath.row == 1 {
                handleDisplayName()
            } else if indexPath.row == 2 {
                handlePassword()
            }
        }
    }
}

// MARK: UIImagePickerControllerDelegate
extension SettingsViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    public func imagePickerController(_ picker: UIImagePickerController,
                                      didFinishPickingMediaWithInfo info: [String : Any]) {
        picker.dismiss(animated: true)

        guard let image = info[UIImagePickerControllerOriginalImage] as? UIImage else {
            return
        }

        let data = UIImagePNGRepresentation(image)!

        let _ = client?.uploadMedia(data, ofType: "image/png", success: { resource in
            self.client?.setAvatar(resource.resourceUri, success: { _ in
                print("Did update avatar")
            }, failure: self.handleFormError)
        }, failure: handleFormError)
    }
}

private extension SettingsViewController {

    func handleLogout() {
        let controller = UIAlertController(
            title: "Log out",
            message: "Are you sure you want to log out?",
            preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue

        controller.addAction(UIAlertAction(title: "Log out", style: .default) { _ in
            UserDefaults.standard.removeObject(forKey: "authInfo")

            self.client?.logout()

            let _ = self.navigationController?.popToRootViewController(animated: true)
        })
        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    func handleProfilePicture() {
        if imagePickerController == nil {
            imagePickerController = UIImagePickerController()
            imagePickerController?.allowsEditing = false
            imagePickerController?.sourceType = .photoLibrary
            imagePickerController?.delegate = self
        }
        present(imagePickerController!, animated: true)
    }

    func handleDisplayName() {
        let controller = UIAlertController(
            title: "Display name",
            message: "What should be the new display name?",
            preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue

        controller.addTextField(configurationHandler: { textField in
            textField.text = self.client?.user?.name
            textField.placeholder = "Display name"
        })

        controller.addAction(UIAlertAction(title: "Change", style: .default) { _ in
            guard let name = controller.textFields?.first?.text, name != self.client?.user?.name else {
                return
            }

            self.client?.setName(name, success: { _ in
                self.tableView.reloadData()
            }, failure: self.handleFormError)
        })
        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    func handlePassword() {
        var controller = UIAlertController(
            title: "Change passwowrd",
            message: "What should be the new password?",
            preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue

        controller.addTextField(configurationHandler: { textField in
            textField.autocapitalizationType = .none
            textField.autocorrectionType = .no
            textField.clearsOnBeginEditing = true
            textField.isSecureTextEntry = true
            textField.keyboardType = .asciiCapable
            textField.placeholder = "Old password"
        })

        controller.addTextField(configurationHandler: { textField in
            textField.autocapitalizationType = .none
            textField.autocorrectionType = .no
            textField.clearsOnBeginEditing = true
            textField.isSecureTextEntry = true
            textField.keyboardType = .asciiCapable
            textField.placeholder = "New password"
        })

        controller.addTextField(configurationHandler: { textField in
            textField.autocapitalizationType = .none
            textField.autocorrectionType = .no
            textField.clearsOnBeginEditing = true
            textField.isSecureTextEntry = true
            textField.keyboardType = .asciiCapable
            textField.placeholder = "New password (repeated)"
        })

        controller.addAction(UIAlertAction(title: "Change", style: .default) { _ in
            guard let oldPassword = controller.textFields?[0].text else {
                return
            }

            guard let newPassword = controller.textFields?[1].text, newPassword == controller.textFields?[2].text else {
                controller = UIAlertController(
                    title: "Error",
                    message: "Passwords don't match!",
                    preferredStyle: .alert)
                controller.view.tintColor = UIColor.ericssonBlue
                controller.addAction(UIAlertAction(title: "Dismiss", style: .default))
                self.present(controller, animated: true)
                return
            }

            cct.Auth.resetPassword(
                for: self.client!.authInfo!,
                oldPassword: oldPassword,
                newPassword: newPassword, success: { _ in
                    print("Did change password")
            }, failure: self.handleFormError)
        })

        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    func handleFormError(_ error: C3Error) {
        print("Did encounter error: \(error.reason)")
        let controller = UIAlertController(title: "Error", message: error.reason, preferredStyle: .alert)
        controller.view.tintColor = UIColor.ericssonBlue
        controller.addAction(UIAlertAction(title: "Dismiss", style: .default))
        self.present(controller, animated: true)
    }
}
