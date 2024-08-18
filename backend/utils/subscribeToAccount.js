import ws from "../ws/ws.js";

export const subscribeToAccount = (account, userId) => {
  console.log("Subscribing to account", account, "with user id", userId);
  const requestData = {
    jsonrpc: "2.0",
    id: userId,
    method: "accountSubscribe",
    params: [
      account,
      {
        encoding: "jsonParsed",
        commitment: "finalized",
      },
    ],
  };

  ws.send(JSON.stringify(requestData));
};

export const unsubscribeFromAccount = (subscriptionId) => {
  const requestData = {
    jsonrpc: "2.0",
    id: `delete${subscriptionId}`,
    method: "accountUnsubscribe",
    params: [Number(subscriptionId)],
  };

  ws.send(JSON.stringify(requestData));
};
