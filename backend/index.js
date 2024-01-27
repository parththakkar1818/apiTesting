const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables from .env file
const cron = require("node-cron");
const { spawn } = require("child_process");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

var cnt=0;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thakkarparth2512@gmail.com", // Your email address
    pass: "rzxt cesp zenk uswu", // Your email password or an app-specific password
  },
});

// Function to send emails
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "thakkarparth2512@gmail.com", // Sender address
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    cnt++;
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Cron job to send emails every day at a specific time (e.g., 12:00 PM)
cron.schedule("*/10 * * * * *", async () => {
  console.log("Running a task every day at 12:00 PM");

  // Define your email content
  const to = "thakkarjinal123@gmail.com";
  const subject = "Daily Email Notification";
  const message = "This is your daily notification message."+cnt;

  const isEmailSent = await sendEmail(to, subject, message);

  if (!isEmailSent) {
    console.error("Error sending daily email");
  }
});


app.post("/",async (req,res)=>{
  cron.schedule("*/10 * * * * *", async () => {
    const { to } = req.body;

    // Create a Nodemailer transporter using your email service provider details
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "thakkarparth2512@gmail.com", // Your email address
        pass: "rzxt cesp zenk uswu", // Your email password or an app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: "thakkarparth2512@gmail.com", // Sender address
      to, // Recipient address (received from the frontend)
      subject: "Test Email", // Subject line
      text: "This is a test email sent from your React app using Nodemailer.", // Email body
    };

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    }
  });
});

app.get("/sendEmail",(req,res)=>{
  var cnt=1;
  cron.schedule("*/10 * * * * *", () => {
    console.log("running a task every second");
    try {
      var to = "parththakkar1208@gmail.com";
      var userName = "Parth";
      
      const sub = "Cron Implementation Successfull!";
      const msg =
        "Dear " + userName + " You have Successfully registreted on event."+cnt;
      const combinedArgs = [to, sub, msg].join(",");
      const pythonProcess = spawn("python", ["send_mail.py", combinedArgs]);

      // Listen for data from the Python process (optional)
      pythonProcess.stdout.on("data", (data) => {
        console.log(`Python stdout: ${data}`);
      });

      // Listen for errors from the Python process (optional)
      pythonProcess.stderr.on("data", (data) => {
        console.error(`Python stderr: ${data}`);
      });

      // When the Python process closes
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          // res.send("Email sent successfully!");
        } else {
          res.status(500).send("Error sending email");
        }
      });
    } catch (error) {
      console.error(error);
    }
    cnt++;
  });
})


app.get("/", (req, res) => {
  res.send("app is working..");
});

app.post("/newsapi", (req, res) => {
  const NewsAPI = require("newsapi");
  const newsapi = new NewsAPI("d80e8e72c90e4c1991e89bd72cd5f5c7");
  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  newsapi.v2
    .topHeadlines({
      category: "technology",
      // sources: "bbc-news,the-verge",
      language: "en",
      //   country: "us",
    })
    .then((response) => {
      console.log(response);
    });
});

app.post("/newsdata", (req, res) => {
  const apiEndpoint =
    "https://newsdata.io/api/1/news?apikey=pub_36095895e853491cb23d479421f9033f095bb&country=au,us";
});

app.post("/bingnewssearch", (request, res) => {
  const http = require("https");

  const options = {
    method: "POST",
    hostname: "bing-news-search1.p.rapidapi.com",
    port: null,
    path: "/news?safeSearch=Off&textFormat=Raw",
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "705f5165e0msh5556e8f0470e3cdp165892jsna699bd4288e1",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.end();
  //"error":{"code":"404","message": "Resource not found"}}
});

app.get("/googlenews", (requ, res) => {
  const http = require("https");

  const options = {
    method: "GET",
    hostname: "google-news-api1.p.rapidapi.com",
    port: null,
    path: "/search?language=%3CREQUIRED%3E",
    headers: {
      "X-RapidAPI-Key": "705f5165e0msh5556e8f0470e3cdp165892jsna699bd4288e1",
      "X-RapidAPI-Host": "google-news-api1.p.rapidapi.com",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.end();
});

app.listen(3001, () => {
  console.log("started on 3001...");
});
