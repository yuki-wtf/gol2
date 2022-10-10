import { BsArrowRight } from 'react-icons/bs'
import { motion } from 'framer-motion'
import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'

const linkVariant = {
  hidden: {
    width: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.25,
    },
  },
  visible: {
    width: '100%',
  },
}

interface Props {
  readonly title: React.ReactNode
  readonly to: LinkProps['to']
  readonly color: React.CSSProperties['color']
  readonly className: string
  readonly isActive: boolean
  readonly badge: number
}

const NavItem = ({ title, to, color, className, isActive, badge }: Props) => {
  return (
    <div
      className="alink"
      style={{
        position: 'relative',
      }}
    >
      <Link
        to={to}
        className={`link ${className}`}
        style={{
          color: color,
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <motion.div
          initial="hidden"
          variants={linkVariant}
          animate={isActive ? 'visible' : 'hidden'}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            height: '100%',
            backgroundColor: color,
            zIndex: 0,
          }}
        />
        <span
          style={{
            letterSpacing: '3.3px',
            position: 'relative',
            zIndex: 100000,
            color: isActive ? 'black' : color,
          }}
        >
          {title} {`${badge !== 0 ? `(${badge})` : ''}`}
        </span>

        <span>
          <BsArrowRight
            style={{
              color: isActive ? 'black' : color,
              position: 'relative',
              top: 4,
            }}
          />
        </span>
      </Link>
    </div>
  )
}

export default NavItem
