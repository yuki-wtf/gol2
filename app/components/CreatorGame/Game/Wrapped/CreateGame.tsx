// import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import { useSelector } from 'react-redux'
// import { useCreatorGameContract } from '../../../../hooks/useCreatorGameContract'
import Button from '../../../Button/Button'

const CreateGame = () => {
  const { preSelectedGrid } = useSelector((state) => state.createGame)
  // const { contract } = useCreatorGameContract()
  // const { account } = useStarknet()
  // const { data, loading, error, reset, invoke } = useStarknetInvoke({
  //   contract,
  //   method: 'create',
  // })
  // console.log(error)
  // console.log(data)
  return (
    <Button
      label="Create Game"
      onClick={() => {
        const chosenGameGrid = preSelectedGrid
        // console.log(chosenGameGrid)
        let arr = []
        chosenGameGrid.forEach((row) => {
          const formatRow = parseInt(row.join('').toString(), 2)
          arr.push(formatRow)
        })
        // let invooke = [...arr]
        // console.log(invooke) // if (account) {
        //   console.log(arr);
        //   invoke({
        //     args: [...arr],
        //   });
        // }
      }}
    />
  )
}

export default CreateGame
