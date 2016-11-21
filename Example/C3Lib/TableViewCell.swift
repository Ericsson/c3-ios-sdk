import UIKit

class TableViewCell: UITableViewCell {
    
    private weak var _imageView: UIImageView?
    private weak var _textLabel: UILabel?
    private weak var _detailTextLabel: UILabel?
    
    @IBOutlet override var imageView: UIImageView? {
        
        get {
            return self._imageView
        }
        
        set {
            self._imageView = newValue
        }
    }
    
    @IBOutlet override var textLabel: UILabel? {
        
        get {
            return self._textLabel
        }
        
        set {
            self._textLabel = newValue
        }
    }
    
    @IBOutlet override var detailTextLabel: UILabel? {
        
        get {
            return self._detailTextLabel
        }
        
        set {
            self._detailTextLabel = newValue
        }
    }
    
    override func prepareForReuse() {
        super.prepareForReuse()
        
        self.imageView?.image = nil
        self.textLabel?.text = nil
        self.detailTextLabel?.text = nil
    }
}
