import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { Item } from "@radix-ui/react-dropdown-menu";
const linkVariant = {
  hidden: {
    width: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.25,
    },
  },
  visible: {
    width: "100%",
  },
};
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
  console.log(typeof badge, badge);
  return (
    <div
      className={`alink`}
      key={to}
      style={{ postion: "relative", ...styles }}
    >
      <Link href={to}>
        <div
          className={`link ${exClassName}`}
          style={{ color: color, position: "relative", cursor: "pointer" }}
        >
          <motion.div
            initial="hidden"
            variants={linkVariant}
            animate={isActive ? "visible" : "hidden"}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,

              height: "100%",
              backgroundColor: color,
              // width: isActive ? "100%" : 0,
              zIndex: 0,
            }}
          />
          <span
            style={{
              letterSpacing: "3.3px",
              position: "relative",
              zIndex: 100000,
              color: isActive ? "black" : color,
            }}
          >
            {title} {`${badge !== 0 ? `(${badge})` : ""}`}
          </span>

          <span>
            <BsArrowRight
              style={{
                color: isActive ? "black" : color,
                position: "relative",
                top: 4,
              }}
            />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NavItem;
