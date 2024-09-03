// const express = require("express");
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// require("dotenv/config");

// const authJwt = require("./helpers/jwt");
// const errorHandler = require("./helpers/error-handler");

// app.use(cors());
// app.options("*", cors());

// // Middlewares
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use(morgan("tiny"));
// app.use(authJwt());
// app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
// app.use(errorHandler);

// const api = process.env.API_URL;
// const categoriesRoute = require("./routes/categories");
// const productRoute = require("./routes/products");
// const userRoute = require("./routes/users");
// const orderRoute = require("./routes/orders");
// const supplierRoute = require("./routes/suppliers.js");

// // Routes

// app.use(`${api}/products`, productRoute);
// app.use(`${api}/categories`, categoriesRoute);
// app.use(`${api}/users`, userRoute);
// app.use(`${api}/orders`, orderRoute);
// app.use(`${api}/suppliers`, supplierRoute);

// const dbConfig = require("./config/database.config.js");

// mongoose.Promise = global.Promise;

// // Connecting to the database
// mongoose
//   .connect(dbConfig.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("Successfully connected to the database");
//   })
//   .catch((err) => {
//     console.log("Could not connect to the database. Exiting now...", err);
//     process.exit();
//   });

// // listen for requests
// app.listen(4000, () => {
//   console.log("Server is listening on port 4000");
// });

// ------------------------------------------------------------------------------

// const express = require("express");
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// require("dotenv/config");

// const authJwt = require("./helpers/jwt");
// const errorHandler = require("./helpers/error-handler");

// // Define the allowed origins
// const allowedOrigins = ["http://localhost:3000"];

// // CORS options
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// // Middlewares
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use(morgan("tiny"));
// app.use(authJwt());
// app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
// app.use(errorHandler);

// const api = process.env.API_URL;
// const categoriesRoute = require("./routes/categories");
// const productRoute = require("./routes/products");
// const userRoute = require("./routes/users");
// const orderRoute = require("./routes/orders");
// const supplierRoute = require("./routes/suppliers.js");

// // Routes
// app.use(`${api}/products`, productRoute);
// app.use(`${api}/categories`, categoriesRoute);
// app.use(`${api}/users`, userRoute);
// app.use(`${api}/orders`, orderRoute);
// app.use(`${api}/suppliers`, supplierRoute);

// const dbConfig = require("./config/database.config.js");
// const createDefaultAdmin = require("./controllers/defaultExpert.js");

// mongoose.Promise = global.Promise;

// // creating default admin
// createDefaultAdmin();

// // Connecting to the database
// mongoose
//   .connect(dbConfig.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("Successfully connected to the database");
//   })
//   .catch((err) => {
//     console.log("Could not connect to the database. Exiting now...", err);
//     process.exit();
//   });

// // listen for requests
// app.listen(4000, () => {
//   console.log("Server is listening on port 4000");
// });

// -----------------------------------------------

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

require("dotenv/config");

const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

// CORS options
const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

const api = process.env.API_URL;
const categoriesRoute = require("./routes/categories");
const productRoute = require("./routes/products");
const userRoute = require("./routes/users");
const orderRoute = require("./routes/orders");
const supplierRoute = require("./routes/suppliers.js");

// Routes
app.use(`${api}/products`, productRoute);
app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/users`, userRoute);
app.use(`${api}/orders`, orderRoute);
app.use(`${api}/suppliers`, supplierRoute);

const dbConfig = require("./config/database.config.js");
const createDefaultAdmin = require("./controllers/defaultExpert.js");

mongoose.Promise = global.Promise;

// creating default admin
createDefaultAdmin();

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// listen for requests
app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
