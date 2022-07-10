require("dotenv").config({ path: __dirname + "/.env" });
const { MercadoBitcoin } = require("./api");
const { Wallet } = require("./wallet");
const { Coin } = require("./coin");
const { Trade } = require("./trade");
let fs = require("fs");

/*
Estratégias:
() Conservador once
() Moderador once
() Alto risco once

() Conservador nonstop
() Moderador nonstop
() Alto risco nonstop

() Implementar operação


Moeda
- nome
- preco
- preco inicial

Operacao
- Moeda
- Porcentagem de ordem compra/venda
- Ordem de Compra
- Ordem de Venda

Carteira
- Valor em moeda
- Valor em crypto
- Operacao Atual
*/

const CONSOLE_IT = true;
let FIRST_CYCLE_PASSED = false;
const coin_data_BTC = { name: "BTCUSDT", openValue: 21581.1 };
const coin_data_ETH = { name: "ETHUSDT", openValue: 1216.01 };

//One wallet for every strategy
const wallets_BTC = [
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.0031),
    "BTC CONSERVATIVE"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.0555),
    "BTC MODERATE"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.1107),
    "BTC HIGH RISC"
  ),
];

const wallets_ETH = [
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.0068),
    "ETH CONSERVATIVE"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.0713),
    "ETH MODERATE"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.1406),
    "ETH HIGH RISC"
  ),
];

const wallets_nonstop_BTC = [
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.0031),
    "BTC CONSERVATIVE NONSTOP"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.0555),
    "BTC MODERATE NONSTOP"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.1107),
    "BTC HIGH RISC NONSTOP"
  ),
];

const wallets_nonstop_ETH = [
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.0068),
    "ETH CONSERVATIVE NONSTOP"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.0713),
    "ETH MODERATE NONSTOP"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.1406),
    "ETH HIGH RISC NONSTOP"
  ),
];

const wallets_smart_gain_BTC = [
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.0031),
    "BTC CONSERVATIVE SMART GAIN"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.0555),
    "BTC MODERATE SMART GAIN"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.1107),
    "BTC HIGH RISC SMART GAIN"
  ),
];

const wallets_smart_gain_ETH = [
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.0068),
    "ETH CONSERVATIVE SMART GAIN"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.0713),
    "ETH MODERATE SMART GAIN"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.1406),
    "ETH HIGH RISC SMART GAIN"
  ),
];

const wallets_smart_gain_nonstop_BTC = [
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.0031),
    "BTC CONSERVATIVE SMART GAIN NONSTOP"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.0555),
    "BTC MODERATE SMART GAIN NONSTOP"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_BTC.name, coin_data_BTC.openValue), 0.1107),
    "BTC HIGH RISC SMART GAIN NONSTOP"
  ),
];

const wallets_smart_gain_nonstop_ETH = [
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.0068),
    "ETH CONSERVATIVE SMART GAIN NONSTOP"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.0713),
    "ETH MODERATE SMART GAIN NONSTOP"
  ),
  new Wallet(
    0,
    0,
    100,
    new Trade(new Coin(coin_data_ETH.name, coin_data_ETH.openValue), 0.1406),
    "ETH HIGH RISC SMART GAIN NONSTOP"
  ),
];

const infoApi_BTC = new MercadoBitcoin({ currency: coin_data_BTC.name });
const infoApi_ETH = new MercadoBitcoin({
  currency: coin_data_ETH.name,
});

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

function readWriteSync(file, text, rewrite) {
  var data = fs.readFileSync(file, "utf-8");
  var newValue = "";

  if (rewrite) {
    newValue = text;
  } else {
    if (data.length > 0) newValue = data + "\n" + text;
    else newValue = text;
  }

  fs.writeFileSync(file, newValue, "utf-8");

  //console.log("Log saved!");
}

function obterLog(type, price, wallet) {
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
      getBalanceInCash(price, wallet) +
      "USDT" +
      " :: currentPrice(" +
      price +
      ") | openPrice(" +
      wallet.current_trade.coin.open_price +
      ") | buyPrice(" +
      parseFloat(wallet.current_trade.order_buy).toFixed(4) +
      ") | sellPrice(" +
      parseFloat(wallet.current_trade.order_sell).toFixed(4) +
      ")";
  }

  text =
    "(" +
    wallet.description +
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
    "]" +
    " - " +
    log_type_text +
    "\r\n";

  return text;
}

function getBalanceInCash(price, wallet) {
  return wallet.balance.money + wallet.balance.crypto * price;
}

function deal(price, wallets) {
  /*
  First strategy:
    Buy before sell, and
    sell after bought.
*/

  wallets.forEach((element) => {
    let order_buy = element.current_trade.order_buy;
    let order_sell = element.current_trade.order_sell;

    //HERE I BUY: CHECK BUY PRICE AND IF I HAVE MONEY TO BUY IT
    if (price <= order_buy && element.balance.money > 0 && !element.hasBought) {
      let current_among_crypto = element.balance.money / price;
      element.drawOutMoney(element.balance.money);
      element.depositCrypto(current_among_crypto);
      element.hasBought = true;

      readWriteSync("logs.txt", obterLog(1, price, element), false);
    }

    //HERE I SELL: CHECK PRICE TO SELL AND IF I HAVE CRIPTO TO SELL IT
    if (price >= order_sell && element.balance.crypto > 0 && !element.hasSold) {
      let current_among_money = element.balance.crypto * price;
      element.drawOutCrypto(element.balance.crypto);
      element.depositMoney(current_among_money);
      element.hasSold = true;

      readWriteSync("logs.txt", obterLog(2, price, element), false);
    }
  });
}

function deal_nonstop(price, wallets) {
  /*
  First strategy:
    Buy before sell, and
    sell after bought.
  */

  wallets.forEach((element) => {
    let order_buy = element.current_trade.order_buy;
    let order_sell = element.current_trade.order_sell;

    //HERE I BUY: CHECK BUY PRICE AND IF I HAVE MONEY TO BUY IT
    if (price <= order_buy && element.balance.money > 0) {
      let current_among_crypto = element.balance.money / price;
      element.drawOutMoney(element.balance.money);
      element.depositCrypto(current_among_crypto);
      element.hasBought = true;

      readWriteSync("logs.txt", obterLog(1, price, element), false);
    }

    //HERE I SELL: CHECK PRICE TO SELL AND IF I HAVE CRIPTO TO SELL IT
    if (price >= order_sell && element.balance.crypto > 0) {
      let current_among_money = element.balance.crypto * price;
      element.drawOutCrypto(element.balance.crypto);
      element.depositMoney(current_among_money);
      element.hasSold = true;

      readWriteSync("logs.txt", obterLog(2, price, element), false);
    }
  });
}

function getNewOrderBuySell(price, wallets) {
  wallets.forEach((element) => {
    if (element.hasDailyTradeDone || !FIRST_CYCLE_PASSED) {
      element.current_trade.coin.open_price = price;
      element.current_trade.generateNewOrderBuySell();
      element.hasBought = false;
      element.hasSold = false;
    }
  });
}

/* 
bidPrice - highest price that a buyer is willing to pay for a goods.]
askPrice - the price a seller states they will accept.
lastPrice - is the actual price
*/
async function loop() {
  const response_BTC = await infoApi_BTC.ticker();
  const response_ETH = await infoApi_ETH.ticker();

  const current_price_BTC = response_BTC.lastPrice;
  const current_price_ETH = response_ETH.lastPrice;

  let clock = new Date(Date.now());
  if (
    clock.getHours() + clock.getTimezoneOffset() / 60 == 24 &&
    clock.getMinutes() == 00 &&
    clock.getSeconds() == 00
  ) {
    wallets_BTC.forEach((element) => {
      readWriteSync("logs.txt", obterLog(3, price, element), false);
    });

    wallets_nonstop_BTC.forEach((element) => {
      readWriteSync("logs.txt", obterLog(3, price, element), false);
    });

    wallets_smart_gain_BTC.forEach((element) => {
      readWriteSync("logs.txt", obterLog(3, price, element), false);
    });

    wallets_smart_gain_nonstop_BTC.forEach((element) => {
      readWriteSync("logs.txt", obterLog(3, price, element), false);
    });

    wallets_ETH.forEach((element) => {
      readWriteSync("logs.txt", obterLog(3, price, element), false);
    });

    wallets_nonstop_ETH.forEach((element) => {
      readWriteSync("logs.txt", obterLog(3, price, element), false);
    });

    wallets_smart_gain_ETH.forEach((element) => {
      readWriteSync("logs.txt", obterLog(3, price, element), false);
    });

    wallets_smart_gain_nonstop_ETH.forEach((element) => {
      readWriteSync("logs.txt", obterLog(3, price, element), false);
    });

    //CONFIG WALLETS
    wallets_BTC.forEach((element) => {
      if (element.hasDailyTradeDone) {
        element.current_trade.coin.open_price = current_price_BTC;
        element.current_trade.generateNewOrderBuySell();
      }
    });
    wallets_smart_gain_BTC.forEach((element) => {
      if (element.hasBought && !element.hasSold) {
        element.current_trade.order_sell =
          element.current_trade.coin.open_price *
          Math.pow(
            1 + element.current_trade.order_percent,
            ++element.current_trade.daysWithoutSelling
          );
      }
      element.current_trade.coin.open_price = current_price_BTC;
      element.current_trade.generateNewOrderBuySell();
    });

    wallets_ETH.forEach((element) => {
      if (element.hasDailyTradeDone) {
        element.current_trade.coin.open_price = current_price_ETH;
        element.current_trade.generateNewOrderBuySell();
      }
    });
    wallets_smart_gain_ETH.forEach((element) => {
      if (element.hasBought && !element.hasSold) {
        element.current_trade.order_sell =
          element.current_trade.coin.open_price *
          Math.pow(
            1 + element.current_trade.order_percent,
            ++element.current_trade.daysWithoutSelling
          );
      }
      element.current_trade.coin.open_price = current_price_ETH;
      element.current_trade.generateNewOrderBuySell();
    });
  }

  getNewOrderBuySell(current_price_BTC, wallets_nonstop_BTC);
  getNewOrderBuySell(current_price_BTC, wallets_smart_gain_nonstop_BTC);
  getNewOrderBuySell(current_price_ETH, wallets_nonstop_ETH);
  getNewOrderBuySell(current_price_ETH, wallets_smart_gain_nonstop_ETH);
  FIRST_CYCLE_PASSED = true;

  deal(current_price_BTC, wallets_BTC);
  deal_nonstop(current_price_BTC, wallets_nonstop_BTC);
  deal(current_price_BTC, wallets_smart_gain_BTC);
  deal_nonstop(current_price_BTC, wallets_smart_gain_nonstop_BTC);
  deal(current_price_ETH, wallets_ETH);
  deal_nonstop(current_price_ETH, wallets_nonstop_ETH);
  deal(current_price_ETH, wallets_smart_gain_ETH);
  deal_nonstop(current_price_ETH, wallets_smart_gain_nonstop_ETH);

  if (CONSOLE_IT) {
    wallets_BTC.forEach((element) =>
      console.log(
        "(" +
          element.description +
          ") - " +
          parseFloat(getBalanceInCash(current_price_BTC, element)).toFixed(4) +
          "USDT" +
          " | " +
          element.current_trade.coin.open_price +
          " : " +
          element.current_trade.order_buy +
          " - " +
          element.current_trade.order_sell
      )
    );
    wallets_nonstop_BTC.forEach((element) =>
      console.log(
        "(" +
          element.description +
          ") - " +
          parseFloat(getBalanceInCash(current_price_BTC, element)).toFixed(4) +
          "USDT" +
          " | " +
          element.current_trade.coin.open_price +
          " : " +
          element.current_trade.order_buy +
          " - " +
          element.current_trade.order_sell
      )
    );
    wallets_smart_gain_BTC.forEach((element) =>
      console.log(
        "(" +
          element.description +
          ") - " +
          parseFloat(getBalanceInCash(current_price_BTC, element)).toFixed(4) +
          "USDT" +
          " | " +
          element.current_trade.coin.open_price +
          " : " +
          element.current_trade.order_buy +
          " - " +
          element.current_trade.order_sell
      )
    );
    wallets_smart_gain_nonstop_BTC.forEach((element) =>
      console.log(
        "(" +
          element.description +
          ") - " +
          parseFloat(getBalanceInCash(current_price_BTC, element)).toFixed(4) +
          "USDT" +
          " | " +
          element.current_trade.coin.open_price +
          " : " +
          element.current_trade.order_buy +
          " - " +
          element.current_trade.order_sell
      )
    );
    wallets_ETH.forEach((element) =>
      console.log(
        "(" +
          element.description +
          ") - " +
          parseFloat(getBalanceInCash(current_price_ETH, element)).toFixed(4) +
          "USDT" +
          " | " +
          element.current_trade.coin.open_price +
          " : " +
          element.current_trade.order_buy +
          " - " +
          element.current_trade.order_sell
      )
    );
    wallets_nonstop_ETH.forEach((element) =>
      console.log(
        "(" +
          element.description +
          ") - " +
          parseFloat(getBalanceInCash(current_price_ETH, element)).toFixed(4) +
          "USDT" +
          " | " +
          element.current_trade.coin.open_price +
          " : " +
          element.current_trade.order_buy +
          " - " +
          element.current_trade.order_sell
      )
    );
    wallets_smart_gain_ETH.forEach((element) =>
      console.log(
        "(" +
          element.description +
          ") - " +
          parseFloat(getBalanceInCash(current_price_ETH, element)).toFixed(4) +
          "USDT" +
          " | " +
          element.current_trade.coin.open_price +
          " : " +
          element.current_trade.order_buy +
          " - " +
          element.current_trade.order_sell
      )
    );
    wallets_smart_gain_nonstop_ETH.forEach((element) =>
      console.log(
        "(" +
          element.description +
          ") - " +
          parseFloat(getBalanceInCash(current_price_ETH, element)).toFixed(4) +
          "USDT" +
          " | " +
          element.current_trade.coin.open_price +
          " : " +
          element.current_trade.order_buy +
          " - " +
          element.current_trade.order_sell
      )
    );
    console.log(
      "It's " +
        clock.getHours() +
        ":" +
        clock.getMinutes() +
        ":" +
        clock.getSeconds()
    );
    console.log("BTC: " + parseFloat(current_price_BTC).toFixed(4) + "USDT");
    console.log("ETH: " + parseFloat(current_price_ETH).toFixed(4) + "USDT");
    console.log("\n");
  }
}

var input = setInterval(() => {
  loop();
}, 1000);
