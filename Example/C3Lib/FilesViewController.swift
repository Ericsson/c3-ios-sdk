import cct
import JTSImageViewController
import SDWebImage

class FileTableViewCell: TableViewCell {

    @IBOutlet var senderLabel: UILabel?

    override func prepareForReuse() {
        super.prepareForReuse()

        senderLabel?.text = nil
    }
}

class FilesViewController: RoomDetailsItemViewController {

    let dateFormatter = DateFormatter()

    fileprivate var files = [Event]()

    override func viewDidLoad() {
        super.viewDidLoad()

        dateFormatter.dateFormat = "dd/MMM/yyyy"

        files = room?.events.filter {
            $0.type == "m.room.message" && $0.content["msgtype"] as? String == "m.image"
        }.reversed() ?? []
    }
}

// MARK: UITableViewDataSource

extension FilesViewController {

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return files.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)

        let event = files[indexPath.row]
        if let cell = cell as? FileTableViewCell, let message = Message.fromEvent(event) as? MediaMessage {
            cell.textLabel?.text = message.body
            cell.detailTextLabel?.text = dateFormatter.string(from: Date(timeIntervalSince1970: event.timeInterval))
            cell.senderLabel?.text = event.sender.name

            cell.imageView?.sd_setImage(with: URL(string: client?.parseResourceUri(message.url) ?? message.url)!)
        }

        return cell
    }
}

// MARK: UITableViewDelegate

extension FilesViewController {

    override func tableView(_ tableView: UITableView, shouldHighlightRowAt indexPath: IndexPath) -> Bool {
        return tableView.cellForRow(at: indexPath)?.imageView?.image != nil
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)

        let cell = tableView.cellForRow(at: indexPath)!

        if let imageView = cell.imageView {
            let event = files[indexPath.row]
            let imageInfo = JTSImageInfo()
            imageInfo.altText = event.content["body"] as? String ?? event.content["url"] as? String ?? nil
            imageInfo.image = imageView.image
            imageInfo.referenceRect = imageView.superview?.convert(imageView.frame, to: nil) ?? CGRect.zero
            imageInfo.referenceView = view

            let controller = JTSImageViewController(imageInfo: imageInfo, mode: .image)
            controller?.show(from: self, transition: .fromOriginalPosition)
        }
    }
}
