import CreditsContainer from './CreditsContainer'
import { useSelector } from 'react-redux'

const CreditsConnected = () => {
  const { activeTokenCount } = useSelector((state) => state.user)
  return <CreditsContainer tokenCount={activeTokenCount} loading={activeTokenCount < 1} />
}

export default CreditsConnected
