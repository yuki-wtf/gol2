import { useState } from "react";
import copy from "copy-to-clipboard";

export default function useCopyToClipboard() {
  const [value, setValue] = useState();
  const [success, setSuccess] = useState();

  const copyToClipboard = (text, options) => {
    const result = copy(text, options);
    if (result) setValue(text);
    setSuccess(result);
    setTimeout(() => {
      setSuccess();
    }, 2000);
  };

  return [copyToClipboard, { value, success }];
}

// import useCopyToClipboard from "./useCopyToClipboard"

// export default function CopyToClipboardComponent() {
//   const [copyToClipboard, { success }] = useCopyToClipboard()

//   return (
//     <>
//       <button onClick={() => copyToClipboard("This was copied")}>
//         {success ? "Copied" : "Copy Text"}
//       </button>
//       <input type="text" />
//     </>
//   )
// }
