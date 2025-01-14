import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./db.js";
import register from "./routes/registration.route.js";
import login from "./routes/login.route.js";
import courseLookLike from "./routes/LookLike.route.js";
import sectionRoutine from "./routes/sectionRoutine.route.js";
import  userProfile from "./routes/UserPersonal.route.js";
import room from "./routes/Room.route.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/section", sectionRoutine);
app.use("/api/user", userProfile);
app.use("/api/lookLike", courseLookLike);
app.use("/api/room", room);


app.listen(3000, () => {
  console.log(`Server is starting on port 3000`);
});
