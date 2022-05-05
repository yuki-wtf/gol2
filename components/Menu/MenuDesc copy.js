import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import DescMenuItem from "./DescMenuItem";
import { AnimatePresence, motion } from "framer-motion";

const MenuDesc = ({ selectedHover }) => {
  // useEffect(() => {
  //   let tl = gsap.timeline({ delay: 0.5 });
  //   tl.fromTo(
  //     headingRef.current,
  //     {
  //       autoAlpha: 0,
  //       y: 30,
  //     },
  //     {
  //       duration: 0.15,
  //       autoAlpha: 1,
  //       y: 0,
  //       ease: "expo.EaseInOut",
  //     }
  //   )
  //     .fromTo(
  //       descRef.current,
  //       {
  //         autoAlpha: 0,
  //         y: 30,
  //       },
  //       {
  //         duration: 0.15,
  //         autoAlpha: 1,
  //         y: 0,
  //         ease: "expo.EaseInOut",
  //       }
  //     )
  //     .fromTo(
  //       imageRef.current,
  //       {
  //         autoAlpha: 0,
  //         y: 30,
  //       },
  //       {
  //         duration: 0.15,
  //         autoAlpha: 1,
  //         y: 0,
  //         ease: "expo.EaseInOut",
  //       }
  //     );

  // }, [selectedHover]);

  const renderDesc = () => {
    switch (selectedHover) {
      case "infinite":
        return (
          <AnimatePresence>
            <DescMenuItem
              alt={selectedHover}
              heading="One game to rule them all"
              desc="A single game. Multiple players. No end point."
              desc2="Evolve the game to earn credits, which are then used to Give Life to a cell and change the course of the game for all. "
              image_url="./assets/menu/infinite.png"
            />
          </AnimatePresence>
        );
      case "creator":
        return (
          <AnimatePresence>
            <DescMenuItem
              alt={selectedHover}
              heading="Create your own game"
              desc="Explore the communities games and create your own games. Earn 10 credits to spawn your own game and share it with the community."
              image_url="./assets/menu/creator.png"
              width={354}
            />
          </AnimatePresence>
        );
      case "snapshots":
        return (
          <AnimatePresence>
            <DescMenuItem
              alt={selectedHover}
              heading="Proof of play"
              desc="Evolve the game in infinite mode to generate and store a unique snapshot of your play. "
              image_url="./assets/menu/snapshot.png"
              width={290}
            />
          </AnimatePresence>
        );
      case "howitworks":
        return (
          <AnimatePresence>
            <DescMenuItem
              alt={selectedHover}
              heading="How does GoL2 work?"
              desc="New to Conways game of life? We’ve got you covered inside."
              image_url={"./assets/menu/howitworks.png"}
            />
          </AnimatePresence>
        );
      case "about":
        return (
          <AnimatePresence>
            <DescMenuItem
              alt={selectedHover}
              heading="How does Starknet work?"
              desc="StarkNet is a Layer 2 ZK-Rollup technology that is bringing massive scalability to Ethereum while preserving L1 security, permissionless interactions, and decentralization."
              image_url={"./assets/menu/how.png"}
            />
          </AnimatePresence>
        );

      default:
        return;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 600 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 600 }}
      style={{
        position: "absolute",
        // top: -120,
        width: "100%",
        backgroundColor: `var(--${
          selectedHover !== undefined ? selectedHover : null
        }-primary)`,
        height: "100vh",
        color: "#0a0c10 ",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderDesc()}
    </motion.div>
  );
};

export default MenuDesc;
