import cct
import Foundation
import KeyboardObserver
import UIKit

class LoginViewController: UIViewController {

    @IBOutlet var imageView: UIImageView?

    @IBOutlet var container: UIView?

    @IBOutlet var usernameField: UITextField?
    @IBOutlet var passwordField: UITextField?
    @IBOutlet var serverField: UITextField?

    @IBOutlet var loginButton: UIButton?
    @IBOutlet var registerButton: UIButton?

    @IBOutlet var constraint: NSLayoutConstraint?

    private let keyboard = KeyboardObserver()
    private var client: Client?
    private var isRegistering = false

    override func viewDidLoad() {
        super.viewDidLoad()

        if let json = UserDefaults.standard.dictionary(forKey: "authInfo") {
            if let authInfo = AuthInfo.fromRaw(json) {
                client = Client()
                client?.auth(authInfo, success: { client in
                    print("Did restore session")
                    self.performSegue(withIdentifier: "showRooms", sender: client)
                }, failure: { error in
                    print("Did fail to restore session: \(error.reason)")
                })
            } else {
                print("Did fail to restore session")
            }
        } else {
            print("Did not find stored session")
        }

        keyboard.observe { event in
            guard event.type == .willShow || event.type == .willHide else {
                return
            }

            let height = UIScreen.main.bounds.height - event.keyboardFrameEnd.origin.y

            self.constraint?.constant = height

            if event.type == .willShow {
                let remaining = self.view.frame.size.height - self.container!.frame.size.height - height
                if remaining < self.imageView!.frame.size.height {
                    self.imageView?.layer.opacity = 0.0
                }
            } else {
                self.imageView?.layer.opacity = 1.0
            }

            UIView.animate(withDuration: event.duration) {
                self.view.layoutSubviews()
            }
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        navigationController?.isNavigationBarHidden = true

        keyboard.enabled = true

        client = nil
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        keyboard.enabled = false

        navigationController?.isNavigationBarHidden = false
    }

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        hideKeyboard()
    }

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showRooms" {
            guard let client = sender as? Client else {
                return
            }

            guard let controller = segue.destination as? RoomsViewController else {
                return
            }

            controller.title = client.user?.name
            controller.client = client
        }
    }

    @IBAction func login(_ button: UIButton) {
        login()
    }

    @IBAction func register(_ button: UIButton) {
        var controller = UIAlertController(
            title: "Register",
            message: "Enter credentials for the new user",
            preferredStyle: .alert)

        controller.addTextField { textField in
            textField.placeholder = "Username"
            textField.autocorrectionType = .no
            textField.autocapitalizationType = .none
            textField.keyboardType = .emailAddress
        }

        controller.addTextField { textField in
            textField.placeholder = "Password"
            textField.autocorrectionType = .no
            textField.autocapitalizationType = .none
            textField.clearsOnBeginEditing = true
            textField.isSecureTextEntry = true
            textField.keyboardType = .asciiCapable
        }

        controller.addTextField { textField in
            textField.placeholder = "Password (repeated)"
            textField.autocorrectionType = .no
            textField.autocapitalizationType = .none
            textField.clearsOnBeginEditing = true
            textField.isSecureTextEntry = true
            textField.keyboardType = .asciiCapable
        }

        controller.addAction(UIAlertAction(title: "Register", style: .default) { _ in
            guard let username = controller.textFields?[0].text, let password = controller.textFields?[1].text else {
                return
            }

            guard (controller.textFields?[2].text ?? "") == password else {
                controller = UIAlertController(
                    title: "Error",
                    message: "Passwords don't match!",
                    preferredStyle: .alert)
                controller.view.tintColor = UIColor.ericssonBlue
                controller.addAction(UIAlertAction(title: "Dismiss", style: .default))
                self.present(controller, animated: true)
                return
            }

            self.isRegistering = true
            self.registerButton?.isEnabled = false

            Auth.register(as: username, password: password, serverUrl: self.serverField!.text!, success: { _ in
                self.isRegistering = false
                self.registerButton?.isEnabled = (self.serverField?.text?.characters.count ?? 0) != 0

                controller = UIAlertController(
                    title: "Success",
                    message: "User \(username) registered successfully!",
                    preferredStyle: .alert)
                controller.view.tintColor = UIColor.ericssonBlue
                controller.addAction(UIAlertAction(title: "Dismiss", style: .default))
                self.present(controller, animated: true)
            }, failure: { error in
                self.isRegistering = false
                self.registerButton?.isEnabled = (self.serverField?.text?.characters.count ?? 0) != 0

                controller = UIAlertController(title: "Error", message: error.reason, preferredStyle: .alert)
                controller.view.tintColor = UIColor.ericssonBlue
                controller.addAction(UIAlertAction(title: "Dismiss", style: .default))
                self.present(controller, animated: true)
            })
        })

        controller.addAction(UIAlertAction(title: "Cancel", style: .cancel))

        present(controller, animated: true)
    }

    @IBAction func textFieldValueChanged(_ textField: UITextField) {
        loginButton?.isEnabled = !((usernameField!.text!.isEmpty) ||
            (passwordField!.text!.isEmpty) ||
            (serverField!.text!.isEmpty))

        if textField == serverField {
            registerButton?.isEnabled = !isRegistering && (serverField?.text?.characters.count ?? 0) != 0
        }
    }

    fileprivate func login() {
        loginButton?.isEnabled = false

        Auth.login(
            as: usernameField!.text!,
            password: passwordField!.text!,
            serverUrl: serverField!.text!,
            success: { authInfo in
                UserDefaults.standard.setValue(authInfo.toRaw(), forKey: "authInfo")
                UserDefaults.standard.synchronize()

                self.client = Client()

                self.client?.auth(authInfo, success: { client in
                    self.loginButton?.isEnabled = true

                    self.passwordField?.text = nil
                    self.performSegue(withIdentifier: "showRooms", sender: client)
                }, failure: { error in
                    self.loginButton?.isEnabled = true

                    let controller = UIAlertController(
                        title: "Authentication error",
                        message: error.reason,
                        preferredStyle: .alert)
                    controller.view.tintColor = UIColor.ericssonBlue
                    controller.addAction(UIAlertAction(title: "Dismiss", style: .cancel) { _ in
                        self.usernameField?.becomeFirstResponder()
                    })
                    self.present(controller, animated: true)
                })
        }, failure: { error in
            self.loginButton?.isEnabled = true

            let message = (error.reason == "No message") ? "Could not log in" : error.reason

            let controller = UIAlertController(title: "Error", message: message, preferredStyle: .alert)
            controller.view.tintColor = UIColor.ericssonBlue
            controller.addAction(UIAlertAction(title: "Dismiss", style: .cancel) { _ in
                self.usernameField?.becomeFirstResponder()
            })
            self.present(controller, animated: true)
        })
    }

    private func hideKeyboard() {
        usernameField?.resignFirstResponder()
        passwordField?.resignFirstResponder()
        serverField?.resignFirstResponder()

        keyboard.state = .hidden
    }
}

// MARK: UITextFieldDelegate

extension LoginViewController: UITextFieldDelegate {

    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if textField == usernameField {
            passwordField?.becomeFirstResponder()
        } else if textField == passwordField {
            serverField?.becomeFirstResponder()
        } else {
            login()
        }

        return true
    }
}
