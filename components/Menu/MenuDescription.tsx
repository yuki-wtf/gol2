//Todo: Move to styled components
import { motion } from 'framer-motion'
import Image from 'next/image'
const MenuDescriptionVariant = {
  hidden: {
    x: '100%',
    transition: {
      ease: 'easeInOut',
    },
  },
  visible: {
    x: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
}
const titleVariant = {
  hidden: {
    x: 50,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.1,
      ease: 'easeInOut',
    },
  },
}
const descVariant = {
  hidden: {
    x: 50,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.15,
      ease: 'easeInOut',
    },
  },
}
const imgVariant = {
  hidden: {
    x: 50,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      ease: 'easeInOut',
    },
  },
}

const MenuDescription = ({
  data,
  isActive,
  color,
  title,
  desc,
  desc2 = null,
  img,
  alt,
  width = 375,
  height,
  index,
}) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        backgroundColor: color,
        width: '100%',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        textAlign: 'left',
      }}
      initial="hidden"
      variants={MenuDescriptionVariant}
      animate={isActive ? 'visible' : 'hidden'}
    >
      <div
        style={{
          maxWidth: 375,
        }}
      >
        <motion.div animate={isActive ? 'visible' : 'hidden'} initial="hidden" variants={titleVariant}>
          <h3 className="descHeading"> {title}</h3>
        </motion.div>
        <motion.div variants={descVariant}>
          <p className="descP">{desc}</p>
        </motion.div>

        {desc2 !== null ? (
          <motion.div variants={descVariant}>
            <p className="descP">{desc2}</p>
          </motion.div>
        ) : null}
        <motion.div variants={imgVariant}>
          <Image className="descImg" src={img} alt={alt} width={width} height={height} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MenuDescription
