import React from "react";
import Dialog from "../Dialog/Dialog";
import { HiOutlineX } from "react-icons/hi";
import Button from "../Button/Button";
import Link from "next/link";
const DialogDownloadWallet = ({ open, onClose }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay>
        <Dialog.Content>
          <Dialog.Title>Download a wallet</Dialog.Title>
          <Dialog.ActionContainer>
            <Link href={"https://github.com/argentlabs/argent-x"}>
              <a target="_blank">
                <Button full label="Argent" secondary />
              </a>
            </Link>
          </Dialog.ActionContainer>
          <Dialog.SmallCopy>
            <p style={{ maxWidth: 322 }}>
              By connecting a wallet, you agree to Starknet’s Terms of Service
              and acknowledge that you have read and understand the Starknet
              Protocol Disclaimer.
            </p>
          </Dialog.SmallCopy>
          <Dialog.Close asChild>
            <button onClick={onClose}>
              <HiOutlineX size={24} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};

export default DialogDownloadWallet;
