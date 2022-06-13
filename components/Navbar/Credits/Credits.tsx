import { useStarknet } from '@starknet-react/core'
import CreditsConnected from './CreditsConnected'
import CreditsNotConnected from './CreditsNotConnected'

const Credits = () => {
  const { account } = useStarknet()
  if (account) return <CreditsConnected />
  else {
    return <CreditsNotConnected />
  }
}

export default Credits
