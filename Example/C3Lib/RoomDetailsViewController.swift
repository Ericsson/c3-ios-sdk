import cct

class RoomDetailsViewController: UITabBarController {

    weak var client: Client?
    weak var room: Room?

    override func viewDidLoad() {
        super.viewDidLoad()

        viewControllers?.forEach {
            if let item = $0 as? RoomDetailsItemViewController {
                item.client = client
                item.room = room
            }
        }
    }

    override func willMove(toParentViewController parent: UIViewController?) {
        if parent == nil {
            viewControllers?.forEach {
                $0.willMove(toParentViewController: parent)
            }

            client = nil
            room = nil
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        inheritNavigationItem(from: selectedViewController)
    }

    override func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem) {
        guard let index = tabBar.items?.index(of: item) else {
            return
        }

        inheritNavigationItem(from: viewControllers?[index])
    }

    func inheritNavigationItem(from controller: UIViewController?) {
        navigationItem.title = controller?.navigationItem.title
        navigationItem.rightBarButtonItems = controller?.navigationItem.rightBarButtonItems
    }
}
