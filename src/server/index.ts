import express from "express";
import cors from "cors";
import { today, thisMonth, thisWeek } from "../posts";

const app = express();
app.use(cors());

app.get("/posts", (req, res) => {
  res.json([today, thisWeek, thisMonth]);
});

app.listen(8002, () => {
  console.log("Listening on 8002");
});
