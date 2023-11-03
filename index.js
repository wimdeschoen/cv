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
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
