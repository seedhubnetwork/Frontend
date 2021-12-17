import { useState, useContext, useEffect } from "react";
import WalletModal from "../WalletModel/WalletModal";
import { Button } from "react-bootstrap";
import { Web3Context } from "../../context/web3Context";
import "./ConnectButton.scss";

const ConnectedButton = () => {
  const [web3, setWeb3] = useContext(Web3Context);
  const [address, setAddress] = useState(null);
  const [connected, setConnected] = useState(false);

  // Model State
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (!web3) return setAddress("");
    setConnected(window.ethereum.isConnected());
    web3?.eth.getAccounts().then((results) => setAddress(results[0]));
    // setAddress(web3?.eth.getAccounts()[0]);
  }, [web3]);

  const handleDisconnect = (e) => {
    e.preventDefault();
    setConnected(false);
    setWeb3(null);
  };

  return !connected ? (
    <>
      {/* <button
        type="button"
        className="btn btn-connect-wallet"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Connect Wallet
      </button>
      <Modal /> */}
      <Button className="btn-connect-wallet" onClick={() => setModalShow(true)}>
        Connect Wallet
      </Button>

      <WalletModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  ) : (
    <div className="d-flex align-items-center g-0">
      <div className="col me-3">
        {(address?.substr(0, 4) || "") + "..." + (address?.substr(-4, 4) || "")}
      </div>
      <div className="col">
        <Button className="dis-btn" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default ConnectedButton;
