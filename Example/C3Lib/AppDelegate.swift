import IGIdenticon
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        return true
    }
}

extension Identicon {

    static let instance = Identicon()
}

extension UIColor {
    static var ericssonBlue: UIColor {
        return UIColor(red: 2.0 / 255.0, green: 40.0 / 255.0, blue: 95.0 / 255.0, alpha: 1.0)
    }
}
