import "dotenv/config";
import sgMail from "@sendgrid/mail";
import express from "express";
import util from 'util';

const { SENDGRID_API_KEY, PORT = 3000 } = process.env;
// console.log("🚀 ~ file: server.js ~ line 4 ~ SENDGRID_API_KEY", SENDGRID_API_KEY)

if (!SENDGRID_API_KEY) {
  console.error("No API Key Provided");
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY);

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/api/v1/send-message", (req, res) => {
  // This should be req.body
  // const msg = {
  //   to: "james.sherry@thejump.tech",
  //   subject: "Sending with Twilio SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  // };

  const defaults = {
    from: "test@example.com",
  };

  const msg = {
    ...defaults,
    ...req.body,
  };

  console.log(msg);

  (async () => {
    try {
      await sgMail.send(msg);
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      
      res.status(500).send(error);
    }
  })();
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
