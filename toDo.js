const express = require('express');
const bodyParser = require("body-parser");
const app = express();

var taskList = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/static', express.static('public'));

app.get("/", function (rq, res) {
    var today = new Date();
    var formatDate = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    var todayDate = today.toLocaleDateString("en-US", formatDate);
    res.render("list", {day: todayDate, taskList: taskList});
});

app.get("/:taskName", function (req, res) {
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].name === req.params.taskName) {
            taskList[i].isDone = !taskList[i].isDone;
        }
    }
    res.status(200).send();
});

app.delete("/:taskName", function (req, res) {
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].name === req.params.taskName) {
            taskList.splice(i, 1); 
        }
    }
    res.status(200).send();
});

app.post("/", function (req, res) {
    var item = req.body.newItem;
    if(item!==""){
        taskList.push({
            name: item,
            isDone: false
        });
    };
    res.redirect('/');
});

app.listen(3000, function () {
    console.log(`Server started on port`);
});
