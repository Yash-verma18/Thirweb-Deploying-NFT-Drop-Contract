import logo from "./logo.svg";
import "./App.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Home from "./Home";
import ConnectContract from "./ConnectContract";

const App = () => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Polygon}>
      <div>
        {/* <Home /> */}
        <ConnectContract />
      </div>
    </ThirdwebProvider>
  );
};
export default App;
