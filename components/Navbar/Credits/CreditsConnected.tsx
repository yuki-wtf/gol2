import CreditsContainer from './CreditsContainer'
import { useSelector } from 'react-redux'

const CreditsConnected = () => {
  const { activeTokenCountLoaded, activeTokenCount } = useSelector((state) => state.user)

  return <CreditsContainer tokenCount={activeTokenCount} loading={!activeTokenCountLoaded} />
}

export default CreditsConnected
