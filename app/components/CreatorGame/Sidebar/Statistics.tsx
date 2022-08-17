import SidebarSection from '../../SidebarSection/SidebarSection'
import StatRow from '../../StatRow/StatRow'
import { HiQrcode, HiOutlineUser, HiOutlineHeart } from 'react-icons/hi'
import { BiTimeFive } from 'react-icons/bi'

interface Props {
  readonly title: string
  readonly generations: number
  readonly uniquePlayers: number
  readonly cellsToStart: number
  readonly gamesByUser: number
}

export default function Statistics({ title, generations, cellsToStart, gamesByUser, uniquePlayers }: Props) {
  return (
    <SidebarSection title={title}>
      <StatRow icon={<HiQrcode size={24} />} title="Generations" loading={false} value={generations} />
      <StatRow icon={<HiOutlineUser size={24} />} title="Unique Players" loading={false} value={uniquePlayers} />
      <StatRow
        icon={<HiOutlineHeart size={24} />}
        title="Number of cells to start"
        loading={false}
        value={cellsToStart}
      />
      <StatRow icon={<BiTimeFive size={24} />} title="Number of games by user" loading={false} value={gamesByUser} />
    </SidebarSection>
  )
}
