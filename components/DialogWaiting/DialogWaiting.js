import React from "react";
import Dialog from "../Dialog/Dialog";
import Loader from "../Loader/Loader";
import { HiOutlineX } from "react-icons/hi";
const DialogWaiting = ({ open, onClose }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay>
        <Dialog.Content>
          <Dialog.IconWrapper>
            <Loader theme="light" />
          </Dialog.IconWrapper>
          <Dialog.Title centered>Waiting for confirmation</Dialog.Title>
          <Dialog.Description centered>
            Confirm this transaction in your wallet
          </Dialog.Description>

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

export default DialogWaiting;
