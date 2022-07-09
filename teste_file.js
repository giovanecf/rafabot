let fs = require("fs");

function readWriteSync(text) {
  var data = fs.readFileSync("logs.txt", "utf-8");

  if (data.length > 0) var newValue = data + "\n" + text;
  else var newValue = text;

  fs.writeFileSync("logs.txt", newValue, "utf-8");

  console.log("readFileSync complete");
}

let clock = new Date(Date.now());

let text =
  "(BTNUSDT)" +
  "[" +
  clock.getDate() +
  "/" +
  clock.getMonth() +
  "/" +
  clock.getFullYear() +
  " - " +
  clock.getHours() +
  ":" +
  clock.getMinutes() +
  ":" +
  clock.getSeconds() +
  "]";
text += " - (<---) BOUGHT AT: 12000USDT" + "\r\n";

readWriteSync(text);
