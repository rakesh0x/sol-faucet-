
import { WalletProvider, ConnectionProvider } from "@solana/wallet-adapter-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import fs from "fs"
import {UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets"
import { Airdrop } from "./AIrdrop"

import "@solana/wallet-adapter-react-ui/styles.css"


function App() {
  return (
    <>
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[new UnsafeBurnerWalletAdapter]} autoConnect>
          <WalletModalProvider>
            <WalletMultiButton></WalletMultiButton>
            <Airdrop></Airdrop>
          </WalletModalProvider>          
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
