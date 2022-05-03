import { useEffect, useRef } from "react";

export default function useEventListener(
  eventType,
  callback,
  element = window
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}

// import { useState } from "react"
// import useEventListener from "./useEventListener"

// export default function EventListenerComponent() {
//   const [key, setKey] = useState("")
//   useEventListener("keydown", e => {
//     setKey(e.key)
//   })

//   return <div>Last Key: {key}</div>
// }
