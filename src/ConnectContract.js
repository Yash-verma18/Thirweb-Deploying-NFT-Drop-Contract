import React, { useState } from "react";
import {
  useAddress,
  useContract,
  useDisconnect,
  useGrantRole,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useNFTDrop,
  ChainId,
  useSigner,
} from "@thirdweb-dev/react";

import "./Home.css";
import { ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import GrantRoleToConsole from "./GrantRoleToConsole";

function ConnectContract() {
  const address = useAddress();

  console.log("address", address);

  const [nftDropContractAddress, setNftDropContractAddress] = useState("");

  //   const signer = ethers.Wallet.createRandom();
  //   getting a read sdk works, but sometimes it does not due to rate limit
  //   const sdk = ThirdwebSDK.fromSigner("matic");

  const signer = useSigner();
  const sdk = ThirdwebSDK.fromSigner(signer, ChainId.Polygon);

  const connectWithMetamask = useMetamask();
  const isMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  //   const nftDrop = useNFTDrop();

  //   const { contract } = useContract(
  //     "0x4e62a8654CfDbFf79d26C9d16C3993C7236F13b3",
  //     "nft-drop"
  //   );
  //   const { mutate: grantRole, isLoading, error } = useGrantRole(contract);
  //   const grantRoleFunc = async () => {
  //     const grantingRole = await grantRole({
  //       role: "admin",
  //       address: "0xAFA674D8CB333016e10dC5a0ab85263c9BeC915F",
  //       //   address: "0xD855C2351b443221915d4fE45B47483a9D5218a4",
  //     });

  //     console.log("grantingRole", grantingRole);

  //     if (error) {
  //       console.error("failed to grant role", error);
  //     }
  //   };

  //   const readRole = async () => {
  //     const rolesAndMembers = await contract.roles.getAll();
  //     console.log("rolesAndMembers", rolesAndMembers);
  //   };

  //   const getAllDeployedContracts = async () => {
  //     const deployedcontracts = await sdk.getContractList(address);
  //     console.log("deployedcontracts", deployedcontracts);
  //   };

  const deployNFtDropContract = async () => {
    const contractSelected = "nft-drop";
    const contractAddress = await sdk.deployer.deployBuiltInContract(
      contractSelected,
      {
        name: `console nft drop:  ${contractSelected}`,
        primary_sale_recipient: address,
        voting_token_address: address,
        description: `My awesome ${contractSelected} contract`,
        image:
          "https://nft-console-staging-images.s3.ap-south-1.amazonaws.com/images/image-1660740177878-1587650.png",
        // Recipients are required when trying to deploy a split contract
        recipients: [
          {
            address,
            sharesBps: 100 * 100,
          },
        ],
      }
    );

    setNftDropContractAddress(contractAddress);
    console.log("Contract Deployed  address", contractAddress);
  };

  return (
    <div className="container">
      {address ? (
        <div>
          <div className="nftBoxGrid">
            <div
              className="optionSelectBox"
              onClick={() => {
                deployNFtDropContract();
              }}
            >
              <h2 className="selectBoxTitle">Deploy NFT DROP CONTRACT </h2>
              <p className="selectBoxDescription">
                Deploy NFT DROP CONTRACT ON CONSOLE
              </p>
            </div>
          </div>

          {nftDropContractAddress && (
            <GrantRoleToConsole
              nftDropContractAddress={nftDropContractAddress}
            />
          )}
        </div>
      ) : (
        <button className="mainButton" onClick={() => connectWithMetamask()}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectContract;
