import Infinite from '.'
import type { MetaFunction } from '@remix-run/react/routeModules'

export const meta: MetaFunction = ({ params, parentsData }) => {
  return {
    title: 'CREATE GAMES. GIVE LIFE. EVOLVE.',
    description:
      'GoL2 a fun and interactive way to introduce new users and developers to smart contracts written in Cairo. With Starknet. Game of Life...',
    'twitter:card': 'summary_large_image',
    'og:image': `${parentsData.root.env.BASE_URL}/images/infinite/${params.gen}.png`,
    'og:image:type': 'image/png',
    'og:image:width': String(514 * 4),
    'og:image:height': String(293 * 4),
  }
}

export default Infinite