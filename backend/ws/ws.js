import { WebSocket } from "ws";
import db from "../db/db.js";
import { subscribeToAccount } from "../utils/subscribeToAccount.js";
import { getTransactionHash } from "../utils/getTransactionHash.js";
import { Connection } from "@solana/web3.js";

let ws;
let connection;

function connectWebSocket() {
  ws = new WebSocket(process.env.WS_URL);
  connection = new Connection(process.env.HTTP_URL);

  ws.on("open", async () => {
    console.log("Connected to Solana Devnet");
    console.log("Subscribing to accounts...");

    const alerts = await db.alert.findMany();

    let index = -1;
    for (const alert of alerts) {
      index++;
      try {
        // Use a small delay between subscriptions
        subscribeToAccount(alert.address, `temp${alert.userId}${index}`);

        await db.alert.update({
          where: { id: alert.id },
          data: { id: `temp${alert.userId}${index}` },
        });
      } catch (error) {
        console.log("Error subscribing to account:", error);
      }
    }
    console.log("Subscribed to accounts!");
  });

  ws.addEventListener("message", async (event) => {
    const parsedData = JSON.parse(event.data);
    console.log("Received data from Solana Devnet", parsedData);

    if (parsedData.id) {
      if (parsedData.id.toString().startsWith("delete")) {
        return;
      }
      if (parsedData.result) {
        await db.alert.update({
          where: {
            id: parsedData.id,
          },
          data: {
            id: parsedData.result.toString(),
          },
        });
      } else if (parsedData.error) {
        await db.alert.delete({
          where: { id: parsedData.id },
        });
      }
    }

    if (parsedData.method === "accountNotification") {
      const alertId = parsedData.params.subscription.toString();
      const slot = parsedData.params.result.context.slot;
      const alert = await db.alert.findUnique({
        where: { id: alertId },
      });

      if (alert) {
        await getTransactionHash(connection, alert.address, slot, alert.id);
      }
    }
  });

  ws.on("close", () => {
    console.log("Disconnected from Solana Devnet. Reconnecting...");
    setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
  });

  ws.on("error", (error) => {
    console.log("WebSocket error:", error);
    ws.close();
  });
}

// Initialize the WebSocket connection
connectWebSocket();

export default ws;
