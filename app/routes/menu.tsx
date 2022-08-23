import { useState } from 'react'
import { motion } from 'framer-motion'
import NavItem from '../components/Menu/NavItem'
import MenuDescription from '../components/Menu/MenuDescription'
import NavContainer from '../components/Layout/NavContainer'

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

const Menu = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedHover, setselectedHover] = useState(null)
  const [currentNav, setCurrentNav] = useState(null)

  const menuItems = [
    {
      className: 'infinite',
      title: 'Infinite Mode',
      color: 'var(--infinite-primary)',
      to: '/infinite',
      badge: 0,
      heading: 'One game to rule them all',
      desc: 'A single game. Multiple players. No end point.',
      desc2:
        'Evolve the game to earn credits, which are then used to Give Life to a cell and change the course of the game for all.',
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
      heading: 'Create your own game (coming soon)',
      desc: 'Explore the communities games and create your own games. Earn 10 credits to spawn your own game and share it with the community.',
      image_url: '/assets/menu/creator.png',
      width: 354,
      height: 354,
    },
    {
      className: 'snapshots',
      title: 'Snapshots',
      color: 'var(--snapshots-primary)',
      to: '/snapshots',
      // TODO number of user owned Snapshots
      badge: 0,
      heading: 'Proof of play',
      desc: 'Evolve the game in infinite mode to generate and store a unique snapshot of your play. ',
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
      heading: 'How does Starknet work?',
      desc: 'StarkNet is a Layer 2 ZK-Rollup technology that is bringing massive scalability to Ethereum while preserving L1 security, permissionless interactions, and decentralization.',
      image_url: '/assets/menu/how.png',
      width: 363,
      height: 426,
    },
  ]
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
          {menuItems &&
            menuItems.map((item, i) => {
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
                    selectedHover={selectedHover}
                    to={item.to}
                    exClassName={item.className}
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
          {menuItems &&
            menuItems.map((item, i) => {
              return (
                <MenuDescription
                  index={i + 1}
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
