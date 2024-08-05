const express = require("express");

const app = express();

const port = "3000";



//routing
const refugios_router = require("./routes/refugios-router");

const personas_router = require("./routes/personas-router");


app.use('/', express.static('public'));


//db
const { isUtf8 } = require('buffer');




app.use(express.json());

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));


//routes

app.use(process.env.URL_REFUGIOS, refugios_router);

app.use(process.env.URL_PERSONAS, personas_router);


app.get(process.env.URL_API, (req, res) => {
  res.render('index');
})


app.listen(port, function () {
  console.log("server on port " + port);

});
