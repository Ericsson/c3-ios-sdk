import cct

class RoomDetailsItemViewController: UITableViewController {

    weak var client: Client?
    weak var room: Room?

    override func viewDidLoad() {
        super.viewDidLoad()

        tableView.tableFooterView = UIView()
    }

    override func willMove(toParentViewController parent: UIViewController?) {
        if parent == nil {
            client = nil
            room = nil
        }

        super.willMove(toParentViewController: parent)
    }
}
