import C3Lib
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
    
    @IBOutlet var constraint: NSLayoutConstraint?
    
    private let keyboard = KeyboardObserver()
    private var client: C3Client?

    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let json = UserDefaults.standard.dictionary(forKey: "authInfo") {
            if let authInfo = C3AuthInfo.fromJSON(json) {
                client = C3Client()
                client?.auth(authInfo, success: { client in
                    print("Did restore session")
                    self.performSegue(withIdentifier: "showRooms", sender: client)
                }, failure: { error in
                    print("Did fail to restore session: \(error.localizedDescription)")
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
                if self.view.frame.size.height - self.container!.frame.size.height - height < self.imageView!.frame.size.height {
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
            guard let client = sender as? C3Client else {
                return
            }
            
            guard let controller = segue.destination as? RoomsViewController else {
                return
            }
            
            controller.title = client.user?.name
            controller.client = client
        }
    }
    
    @IBAction func pressedLoginButton(_ button: UIButton) {
        login()
    }
    
    @IBAction func textFieldValueChanged(_ textField: UITextField) {
        loginButton?.isEnabled = !((usernameField!.text!.isEmpty) || (passwordField!.text!.isEmpty) || (serverField!.text!.isEmpty))
    }
    
    fileprivate func login() {
        C3Auth.login(as: usernameField!.text!, password: passwordField!.text!, serverUrl: serverField!.text!, success: { authInfo in
            UserDefaults.standard.setValue(authInfo.toJSON(), forKey: "authInfo")
            UserDefaults.standard.synchronize()
            
            self.client = C3Client()

            self.client?.auth(authInfo, success: { client in
                self.performSegue(withIdentifier: "showRooms", sender: client)
            }, failure: { error in
                let controller = UIAlertController(title: "Authentication error", message: error.localizedDescription, preferredStyle: .alert)
                controller.addAction(UIAlertAction(title: "Dismiss", style: .cancel) { action in
                    self.usernameField?.becomeFirstResponder()
                })
                self.present(controller, animated: true)
            })
        }, failure: { error in
            let controller = UIAlertController(title: "Login error", message: error.localizedDescription, preferredStyle: .alert)
            controller.addAction(UIAlertAction(title: "Dismiss", style: .cancel) { action in
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
