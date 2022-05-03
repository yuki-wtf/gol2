import { useState } from "react";
import useEventListener from "../13-useEventListener/useEventListener";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEventListener("resize", () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  });

  return windowSize;
}

// import useWindowSize from "./useWindowSize"

// export default function WindowSizeComponent() {
//   const { width, height } = useWindowSize()

//   return (
//     <div>
//       {width} x {height}
//     </div>
//   )
// }
