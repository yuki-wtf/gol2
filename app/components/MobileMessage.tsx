import { HiOutlineDesktopComputer } from 'react-icons/hi'

const MobileMessage = () => {
  return (
    <div className="mobileMessage">
      <div className="mobileMessageIconContainer">
        <HiOutlineDesktopComputer size={42} />
      </div>
      <div className="mobileMessageLogoContainer">
        <div>
          <img
            style={{
              width: 230,
            }}
            src="/assets/mobile/mobile_logo.png"
            alt=""
          />
          <p className="mobileMessageLogoContainerTag">A layer 2 gaming experience.</p>
        </div>
      </div>
      <div className="mobileMessageTextContainer">
        <p>
          GOL2 is currently not supported on smaller screens and mobile. Please visit on a device with a larger display.
        </p>
      </div>
    </div>
  )
}

export default MobileMessage
