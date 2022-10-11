require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const { serverURL } = require("./utils/utils");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const auth = require("./middlewares/auth");

mongoose.connect(serverURL);

const { PORT = 3000 } = process.env;
const cardsRoute = require("./routes/cards");
const usersRoute = require("./routes/users");
const signInRoute = require("./routes/signIn");
const signUpRoute = require("./routes/signUp");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use("/signup", signUpRoute);
app.use("/signin", signInRoute);
app.use(auth);
app.use("/cards", cardsRoute);
app.use("/users", usersRoute);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});