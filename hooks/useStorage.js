import { useCallback, useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}

// import { useSessionStorage, useLocalStorage } from "./useStorage"

// export default function StorageComponent() {
//   const [name, setName, removeName] = useSessionStorage("name", "Kyle")
//   const [age, setAge, removeAge] = useLocalStorage("age", 26)

//   return (
//     <div>
//       <div>
//         {name} - {age}
//       </div>
//       <button onClick={() => setName("John")}>Set Name</button>
//       <button onClick={() => setAge(40)}>Set Age</button>
//       <button onClick={removeName}>Remove Name</button>
//       <button onClick={removeAge}>Remove Age</button>
//     </div>
//   )
// }
