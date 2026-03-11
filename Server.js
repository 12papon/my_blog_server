const express = require("express");
const cors = require("cors");
const corsPolicy = require("./utils/corsPolicy");
const dbConnection = require("./config/databaseConfig/dbConfig");
const errorHandler = require("./middleware/errorHandler/errorHandler");
const router = require("./routes/router");

//app object
const app = express();
//cors setUp
app.use(cors(corsPolicy));
//application lavel middleware
app.use(express.json());
//Database connection
dbConnection();
//Router setUp
app.use("/my_blog", router);
// error handler
app.use(errorHandler);
//Server listen
app.listen(process.env.PORT, () => {
  console.log(`Server Listen to port: ${process.env.PORT}`);
});
