const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, "../templates");
const collection = require("./mongodb");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templatePath)
    /** on port 3000, the connection is made */
app.listen(3000, () => {
    console.log("port connected :: 3000")
});

/** on port 3000 get request, it redirects you to login page template (login.hbs) */
app.get("/", (request, response) => {
    response.render("login");
});

/** post request or after submit formdata using login.hbs, 
 * it redirects you to dashboard page template (dashboard.hbs) if user info is in db 
 * and redirect you to home (home.hbs) if the entry is not there */
app.post("/login", async(request, response) => {
    const { name, password } = request.body;
    collection.findOne({ name: name, password: password }).then((user) => {
        if (user) {
            response.render("dashboard");
            console.log("Auth Success!");
        } else {
            console.log("Auth failed!")
            response.render("home");
        }
    }).catch(err => {
        console.log("Issue with login ", err)
    })
});

/** signup get request, it redirects you to signup page template (login.hbs) */
app.get("/signup", (request, response) => {
    response.render("signup");
});

/** signup post request when user registers 
 * name and password properties are added in the given colletion in the given database using mongoose
 */
app.post("/signup", async(request, response) => {
    const { name, password } = request.body;
    console.log(password + " " + name);
    const data = { name, password };
    await collection.insertMany([data]);
    response.render("home");
});