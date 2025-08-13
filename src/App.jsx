import { WalletProvider, ConnectionProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { Airdrop } from "./AIrdrop";
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 animate-gradient">
      <div className="container mx-auto px-4 py-8">
        <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
          <WalletProvider wallets={[new UnsafeBurnerWalletAdapter()]} autoConnect>
            <WalletModalProvider>
              <header className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-800">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-0">
                  Solana Devnet Faucet
                </h1>
                <div className="wallet-connector">
                  <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-blue-500 hover:!from-purple-600 hover:!to-blue-600 !rounded-lg !font-semibold !transition-all hover:!-translate-y-0.5 hover:!shadow-lg" />
                </div>
              </header>
              <main className="flex justify-center items-center py-12">
                <Airdrop />
              </main>
              <footer className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
                <p>This faucet provides test SOL on the Solana devnet</p>
              </footer>
            </WalletModalProvider>          
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </div>
  );
}

export default App;