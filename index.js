// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// return current date/time in unix/utc time
app.get("/api", (req, res) => {
  console.log("new date requested");
  const date = new Date(); // now
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// accept date queries and return unix/utc time
app.get("/api/:date", function (req, res) {
  console.log("Incoming: /api/" + req.params.date);
  const query = req.params.date;
  // try as string
  let date = new Date(query);
  // or as number
  if (!date.getTime()) {
    date = new Date(Number(query));
  }
  // if still fail, return error message to user
  if (!date.getTime()) {
    return res.json({ error: "Invalid Date" });
  }
  // otherwise, return Unix & UTC dates
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
