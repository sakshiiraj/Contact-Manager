const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./connectDB/connect");

const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routers/users/user");
const contactRouter = require("./routers/contacts/contact");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);
app.use("/api", contactRouter);

app.listen(process.env.PORT || 8000, (err) => {
  console.log("Server is running");
});
