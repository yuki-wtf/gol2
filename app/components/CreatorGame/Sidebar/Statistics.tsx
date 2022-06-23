import React, { useEffect, useMemo } from 'react'
import { useStarknetCall } from '@starknet-react/core'
import { useInfiniteGameContract } from '../../../hooks/useInfiniteGameContract'
import { toBN } from 'starknet/dist/utils/number'
import SidebarSection from '../../SidebarSection/SidebarSection'
import StatRow from '../../StatRow/StatRow'
import { HiQrcode, HiOutlineUser, HiOutlineHeart } from 'react-icons/hi'
import { FaSkull } from 'react-icons/fa'
import { BiTimeFive } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

// import {
//   updateLatestGeneration,
//   updateSelectedGeneration,
// } from "../../../features/Infinite/generations/generationsSlice";
const Statistics = ({ currentGen, title, loading }) => {
  const dispatch = useDispatch()
  return (
    <SidebarSection title={title}>
      <StatRow icon={<HiQrcode size={24} />} title="Generations" loading={loading} value={currentGen} />
      <StatRow icon={<HiOutlineUser size={24} />} title="Unique Players" loading={loading} value={0} />
      <StatRow icon={<HiOutlineHeart size={24} />} title="Number of cells to start" loading={loading} value={0} />
      <StatRow icon={<BiTimeFive size={24} />} title="Number of games by user" loading={loading} value={0} />
    </SidebarSection>
  )
}

export default Statistics
