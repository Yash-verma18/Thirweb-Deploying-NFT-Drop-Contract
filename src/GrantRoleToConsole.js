import { useContract, useGrantRole } from "@thirdweb-dev/react";
import React from "react";
import "./Home.css";
function GrantRoleToConsole({ nftDropContractAddress }) {
  const { contract } = useContract(nftDropContractAddress, "nft-drop");
  const { mutate: grantRole, isLoading, error } = useGrantRole(contract);

  const grantRoleFunc = async () => {
    const grantingRole = await grantRole({
      role: "admin",
      address: "0xAFA674D8CB333016e10dC5a0ab85263c9BeC915F",
      //   address: "0xD855C2351b443221915d4fE45B47483a9D5218a4",
    });

    console.log("grantingRole", grantingRole);

    if (error) {
      console.error("failed to grant role", error);
    }
  };

  return (
    <div>
      <div className="nftBoxGrid">
        <div
          className="optionSelectBox"
          onClick={() => {
            if (isLoading) {
              console.log("Loading Instance");
            } else {
              console.log("Calling grant role func ");
              grantRoleFunc();
            }
          }}
        >
          <h2 className="selectBoxTitle">Grant Admin Role to Console </h2>
          <p className="selectBoxDescription">
            Grant Admin Role To Console for Adding NFT Metadata And setting
            Claim Condition
          </p>
        </div>

        {/* read role + get all deployed contracts */}
        {/* <div>
              <button
                onClick={() => {
                  readRole();
                }}
              >
                read role
              </button>
              <button
                onClick={() => {
                  getAllDeployedContracts();
                }}
              >
                getAllDeployedContracts
              </button>
            </div> */}

        {/* <div
              className="optionSelectBox"
              onClick={() => {
                deployNFtDropContract();
              }}
            >
              <h2 className="selectBoxTitle">Deploy NFT DROP CONTRACT </h2>
              <p className="selectBoxDescription">
                Deploy NFT DROP CONTRACT ON CONSOLE
              </p>
            </div> */}
      </div>
    </div>
  );
}

export default GrantRoleToConsole;
