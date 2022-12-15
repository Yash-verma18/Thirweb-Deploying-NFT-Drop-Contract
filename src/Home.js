import React from "react";

import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import ConnectContract from "./ConnectContract";

function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  return (
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect With Metamask</button>
      )}
    </div>
  );
}

export default Home;
