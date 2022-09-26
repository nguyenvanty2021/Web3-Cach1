import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import {ethers} from 'ethers'
import { useState } from "react/cjs/react.development";
import Web3 from "web3";
import SimpleStorage_abi from './../contracts/SimpleStorage_abi.json'
import { injected } from "../components/wallet/connectors";
import { init } from "../Web3Client";
export default function Home() {
  let contractAddress = "0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3";
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  // khi connect thì active sẽ = true
  console.log(active);
  // chứa address của ví meta mask khi connect thành công mới có
  console.log(account);
  console.log(library);
  console.log(connector);
  console.log(activate);
  console.log(deactivate);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [currentContractVal, setCurrentContractVal] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  // cách 1
  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }
  // cách 1
  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }
  // cách 1
  // const providerUrl = process.env.PROVIDER_URL || 'http://localhost:3001'
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        connect();
      }
    };
    connectWalletOnPageLoad();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      {/* cách 1 */}
      <button
        onClick={connect}
        className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
      >
        Connect to MetaMask
      </button>
      {active ? (
        <span>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
      <button
        onClick={disconnect}
        className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
      >
        Disconnect
      </button>
    </div>
  );
}
