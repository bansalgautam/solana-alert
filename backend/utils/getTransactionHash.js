import { PublicKey } from "@solana/web3.js";
import db from "../db/db.js";

async function getTransactionHash(connection, address, slot, alertId) {
  const accountPublicKey = new PublicKey(address);
  const signatures = await connection.getSignaturesForAddress(
    accountPublicKey,
    { limit: 10 }
  );

  // Find the signature that matches the slot number
  const matchingSignature = signatures.find(
    (signature) => signature.slot === slot + 1
  );

  if (matchingSignature) {
    const transaction = await connection.getParsedTransaction(
      matchingSignature.signature
    );

    // Extract the SOL amount transferred
    let solAmount = 0;

    if (transaction && transaction.meta) {
      const preBalances = transaction.meta.preBalances;
      const postBalances = transaction.meta.postBalances;

      if (preBalances && postBalances) {
        const balanceChange = preBalances[0] - postBalances[0];
        solAmount = balanceChange / 1e9; // Convert lamports to SOL
      }
    }

    await db.transaction.create({
      data: {
        txHash: matchingSignature.signature,
        alertId,
        solAmount,
      },
    });
  } else {
    console.log("No matching transaction found for the slot.");
  }
}

export { getTransactionHash };
