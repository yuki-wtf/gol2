import DescMenuItem from "./DescMenuItem";
import { motion } from "framer-motion";

const MenuDesc = ({ selectedHover }) => {
  const renderDesc = () => {
    switch (selectedHover) {
      case "infinite":
        return (
          <DescMenuItem
            alt={selectedHover}
            heading="One game to rule them all"
            desc="A single game. Multiple players. No end point."
            desc2="Evolve the game to earn credits, which are then used to Give Life to a cell and change the course of the game for all. "
            image_url="./assets/menu/infinite.png"
          />
        );
      case "creator":
        return (
          <DescMenuItem
            alt={selectedHover}
            heading="Create your own game"
            desc="Explore the communities games and create your own games. Earn 10 credits to spawn your own game and share it with the community."
            image_url="./assets/menu/creator.png"
            width={354}
          />
        );
      case "snapshots":
        return (
          <DescMenuItem
            alt={selectedHover}
            heading="Proof of play"
            desc="Evolve the game in infinite mode to generate and store a unique snapshot of your play. "
            image_url="./assets/menu/snapshot.png"
            width={290}
          />
        );
      case "howitworks":
        return (
          <DescMenuItem
            alt={selectedHover}
            heading="How does GoL2 work?"
            desc="New to Conways game of life? We’ve got you covered inside."
            image_url={"./assets/menu/howitworks.png"}
          />
        );
      case "about":
        return (
          <DescMenuItem
            alt={selectedHover}
            heading="How does Starknet work?"
            desc="StarkNet is a Layer 2 ZK-Rollup technology that is bringing massive scalability to Ethereum while preserving L1 security, permissionless interactions, and decentralization."
            image_url={"./assets/menu/how.png"}
          />
        );

      default:
        return;
    }
  };

  return (
    <motion.div
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
