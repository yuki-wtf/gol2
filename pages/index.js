import Head from "next/head";
import Image from "next/image";
import Counter from "../components/Counter/Counter";
import Link from "next/link";
import useCounter from "../hooks/useCounter";
import { getStarknet } from "@argent/get-starknet";
import { useEffect } from "react";
export default function Home() {
  // const init = async () => {
  //   const starknet = getStarknet();
  //   const [userWalletContractAddress] = await starknet.enable({
  //     showModal: true,
  //   });
  //   if (starknet.isConnected) {
  //     console.log("connected");
  //     const code = await starknet.account.getCode(
  //       "0x0296707849bfbcf454401229e471304d97abe10641440c9f3f754bb6e926620f"
  //     );
  //     const jsonString = JSON.stringify({ ...code.abi });
  //     console.log(jsonString);
  //   } else {
  //     console.log("not connected");
  //   }
  // };
  // init();
  return (
    <div>
      <div
        style={{
          padding: 100,
          gap: 32,
          display: "flex",
          flexDirection: "column",
        }}
      >
        Landing view
        <Link href="/infinite">
          <a>infinite</a>
        </Link>
        <Link href="/creator">
          <a>Creator</a>
        </Link>
        <Link href="/snapshots">
          <a>Snapshots</a>
        </Link>
        <Link href="/howitworks">
          <a>How it works</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/dialogs">
          <a>Components</a>
        </Link>
      </div>
    </div>
  );
}
