import cct
import FontAwesome_swift
import Foundation
import KeyboardObserver
import UIKit
import PopupKit
import SkyFloatingLabelTextField

class TextField: UITextField {

    override func textRect(forBounds bounds: CGRect) -> CGRect {
        return UIEdgeInsetsInsetRect(bounds, UIEdgeInsetsMake(0, 15, 0, 15))
    }

    override func placeholderRect(forBounds bounds: CGRect) -> CGRect {
        return UIEdgeInsetsInsetRect(bounds, UIEdgeInsetsMake(0, 15, 0, 15))
    }
}

class LoginViewController: UIViewController {

    @IBOutlet var imageView: UIImageView?

    @IBOutlet var usernameField: SkyFloatingLabelTextFieldWithIcon?
    @IBOutlet var passwordField: SkyFloatingLabelTextFieldWithIcon?
    @IBOutlet var serverField: SkyFloatingLabelTextFieldWithIcon?

    @IBOutlet var loginButton: UIButton?
    @IBOutlet var registerButton: UIButton?

    @IBOutlet var constraint: NSLayoutConstraint?

    fileprivate let keyboard = KeyboardObserver()
    fileprivate var client: Client?
    private var isRegistering = false

    override func viewDidLoad() {
        super.viewDidLoad()

        usernameField?.iconFont = UIFont.fontAwesome(ofSize: 15)
        usernameField?.iconText = String.fontAwesomeIcon(name: .user)

        passwordField?.iconFont = UIFont.fontAwesome(ofSize: 15)
        passwordField?.iconText = String.fontAwesomeIcon(name: .lock)

        serverField?.iconFont = UIFont.fontAwesome(ofSize: 15)
        serverField?.iconText = String.fontAwesomeIcon(name: .globe)
        
        cct.log.logLevel = .warning
        
        client = cct.Client(iceServers: [
            IceServer(
                url: "turn:turn.demo.c3.ericsson.net:443?transport=tcp",
                username: "c3-turn",
                password: "see-three")
        ])

        if let json = UserDefaults.standard.dictionary(forKey: "authInfo") {
            if let authInfo = AuthInfo.fromRaw(json) {
                client?.auth(authInfo, success: { client in
                    log.info("Restored session")
                    self.performSegue(withIdentifier: "showRooms", sender: client)
                }, failure: { error in
                    log.error("Failed to restore session: \(error.reason)")
                })
            } else {
                log.error("Failed to restore session")
            }
        } else {
            log.info("No stored session found")
        }

        keyboard.observe { event in
            guard event.type == .willShow || event.type == .willHide else {
                return
            }

            self.constraint?.constant = UIScreen.main.bounds.height - event.keyboardFrameEnd.origin.y
            self.view.setNeedsUpdateConstraints()

            UIView.animate(withDuration: event.duration) {
                self.view.layoutIfNeeded()
            }
        }
    }

    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        navigationController?.isNavigationBarHidden = true

        keyboard.isEnabled = true
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        keyboard.isEnabled = false

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
}

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

private extension LoginViewController {

    func login() {
        loginButton?.isEnabled = false

        Auth.login(
            as: usernameField!.text!,
            password: passwordField!.text!,
            serverUrl: serverField!.text!,
            success: { authInfo in
                UserDefaults.standard.setValue(authInfo.toRaw(), forKey: "authInfo")
                UserDefaults.standard.synchronize()

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

    func hideKeyboard() {
        usernameField?.resignFirstResponder()
        passwordField?.resignFirstResponder()
        serverField?.resignFirstResponder()

        keyboard.state = .hidden
    }
}
