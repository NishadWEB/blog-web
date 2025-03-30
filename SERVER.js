import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
const __dirname = dirname(fileURLToPath(import.meta.url));

let app = express();
let port = process.env.port || 3000;

var counter = 0;

var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var D = new Date();

var Yr = D.getFullYear();
var Mnth = monthNames[D.getMonth()];
var Dte = D.getDate();
var Tme = D.toLocaleTimeString();

var blogs = [];
var copyOfBlogsArray = [...blogs];

var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // heyy .. this is to parse FORM data to js object
app.use(express.json()); // and this is to parse JSON to js object ( for eidt functionailty where i sent json data throught fetch api in event listener...)
app.use(cors());

app.get("/", (req, res) => {
  res.render("home.ejs", {
    blog: blogs,
  });
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/html_css_js/about.html");
});

app.get("/create", (req, res) => {
  res.sendFile(__dirname + "/public/html_css_js/create-blog.html");
});

app.get("/blog", (req, res) => {
  res.send(blogs);
});

//CREATE BLOG
app.post("/submit", (req, res) => {
  var Title = req.body.formTitle; //name = title
  var Quote = req.body.formQuote; //name = quote

  var d = new Date();

  var year = d.getFullYear();
  var month = monthNames[d.getMonth()];
  var date = d.getDate();
  var time = d.toLocaleTimeString();

  let formData = {
    id: counter++,
    title: Title,
    quote: Quote,
    date: `${year} ${month} ${date} , ${time}`
  };

  blogs.push(formData);

  res.redirect("/create"); //  heyyy yuuu....remember , URL act as a GET request
});

// DELETE
app.post("/delete", (req, res) => {
  var id = parseInt(req.body.id); // name = id (in number)
  // blogs = blogs.filter((blog) => blog.id !== id); //filters out the false condition
  
  var actualIndex = blogs.findIndex(element => element.id === id);

  delete blogs[actualIndex];

  blogs = blogs.filter(blog => blog !== undefined)

    res.send({
      blog : blogs
    })
  
});

//EDIT
app.post("/edit", (req, res) => {

  var ID = parseInt(req.body.id); // use this.id for extracting the actual id value form the blog in home page..
  var newTitle = req.body.title;
  var newQuote = req.body.quote;

  var d = new Date();

  var year = d.getFullYear();
  var month = monthNames[d.getMonth()];
  var date = d.getDate();
  var time = d.toLocaleTimeString();

  //returns the object with obj.id === ID which is extracted fromt the req body
  var blogToEdit = blogs.find(element => element.id === ID);

  blogToEdit.title = newTitle;
  blogToEdit.quote = newQuote;
  blogToEdit.date = `${year} ${month} ${date} , ${time}`;

  var data = {
    title : blogToEdit.title,
    quote : blogToEdit.quote,
    date : blogToEdit.date
  };

  res.json(data);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
