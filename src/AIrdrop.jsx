import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiXCircle, FiCopy } from "react-icons/fi";

export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [signature, setSignature] = useState(null);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(signature);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
        setStatus(null);
        setSignature(null);
        
        try {
            const sig = await connection.requestAirdrop(
                wallet.publicKey,
                solAmount * LAMPORTS_PER_SOL
            );

            setStatus('success');
            setSignature(sig);
            setTimeout(() => setAmount(""), 2000);
            console.log("Transaction Signature:", sig);
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full mx-auto p-8 rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700 shadow-2xl relative overflow-hidden"
        >
            {/* Animated background elements */}
            <motion.div 
                className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-xl"
                animate={{
                    x: [0, 10, 0],
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div 
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-xl"
                animate={{
                    x: [0, -10, 0],
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="relative z-10">
                <motion.h2 
                    className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    SOL Faucet
                </motion.h2>
                
                <motion.p 
                    className="text-gray-400 text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Get test SOL tokens on the Solana devnet
                </motion.p>
                
                <motion.div 
                    className="flex flex-col gap-4 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="relative">
                        <input
                            type="number"
                            className="w-full px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-400 focus:outline-none text-white transition-all"
                            placeholder="Enter SOL amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            step="0.1"
                            min="0"
                        />
                        <motion.span 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            animate={{
                                opacity: amount ? 0 : 1,
                                x: amount ? 10 : 0
                            }}
                        >
                            SOL
                        </motion.span>
                    </div>
                    
                    <motion.button 
                        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                            isLoading || !amount
                                ? "bg-gray-700 cursor-not-allowed"
                                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                        }`}
                        onClick={sendAirdrop}
                        disabled={isLoading || !amount}
                        whileHover={(!isLoading && amount) ? { 
                            y: -2,
                            boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)"
                        } : {}}
                        whileTap={(!isLoading && amount) ? { scale: 0.98 } : {}}
                    >
                        {isLoading ? (
                            <>
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                                Processing...
                            </>
                        ) : status === 'success' ? (
                            <>
                                <FiCheckCircle className="text-xl" />
                                Success!
                            </>
                        ) : status === 'error' ? (
                            <>
                                <FiXCircle className="text-xl" />
                                Try Again
                            </>
                        ) : (
                            <>
                                <span>Request SOL</span>
                                <FiArrowRight />
                            </>
                        )}
                    </motion.button>
                </motion.div>
                
                {wallet.publicKey && (
                    <motion.div 
                        className="text-center mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-sm font-mono text-green-400">
                            Connected: {wallet.publicKey.toBase58().slice(0, 6)}...{wallet.publicKey.toBase58().slice(-4)}
                        </p>
                    </motion.div>
                )}

                <AnimatePresence>
                    {signature && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-semibold text-purple-400">Transaction Signature</h3>
                                <motion.button
                                    onClick={copyToClipboard}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    title="Copy to clipboard"
                                >
                                    <FiCopy />
                                </motion.button>
                            </div>
                            <div className="relative">
                                <p className="text-xs font-mono break-all bg-gray-900/50 p-2 rounded">
                                    {signature}
                                </p>
                                <AnimatePresence>
                                    {copied && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute -top-6 right-0 text-xs bg-green-500/90 text-white px-2 py-1 rounded"
                                        >
                                            Copied!
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                            <motion.a
                                href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-block text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                whileHover={{ x: 2 }}
                            >
                                View on Solana Explorer →
                            </motion.a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}