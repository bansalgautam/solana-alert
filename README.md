# Solana Alerts

## Web App to set alerts on solana blockchain.
Steps to set alerts -
1. Sign up on the platform.
2. Add an address you want to monitor.
3. Whenever a transaction happens that involves that specific public key, you get notification on your email with amount of SOL involved.

## Steps to run web app on your local system -
### Prerequisites
- Google App Password - [Guide](https://support.google.com/accounts/answer/185833?hl=en)
- Solana Websocket and Https RPC - [Helius](https://www.helius.dev/), [Quicknode](https://www.quicknode.com/) or any other of your choice
- Postgres DB URL

### Now navigate to Backend folder and follow these steps -
- Rename .env.sample to .env and update env variables
- Run `yarn run prisma migrate dev` and `yarn run prisma generate`.
- Run `yarn start` to start the backend.

### Now navigate to Frontend folder and follow these steps -
- Rename .env.sample to .env
- Update `VITE_BACKEND_URL` variable if you have changed the port of the backend, otherwise keep it as it is.
- Run `yarn run dev`

Now you should be able to see your app running on http://localhost:5173
