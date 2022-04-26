/*------------------------------- Importing-------------------------------*/
//Importing
require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

/*------------------------------- Routers-------------------------------*/
const customerRouter = require("./Routers/customerRouter");
const loginRouter =require('./Routers/authRouter');
const receiptRouter = require("./Routers/receiptRouter");
const vendorRouter = require("./Routers/vendorRouter");
const discountRouter = require("./Routers/discountRouter");
const employeeRouter=require("./Routers/employeeRouter");
const flyboyRouter=require("./Routers/flyboyRouters");
const categoryRouter=require("./Routers/categoryRouter");
const returnsRouter=require('./Routers/returnsRouter');
const spoiledRouter=require('./Routers/spoiledRouter');
const storeRouter=require('./Routers/storeRouter');
const ordersRouter = require("./Routers/ordersRouters");
const notificationsRouter= require("./Routers/notificationsRouters");
const productRouter= require("./Routers/productRouter");
const favouriteRouter=require('./Routers/favouriteRouter');


/*------------------------------- Images-------------------------------*/
//image variable
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(path.join(__dirname,"images"));
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toLocaleDateString().replace(/\//g, "-") +
        "-" +
        file.originalname
    )
  }
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  )
    cb(null, true);
  else cb(null, false);
};

/*-------------------------------- create server --------------------------*/

const app = express();
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PUT,OPTIONS"
  );
  response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

/*------------------------------- connect to DB-------------------------------*/

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("connected to lifeSystemDB");
    //listening on port
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`listening to ${port}`);
    });
  })
  .catch((error) => console.log(error));

/*------------------------------- MiddelWares-------------------------------*/

app.use((req, res, next) => {
  morgan(":method :url :status");
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage, fileFilter }).single("image"));

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

/*------------------------------- RoutersMiddleWares-------------------------------*/

app.use(customerRouter);
app.use(loginRouter);
app.use(receiptRouter);
app.use(vendorRouter);
app.use(discountRouter);
app.use(employeeRouter);
app.use(flyboyRouter);
app.use(categoryRouter);
app.use(returnsRouter);
app.use(spoiledRouter);
app.use(storeRouter);
app.use(ordersRouter);
app.use(notificationsRouter);
app.use(productRouter);
app.use(favouriteRouter);


//Not found MW
app.use((request, response) => {
  response.status(404).json({ data: "Page Not Fond" });
});

//Error MW
app.use((error, request, response, next) => {
  //JS  code function.length
  let status = error.status || 500;
  response.status(status).json({ Error: error + "" });
});




