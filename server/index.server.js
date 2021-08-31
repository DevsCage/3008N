const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { auth } = require("express-openid-connect");
const StudentRouter = require("./src/routes/studentRoutes");
const AuthRouter = require("./src/routes/authRoute");
const MiscRouter = require("./src/routes/miscRoutes");
const MarksCardRouter = require("./src/routes/marksCardRoute");
const StaffRouter = require("./src/routes/staffRoutes");
const FeeRouter = require("./src/routes/feeRoutes");
const PaymentLogRouter = require("./src/routes/paymentLogRoutes");
const ExamRouter = require("./src/routes/examFeeRoutes");

const { requiresAuth } = require("express-openid-connect");

const app = express();
app.use(cookieParser());
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "fjhbskjghbsghsbjkhsbfuyfusabguyasgfuyr",
  baseURL: "http://localhost:5000",
  clientID: "KKTdElpYNIadMeVQosV2Q3JlwOksBCG4",
  issuerBaseURL: "https://dev-3niataf3.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  console.log(res, "RES");
  // console.log(req);
  // res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  if (req.oidc.isAuthenticated()) {
    res.redirect("http://localhost:3000/");
  } else {
    res.send("<h1>Logged OUt</h1>");
  }
});

dotenv.config();
app.use(
  cors({
    origin: true,
    credentials: true,
    // origin: 'localhost:1550',
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to server " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set("useFindAndModify", false);

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.use("/api", StudentRouter);
app.use("/api", ExamRouter);
app.use("/api", AuthRouter);
app.use("/api", MiscRouter);
app.use("/api", MarksCardRouter);
app.use("/api", StaffRouter);
app.use("/api", FeeRouter);
app.use("/api", PaymentLogRouter);
