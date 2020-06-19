const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/static', express.static('public'));

const formatDate = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};
const today = new Date();
const todayDate = today.toLocaleDateString("en-US", formatDate);

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true })
    .then(() => {
        console.log('mongoose conected');
    })
    .catch((err) => {
        console.log(`mongoose connection error ${err}`);
    });

const itemSchema = mongoose.Schema({
    name: String,
    isDone: Boolean
});
const itemModel = mongoose.model("item", itemSchema);

app.get("/", function (req, res) {
    itemModel.find({}, function (err, foundItems) {
        res.render("list", {
            day: todayDate,
            listTitle: "To-Do List",
            newListItems: foundItems
        });
    });
});

app.get("/:checkbox", function (req, res) {
    itemModel.findById(req.params.checkbox, function (err, itemToChange) {
        if (err) {
            return res.redirect('/errorpage.html');
        }
        else {
            itemToChange.isDone = !itemToChange.isDone;
            itemToChange.save({}, function (err, updatedItem) {
                if (err) {
                    return res.redirect('/errorpage.html');
                }
                else {
                    res.redirect('/');
                }
            });
        }
    })
});

app.delete("/:delete", function (req, res) {
    itemModel.findByIdAndRemove(req.params.delete, function (err, deletedItem) {
        if (err) {
            return res.redirect('/errorpage.html');
        }
        else {
            res.redirect('/');
        }
    })
});

app.post("/", function (req, res) {
    const taskName = req.body.taskName;
    const item = new itemModel({
        name: taskName,
        isDone: false
    });
    item.save({}, function (err, savedItem) {
        if (err) {
            return res.redirect('/errorpage.html');
        }
        else {
            return res.redirect('/');
        }
    });
});

app.listen(3000, function () {
    console.log(`Server started on port`);
});
