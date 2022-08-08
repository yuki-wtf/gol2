import SidebarSection from '../../SidebarSection/SidebarSection'
import StatRow from '../../StatRow/StatRow'
import { HiQrcode, HiOutlineHeart } from 'react-icons/hi'
import { FaSkull } from 'react-icons/fa'
import { BiTimeFive } from 'react-icons/bi'

interface Props {
  readonly title: string
  readonly generations: number
  readonly livesGiven: number
  readonly extinctions: number
  readonly longestStablePeriod: number
}

export default function Statistics({ title, extinctions, generations, livesGiven, longestStablePeriod }: Props) {
  return (
    <SidebarSection title={title}>
      <StatRow icon={<HiQrcode size={24} />} title="Generations" loading={false} value={generations} />
      <StatRow icon={<HiOutlineHeart size={24} />} title="Lives given" loading={false} value={livesGiven} />
      <StatRow icon={<FaSkull size={24} />} title="Extinctions" loading={false} value={extinctions} />
      <StatRow
        icon={<BiTimeFive size={24} />}
        title="Longest stable period"
        loading={false}
        value={longestStablePeriod}
      />
    </SidebarSection>
  )
}
