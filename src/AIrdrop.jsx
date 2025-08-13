import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function sendAirdrop() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        const solAmount = parseFloat(amount);
        if (isNaN(solAmount)) {
            alert("Please enter a valid number");
            return;
        }
        
        if (solAmount <= 0) {
            alert("Amount must be greater than 0");
            return;
        }

        setIsLoading(true);
        try {
            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                solAmount * LAMPORTS_PER_SOL
            );

            alert(`🎉 Airdropped ${solAmount} SOL successfully!`);
            console.log("Transaction Signature:", signature);
            setAmount("");
        } catch (err) {
            console.error(err);
            alert("❌ Failed to airdrop SOL");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto p-8 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-purple-500 to-green-400 bg-clip-text text-transparent">
                SOL Faucet
            </h2>
            <p className="text-gray-400 text-center mb-6">
                Get test SOL tokens on the Solana devnet for testing purposes
            </p>
            
            <div className="flex gap-2 mb-4">
                <input
                    type="number"
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 focus:outline-none text-white transition-colors"
                    placeholder="Enter SOL amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.1"
                    min="0"
                />
                <button 
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        isLoading || !amount
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:-translate-y-0.5 hover:shadow-lg"
                    }`}
                    onClick={sendAirdrop}
                    disabled={isLoading || !amount}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing
                        </div>
                    ) : (
                        "Request SOL"
                    )}
                </button>
            </div>
            
            <div className="text-center">
                {wallet.publicKey && (
                    <p className="text-sm font-mono text-green-400">
                        Wallet: {wallet.publicKey.toBase58().slice(0, 6)}...{wallet.publicKey.toBase58().slice(-4)}
                    </p>
                )}
            </div>
        </div>
    );
}