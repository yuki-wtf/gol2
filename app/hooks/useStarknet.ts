// import { useCallback, useEffect, useState } from "react";
// import { getStarknet } from "get-starknet";
// import { compileCalldata, number, stark } from "starknet";
// import storage from "../utils/storage";
// const gol2Contracts = {
//   infinite:
//     "0x0296707849bfbcf454401229e471304d97abe10641440c9f3f754bb6e926620f",
//   creator: "0x021720286a97c4cb4504de696a28f60a421af77a21f5da9df717d071756d9734",
// };
// const { getSelectorFromName } = stark;
// export const ErrorType = {
//   NoWalletDetected: "NoWalletDetected",
//   WrongNetwork: "WrongNetwork",
// };
// const providerUrl = "https://alpha4.starknet.io";
// const useStarknet = () => {
//   const [starknet, setStarknet] = useState(getStarknet());
//   const [address, setAddress] = useState(starknet.selectedAddress);
//   const [error, setError] = useState(undefined);
//   // Connect Wallet
//   const connect = useCallback(() => {
//     const connectedStarknet = getStarknet();
//     connectedStarknet
//       .enable()
//       .then(([account]) => {
//         setAddress(account);
//       })
//       .then(() => {
//         connectedStarknet.on("accountsChanged", ([account]) => {
//           setAddress(account);
//         });
//       })
//       .catch(() => {
//         setError(ErrorType.NoWalletDetected);
//       })
//       .then(() => {
//         setStarknet(connectedStarknet);
//         storage.set("argentx-connect", true);
//       });
//   }, []);
//   // Disconnect Wallet
//   const disconnect = useCallback(() => {
//     console.log("Hello");
//     storage.remove("argentx-connect");
//     setAddress(undefined);
//   }, []);
//   // Network detection
//   useEffect(() => {
//     if (error && error !== ErrorType.WrongNetwork) {
//       return;
//     }
//     if (
//       providerUrl &&
//       starknet.account &&
//       providerUrl !== starknet.account.baseUrl
//     ) {
//       setError(ErrorType.WrongNetwork);
//     } else {
//       setError(undefined);
//       // if wished to be connected, connect automatically
//       if (storage.get("argentx-connect")) {
//         setTimeout(connect, 750);
//       }
//     }
//   }, [address, error, starknet, connect]);
//   const read = (contractAddress, selector, calldata) => {
//     let contract;
//     if (contractAddress === "infinite") {
//       contract = gol2Contracts.infinite;
//     } else {
//       contract = gol2Contracts.creator;
//     }
//     const selectorHex = stark.getSelectorFromName(selector);
//     let params;
//     if (calldata === undefined) {
//       params = {
//         contract_address: contract,
//         entry_point_selector: selectorHex,
//       };
//     } else {
//       params = {
//         contract_address: contract,
//         entry_point_selector: selectorHex,
//         calldata: [...calldata],
//       };
//     }
//     if (!starknet.signer || !address || error) {
//       // anonymous
//       return starknet.provider.callContract({
//         ...params,
//       });
//     }
//     return starknet.signer.callContract(
//       {
//         ...params,
//       },
//       "",
//       "pending"
//     );
//   };
//   return { address, error, connect, disconnect, read };
// };
// export default useStarknet;
