import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const DescMenuItem = (props, ref) => {
  //   const headingRef = useRef(null);
  //   const descRef = useRef(null);
  //   const imageRef = useRef(null);
  const { heading, desc, desc2, image_url, alt, width = 375 } = props;
  return (
    <motion.div
      style={{ maxWidth: 375 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      {/* Todo: turn text into components */}
      <h3 className="descHeading">{heading}</h3>
      <p className="descP">{desc}</p>
      <p className="descP">{desc2}</p>
      <Image
        className="descImg"
        src={image_url}
        alt={alt}
        style={{ width: width }}
      />
    </motion.div>
  );
};

export default DescMenuItem;
