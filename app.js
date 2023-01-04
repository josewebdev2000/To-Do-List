const express = require("express");
const mongoose = require("mongoose");
const date = require("./date");

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const DBUSER = process.env.DBUSER;
const DBPASS = process.env.DBPASS;

const dbURL = `mongodb+srv://${DBUSER}:${DBPASS}@cluster0.sksiy2a.mongodb.net`;
const dbName = "todolistDB";

mongoose.connect(dbURL + "/" + dbName, {useNewUrlParser: true});

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

app.get("/", (req, res) => {


    Item.find({}, (err, foundItems) => {

        if (err)
        {
            res.send(err);
        }
        else
        {
            res.render("list", {listTitle: date.getDate(), newListItems: foundItems});
        }
    });

});

app.post("/", (req, res) => {

    const {newItem} = req.body;

    Item.create({name: newItem}, err => {
        if (err)
        {
            res.send(err);
        }
        else
        {
            res.redirect("/");
        }
    });
});

app.post("/delete", (req, res) => {
    const {postId} = req.body;

    Item.deleteOne({id: postId}, err => {
        if (err)
        {
            res.send(err);
        }
        else
        {
            res.redirect("/");
        }
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
