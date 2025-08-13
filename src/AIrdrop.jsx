import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");

    async function sendAirdrop() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }
        console.log(wallet.publicKey.toBase58());




        const solAmount = parseFloat(amount);
        if (isNaN(solAmount) || solAmount <= 0) {
            alert("Please enter a valid SOL amount");
            return;
        }

        try {
            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                solAmount * LAMPORTS_PER_SOL
            );

            alert(`Airdropped ${solAmount} SOL successfully!`);
            console.log("Transaction Signature:", signature);
        } catch (err) {
            console.error(err);
            alert("Failed to airdrop SOL");
        }
    }

    return (
        <div>
            <input
                type="number"
                placeholder="Type your Airdrop amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={sendAirdrop}>Send</button>
        </div>
    );
}
