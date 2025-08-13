import { WalletProvider, ConnectionProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { Airdrop } from "./AIrdrop";
import "@solana/wallet-adapter-react-ui/styles.css";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 animate-gradient"
    >
      <div className="container mx-auto px-4 py-8">
        <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
          <WalletProvider wallets={[new UnsafeBurnerWalletAdapter()]} autoConnect>
            <WalletModalProvider>
              <motion.header 
                className="flex flex-col sm:flex-row justify-between items-center mb-12 pb-6 border-b border-gray-800"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h1 
                  className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-0"
                  whileHover={{ scale: 1.02 }}
                >
                  Solana Devnet Faucet
                </motion.h1>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-blue-500 hover:!from-purple-600 hover:!to-blue-600 !rounded-xl !font-semibold !px-6 !py-3 !transition-all" />
                </motion.div>
              </motion.header>
              
              <motion.main 
                className="flex justify-center items-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Airdrop />
              </motion.main>
              
              <motion.footer 
                className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p>This faucet provides test SOL on the Solana devnet</p>
                <motion.p 
                  className="mt-2 text-xs text-gray-600"
                  whileHover={{ scale: 1.05 }}
                >
                  Powered by Solana Web3.js
                </motion.p>
              </motion.footer>
            </WalletModalProvider>          
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </motion.div>
  );
}

export default App;