require("dotenv-safe").config();
const { MercadoBitcoin } = require("./api");

const infoApi = new MercadoBitcoin({ currency: "ETH" });

setInterval(async () => {
  const response = await infoApi.ticker();
  console.log(response);
}, process.env.CRAWLER_INTERVAL);
