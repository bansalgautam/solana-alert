import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendEmail = async ({ txHash, alertId, solAmount, email, time = 0 }) => {
  const date = new Date(time).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    dayPeriod: "short",
  });

  const html = `
    <h1>Transaction Alert</h1>
    <p>We just detected a transaction for <b>Alert #${alertId}</b> on <b>${date}</b></p>
    <p>Transaction Hash: <a href="https://explorer.solana.com/tx/${txHash}?cluster=devnet"><b>${txHash}</b></a></p>
    <p>Amount: <b>${solAmount} SOL</b></p>
    <p>Visit <a href="https://solana-alert.vercel.app"><b>Solana alert</b></a> to know more</p>
    `;

  const mailOptions = {
    from: { name: "Solana Alerts", address: process.env.EMAIL },
    to: email,
    subject: "Alert: We just detected a transaction!",
    html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Email sent: " + email + " - " + txHash);
    }
  });
};

export default sendEmail;
