import { useState } from "react";
import DialogWaiting from "../components/DialogWaiting/DialogWaiting";
import DialogTxnError from "../components/DialogTxnError/DialogTxnError";
import DialogError from "../components/DialogError/DialogError";
import DialogWallet from "../components/DialogWallet/DialogWallet";
import Typography from "../components/Typography/Typography";
import Button from "../components/Button/Button";
import Loader from "../components/Loader/Loader";

const Components = () => {
  const [open, setOpen] = useState(false);
  const [openWaiting, setOpenWaiting] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 30, padding: 40 }}
    >
      <Typography.H2>Dialogs</Typography.H2>
      <div>
        <div>
          <DialogWaiting
            open={openWaiting}
            onClose={() => setOpenWaiting(false)}
          />
          <Button
            label="Open Aprroval needed Dialog"
            onClick={() => setOpenWaiting(true)}
          />
        </div>
      </div>
      <div>
        <DialogTxnError open={open} onClose={() => setOpen(false)} />
        <Button label="Open Txn Error Dialog" onClick={() => setOpen(true)} />
      </div>
      <div>
        <DialogError open={openError} onClose={() => setOpenError(false)} />
        <Button label="Open Error Dialog" onClick={() => setOpenError(true)} />
      </div>
      <div>
        <DialogWallet open={openWallet} onClose={() => setOpenWallet(false)} />
        <Button label="Open Wallet" onClick={() => setOpenWallet(true)} />
      </div>
      <Typography.H2>Loader & centered Loader dark theme</Typography.H2>
      <div style={{ display: "flex", flexDirection: "row", gap: 80 }}>
        <Loader />
        <div
          style={{
            width: 500,
            height: 500,
            backgroundColor: "black",
            borderRadius: 8,
          }}
        >
          <Loader centered theme="dark" />
        </div>
      </div>
    </div>
  );
};

export default Components;
