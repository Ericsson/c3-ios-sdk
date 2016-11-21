import C3Lib
import Foundation
import UIKit

class RoomsViewController: UITableViewController {
    
    var client: C3Client?
    var room: C3Room?
    
    var source: C3DeviceSource?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        navigationItem.hidesBackButton = true
        
        tableView.tableFooterView = UIView()
        
        client?.on("call", target: self, callback: #selector(onCall))
        
        client?.on("invite", target: self, callback: #selector(onInvite))
        client?.on("leave", target: self, callback: #selector(onLeave))
        client?.on("rooms", target: self, callback: #selector(onRooms))
        
        client?.rooms.forEach {
            $0.on("name", target: self, callback: #selector(onNameChange))
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showMembers" {
            guard let cell = sender as? UITableViewCell else {
                return
            }
            
            guard let controller = segue.destination as? MembersViewController else {
                return
            }
            
            guard let indexPath = tableView.indexPath(for: cell) else {
                return
            }
            
            guard let room = client?.rooms[indexPath.row] else {
                return
            }
            
            controller.title = room.alias ?? room.id
            controller.client = client
            controller.room = room
        } else if segue.identifier == "answerCall" {
            guard let call = sender as? C3Call else {
                return
            }
            
            guard let controller = segue.destination as? CallViewController else {
                return
            }
            
            controller.title = call.peer.name
            controller.call = call
        }
    }
    
    @IBAction func pressedLogoutButton(_ button: UIBarButtonItem) {
        UserDefaults.standard.removeObject(forKey: "authInfo")
        
        client?.logout()
        
        let _ = navigationController?.popToRootViewController(animated: true)
    }
    
    @objc private func onCall(_ call: C3Call) {
        print("Did receive call from \(call.peer.name)")
        
        let controller = UIAlertController(
            title: "Incoming call",
            message: "You have received an incoming call from \(call.peer.name)",
            preferredStyle: .alert)
        
        controller.addAction(UIAlertAction(title: "Answer", style: .default) { action in
            call.start()
            self.performSegue(withIdentifier: "answerCall", sender: call)
        })
        
        controller.addAction(UIAlertAction(title: "Reject", style: .destructive) { action in
            call.hangup()
        })
        
        present(controller, animated: true)
    }
    
    @objc private func onInvite(_ room: C3Room) {
        print("Did receive invite to room \(room.name ?? room.alias ?? room.id) (\(room.membership.rawValue))")
        
        room.join(success: { _ in
            print("Did join room \(room.name ?? room.alias ?? room.id) (\(room.membership.rawValue))")
            self.tableView.reloadData()
        }, failure: {
            print("Did fail to join room \(room.name ?? room.alias ?? room.id): \($0.localizedDescription)")
        })
    }
    
    @objc private func onLeave(_ room: C3Room) {
        print("Did leave room \(room.name) (\(room.membership.rawValue))")
        tableView.reloadData()
    }
    
    @objc private func onRooms() {
        print("Did reload rooms")
        tableView.reloadData()
    }
    
    @objc private func onNameChange() {
        print("Did change room name")
        tableView.reloadData()
    }
}

// MARK: UITableViewDataSource

extension RoomsViewController {
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return client?.rooms.count ?? 0
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell")!
        guard let room = client?.rooms[indexPath.row] else {
            return cell
        }
        
        let count = room.members.count
        
        cell.textLabel?.text = room.name ?? room.alias ?? room.id
        cell.detailTextLabel?.text = "\(room.members.count) member\(count == 1 ? "" : "s")"
        
        return cell
    }
}

// MARK: UITableViewDelegate

extension RoomsViewController {
    
    override func tableView(_ tableView: UITableView, didHighlightRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
}
