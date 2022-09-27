const express = require('express')
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const Post = require("./models/post");
const app = express();

mongoose.connect("mongodb+srv://Nishantdb:seyEt52CvQXqp1n3@cluster0.3rjzwdb.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connection to Database');
  })
  .catch(() => {
    console.log('Connection Failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  next();
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  console.log(post);
  res.status(201).json({
    message: 'Post added Successfully'
  })

})

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "1601",
      title: "Node + Angular",
      content: "This is coming from Server"
    },
    {
      id: "1601",
      title: "Node + Angular+1",
      content: "This is coming from Server"
    }
  ];
  res.status(200).json({
    message: 'Post Successful',
    posts: posts
  })
});


module.exports = app