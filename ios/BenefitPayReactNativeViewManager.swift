import BenefitPay_iOS

@objc(BenefitPayReactNativeViewManager)
class BenefitPayReactNativeViewManager: RCTViewManager {
    
    override func view() -> (BenefitPayReactNativeView) {
        return BenefitPayReactNativeView()
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}

class BenefitPayReactNativeView : UIView {
    
    var benefitPayButton: BenefitPayButton!
    let controller = RCTPresentedViewController()
    
    @objc var onErrorCallback: RCTDirectEventBlock?
    @objc var onSuccessCallback: RCTDirectEventBlock?
    @objc var onOrderCreatedCallback: RCTDirectEventBlock?
    @objc var onChargeCreatedCallback: RCTDirectEventBlock?
    @objc var onReadyCallback: RCTDirectEventBlock?
    @objc var onClickedCallback: RCTDirectEventBlock?
    @objc var onCanceledCallback: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        commonInit()
    }
    
    //MARK: - Private methods
    /// Used as a consolidated method to do all the needed steps upon creating the view
    private func commonInit() {
        benefitPayButton = BenefitPayButton()
        self.addSubview(benefitPayButton)
        setupConstraints()
    }
    
    private func setupConstraints() {
        // Defensive coding
        guard let benefitPayButton = self.benefitPayButton else {
            return
        }
        
        // Preprocessing needed setup
        benefitPayButton.translatesAutoresizingMaskIntoConstraints = false
        
        // Define the web view constraints
        let top  = benefitPayButton.topAnchor.constraint(equalTo: self.topAnchor)
        let left = benefitPayButton.leftAnchor.constraint(equalTo: self.leftAnchor)
        let right = benefitPayButton.rightAnchor.constraint(equalTo: self.rightAnchor)
        let bottom = benefitPayButton.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        NSLayoutConstraint.activate([left, right, top, bottom])
        
    }
    
    @objc var color: String = "" {
        didSet {
            self.backgroundColor = .clear
        }
    }
    
    
    
    
    
    
    @objc var config: [String:Any] = [:] {
        didSet {
            benefitPayButton.initBenefitPayButton(configDict: config, delegate: self)
        }
    }
}


extension BenefitPayReactNativeView: BenefitPayButtonDelegate {
    
    func onReady() {
        guard let onReadyCallback = onReadyCallback else {
            return
        }
        onReadyCallback([:])
    }
    
    
    func onClick() {
        guard let onClickedCallback = onClickedCallback else{
            return
        }
        onClickedCallback([:])
    }
    
    func onCanceled() {
        guard let onCanceledCallback = onCanceledCallback else{
            return
        }
        onCanceledCallback([:])
    }
    
    func onError(data: String) {
        guard let onErrorCallback = onErrorCallback else{
            return
        }
        onErrorCallback(["data": data])
    }
    
    func onSuccess(data: String) {
        guard let onSuccessCallback = onSuccessCallback else{
            return
        }
        onSuccessCallback(["data": data])
        
    }
    
    func onOrderCreated(data: String) {
        guard let onOrderCreatedCallback = onOrderCreatedCallback else{
            return
        }
        onOrderCreatedCallback(["data": data])
        
    }
    
    func onChargeCreated(data: String) {
        guard let onChargeCreatedCallback = onChargeCreatedCallback else{
            return
        }
        onChargeCreatedCallback(["data": data])
    }
    
    
    
}

