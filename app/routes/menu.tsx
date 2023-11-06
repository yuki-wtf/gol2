import { useState } from 'react'
import { motion } from 'framer-motion'
import NavItem from '../components/Menu/NavItem'
import MenuDescription from '../components/Menu/MenuDescription'
import NavContainer from '../components/NavContainer'
import { getUserId } from '~/session.server'
import type { LoaderArgs, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import { sql } from '~/db.server'
import { num } from 'starknet'
import { useLoaderData } from '@remix-run/react'
const hexToDecimalString = num.hexToDecimalString

const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}
const listItem = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
}

interface LoaderData {
  readonly snapshots?: number
}

export async function loader({ request }: LoaderArgs): Promise<TypedResponse<LoaderData>> {
  const userId = await getUserId(request)

  if (userId == null) return json({})

  const result = await sql<{ snapshots: number }>`
    select count(*) as "snapshots"
    from "infinite"
    where "transactionType" = 'game_evolved'
      and "transactionOwner" = ${hexToDecimalString(userId)}
  `

  return json({
    snapshots: result.rows[0]!.snapshots,
  })
}

const Menu = () => {
  const [currentNav, setCurrentNav] = useState<number | null>(null)

  const data = useLoaderData<typeof loader>()

  const menuItems = [
    {
      className: 'infinite',
      title: 'Infinite Mode',
      color: 'var(--infinite-primary)',
      to: '/infinite',
      badge: 0,
      heading: 'One game. Multiple players. No end point.',
      desc: 'Evolve the game to earn GOL tokens. ',
      desc2: '1 GOL token = 1 Give Life to a cell, changing the course of the game for all.',
      image_url: '/assets/menu/infinite.png',
      width: 353,
      height: 353,
    },
    {
      className: 'creator',
      title: 'Creator Mode',
      color: 'var(--creator-primary)',
      to: '/creator',
      badge: 0,
      heading: 'Community created games.',
      desc: 'Creators choose the pattern that sets the game in motion. Evolve games to earn GOL tokens.',
      desc2: '10 GOL tokens = 1 new game.',
      image_url: '/assets/menu/creator.png',
      width: 354,
      height: 354,
    },
    {
      className: 'snapshots',
      title: 'Snapshots',
      color: 'var(--snapshots-primary)',
      to: '/snapshots',
      badge: data.snapshots ?? 0,
      heading: 'Proof of play.',
      desc: 'Evolve the game in infinite mode to generate and store a unique snapshot of your play.',
      desc2: 'Share to twitter.',
      image_url: '/assets/menu/snapshot.png',
      width: 290,
      height: 382,
    },
    {
      className: 'howitworks',
      title: 'How it works',
      color: 'var(--howitworks-primary)',
      to: '/howitworks',
      badge: 0,
      heading: 'How does GoL2 work?',
      desc: 'New to Conways game of life? We’ve got you covered inside.',
      desc2: null,
      image_url: '/assets/menu/howitworks.png',
      width: 353,
      height: 353,
    },
    {
      className: 'about',
      title: 'About GOL2 & Starknet',
      color: 'var(--about-primary)',
      to: '/about',
      badge: 0,
      heading: 'How does StarkNet work?',
      desc: 'StarkNet is a Layer 2 ZK-Rollup that is bringing massive scalability to Ethereum while preserving L1 security, permissionless interactions, and decentralization.',
      desc2: null,
      image_url: '/assets/menu/how.png',
      width: 363,
      height: 426,
    },
  ] as const

  return (
    <NavContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 0,
            width: '59%',
          }}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {menuItems.map((item, i) => {
            return (
              <motion.div
                onMouseEnter={() => setCurrentNav(i + 1)}
                onMouseLeave={() => setCurrentNav(null)}
                key={item.to}
                variants={listItem}
                initial={{
                  opacity: 0,
                  y: -30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <NavItem
                  to={item.to}
                  className={item.className}
                  color={item.color}
                  title={item.title}
                  isActive={i + 1 === currentNav}
                  badge={item.badge}
                />
              </motion.div>
            )
          })}
        </motion.div>
        <div
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            display: 'flex',
            zIndex: 100,
            pointerEvents: 'none',
            width: '41%',
            height: '100vh',
          }}
          className="menuCont"
        >
          {menuItems.map((item, i) => {
            return (
              <MenuDescription
                title={item.heading}
                color={item.color}
                isActive={i + 1 === currentNav}
                desc={item.desc}
                desc2={item.desc2}
                img={item.image_url}
                width={item.width}
                height={item.height}
                key={item.to}
              />
            )
          })}
        </div>
      </div>
    </NavContainer>
  )
}

export default Menu
