require("dotenv").config({ path: __dirname + "/.env" });
const { MercadoBitcoin } = require("./api");
const { Wallet } = require("./wallet");
let fs = require("fs");

let currency = "";
let OPEN_DAY_PRICE = 0;
let ORDER_PERCENT = 0;

if (false) {
  currency = "BTCUSDT";
  OPEN_DAY_PRICE = 21622.98;
  ORDER_PERCENT = 0.0031;
} else if (true) {
  currency = "ETHUSDT-MOD";
  OPEN_DAY_PRICE = 1237.23;
  ORDER_PERCENT = 0.0713;
} else {
  currency = "ETHUSDT";
  OPEN_DAY_PRICE = 1237.23;
  ORDER_PERCENT = 0.0068;
}

let CURRENT_CRYPTO_VALUE = OPEN_DAY_PRICE;
let DEALS_OF_THE_DAY = { buy: false, sell: false };

const infoApi = new MercadoBitcoin({ currency });

const wallets = [new Wallet(1, 0, 100)];

function createNewWallet(walletsArray) {
  wallets.push(new Wallet(1, 0, 100));
  return wallets.length;
}

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

function readWriteSync(text) {
  var data = fs.readFileSync("logs.txt", "utf-8");

  if (data.length > 0) var newValue = data + "\n" + text;
  else var newValue = text;

  fs.writeFileSync("logs.txt", newValue, "utf-8");

  console.log("readFileSync complete");
}

function obterLog(type, price) {
  /*
  type
  1: buy log
  2: sell log
  all: balace 
  */

  let clock = new Date(Date.now());
  let text = "";
  let log_type_text = "";

  if (type == 1) {
    log_type_text = "(<---) BOUGHT AT: " + price + "USDT";
  } else if (type == 2) {
    log_type_text = "(--->) SOLD AT: " + price + "USDT";
  } else {
    log_type_text =
      "(_|-) BALANCE: " +
      getBalanceInCash() +
      "USDT" +
      " :: currentPrice(" +
      CURRENT_CRYPTO_VALUE +
      ") | openPrice(" +
      OPEN_DAY_PRICE +
      ") | buyPrice(" +
      parseFloat(OPEN_DAY_PRICE - OPEN_DAY_PRICE * ORDER_PERCENT).toFixed(4) +
      ") | sellPrice(" +
      parseFloat(OPEN_DAY_PRICE + OPEN_DAY_PRICE * ORDER_PERCENT).toFixed(4) +
      ")";
  }

  text =
    "(" +
    currency +
    ")" +
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
  text += " - " + log_type_text + "\r\n";

  return text;
}

function getBalanceInCash() {
  return (
    wallets[0].balance.money + wallets[0].balance.crypto * CURRENT_CRYPTO_VALUE
  );
}

function deal(price) {
  /*
  First strategy:
    Buy before sell, and
    sell after bought.
  */
  let buy_order = OPEN_DAY_PRICE - OPEN_DAY_PRICE * ORDER_PERCENT;
  let sell_order = OPEN_DAY_PRICE + OPEN_DAY_PRICE * ORDER_PERCENT;

  //HERE I BUY: CHECK BUY PRICE AND IF I HAVE MONEY TO BUY IT
  if (
    price <= buy_order &&
    wallets[0].balance.money > 0 &&
    !DEALS_OF_THE_DAY.buy
  ) {
    let current_among_crypto = wallets[0].balance.money / price;
    wallets[0].drawOutMoney(wallets[0].balance.money);
    wallets[0].depositCrypto(current_among_crypto);
    DEALS_OF_THE_DAY.buy = true;

    readWriteSync(obterLog(1, price));
  }

  //HERE I SELL: CHECK PRICE TO SELL AND IF I HAVE CRIPTO TO SELL IT
  if (
    price >= sell_order &&
    wallets[0].balance.crypto > 0 &&
    !DEALS_OF_THE_DAY.sell
  ) {
    let current_among_money = wallets[0].balance.crypto * price;
    wallets[0].drawOutCrypto(wallets[0].balance.crypto);
    wallets[0].depositMoney(current_among_money);
    DEALS_OF_THE_DAY.sell = true;

    readWriteSync(obterLog(2, price));
  }
}

/* 
bidPrice - highest price that a buyer is willing to pay for a goods.]
askPrice - the price a seller states they will accept.
lastPrice - is the actual price
*/
const loop = async () => {
  const response = await infoApi.ticker();
  const { openPrice, lowPrice, highPrice, lastPrice, prevClosePrice } =
    response;
  CURRENT_CRYPTO_VALUE = lastPrice;

  let clock = new Date(Date.now());
  if (
    clock.getHours() == 21 &&
    clock.getMinutes() == 00 &&
    clock.getSeconds() == 00
  ) {
    DEALS_OF_THE_DAY = { buy: false, sell: false };
    OPEN_DAY_PRICE = CURRENT_CRYPTO_VALUE;
    readWriteSync(obterLog(3, 0));
  }

  console.log("\n");
  console.log(
    "It's " +
      clock.getHours() +
      ":" +
      clock.getMinutes() +
      ":" +
      clock.getSeconds()
  );
  console.log("BALANCE ");
  console.log("$" + getBalanceInCash().toFixed(4));
  console.log(
    "$" +
      wallets[0].balance.money.toFixed(4) +
      " | " +
      wallets[0].balance.crypto.toFixed(8) +
      currency
  );
  console.log("Bought:", DEALS_OF_THE_DAY.buy, "Sold:", DEALS_OF_THE_DAY.sell);
  console.log("currentPrice | openPrice | buyPrice | sellPrice");
  console.log(
    parseFloat(CURRENT_CRYPTO_VALUE).toFixed(4),
    "     ",
    parseFloat(OPEN_DAY_PRICE).toFixed(4),
    "   ",
    parseFloat(OPEN_DAY_PRICE - OPEN_DAY_PRICE * ORDER_PERCENT).toFixed(4),
    "   ",
    parseFloat(OPEN_DAY_PRICE + OPEN_DAY_PRICE * ORDER_PERCENT).toFixed(4)
  );

  if (!DEALS_OF_THE_DAY.buy || !DEALS_OF_THE_DAY.sell)
    deal(CURRENT_CRYPTO_VALUE);
};

var input = setInterval(() => {
  loop();
}, 1000);
