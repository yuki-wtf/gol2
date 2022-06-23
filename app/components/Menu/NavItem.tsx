//Todo: Move to styled components
import { BsArrowRight } from 'react-icons/bs'
import { motion } from 'framer-motion'
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

const NavItem = ({
  title,
  onMouseEnter,
  OnMouseLeave,
  to,
  styles,
  color,
  exClassName,
  selectedHover,
  isActive,
  badge,
}) => {
  return (
    <div
      className='alink'
      key={to}
      style={{
        postion: 'relative',
        ...styles,
      }}
    >
      <Link
        to={to}
        className={`link ${exClassName}`}
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
            // width: isActive ? "100%" : 0,
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
