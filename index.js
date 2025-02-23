import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Also handles JSON requests
app.use(express.static("public"));

// ✅ Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
  },
});

app.get("/", (req, res) => {
    res.render("index.ejs", {
        textNavbar : "Home",
        message: req.query.message || null // Pass the message parameter to the template
      });
});


app.get("/hiking", (req, res) => {
    res.render("hiking.ejs", {
        textNavbar : "Hiking"
      });
});
app.get("/hobbies", (req, res) => {
    res.render("hobbies.ejs", {
        textNavbar : "Hobbies"
      });
});
app.get("/motorcycles", (req, res) => {
    res.render("motorcycles.ejs", {
        textNavbar : "Motorcycles"
      });
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
      textNavbar: "Contact"
  });
});

// ✅ Contact form handler
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
      return res.status(400).send("All fields are required.");
  }

  // 📩 Email options
  const mailOptions = {
      from: email,
      to: "wimdeschoen@gmail.com",  // Your email
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // ✅ Send email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error("Error sending email:", error);
          return res.status(500).send("Error sending message. Please try again.");
      }
      console.log("Email sent:", info.response);

      // ✅ Redirect back to homepage with success message
      res.redirect("/?message=success");
  });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
