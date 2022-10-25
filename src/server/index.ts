import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { today, thisMonth, thisWeek, Post } from "../posts";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const allPosts = [today, thisWeek, thisMonth];

app.get("/posts", (req, res) => {
  res.json(allPosts);
});

app.post<{}, {}, Post>("/posts", (req, res) => {
  const post = { ...req.body, id: (Math.random() * 1000000).toFixed() };
  allPosts.push(post);
  res.json(post);
});

app.listen(8002, () => {
  console.log("Listening on 8002");
});
