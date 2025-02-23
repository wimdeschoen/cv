import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs", {
        textNavbar : "Home"
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

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`New contact form submission from ${name} (${email}): ${message}`);
  res.send("Thank you for your message!");
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
