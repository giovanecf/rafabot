const axios = require("axios");

const ENDPOINT_API = "https://api.binance.com/";

class MercadoBitcoin {
  constructor(config) {
    this.config = {
      CURRENCY: config.currency,
    };
  }

  ticker() {
    return this.call("ticker");
  }

  async call(method) {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    try {
      const response = await axios.get(
        ENDPOINT_API + "api/v3/" + method + "/24hr",
        {
          params: {
            symbol: this.config.CURRENCY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = {
  MercadoBitcoin,
};
