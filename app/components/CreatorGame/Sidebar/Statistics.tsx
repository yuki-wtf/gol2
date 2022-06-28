import SidebarSection from '../../SidebarSection/SidebarSection'
import StatRow from '../../StatRow/StatRow'
import { HiQrcode, HiOutlineUser, HiOutlineHeart } from 'react-icons/hi'
import { BiTimeFive } from 'react-icons/bi'

const Statistics = ({ currentGen, title, loading }) => {
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
