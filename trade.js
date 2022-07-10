class Trade {
  constructor(coin, order_percent) {
    this.coin = coin;
    this.order_percent = order_percent;
    this.order_buy =
      this.coin.open_price - this.coin.open_price * this.order_percent;
    this.order_sell =
      this.coin.open_price + this.coin.open_price * this.order_percent;
  }

  //predenting that these functions does not exist
  calcOrderBuy() {
    this.order_buy =
      this.coin.open_price - this.coin.open_price * this.order_percent;
    return this.order_buy;
  }

  calcOrderSell() {
    this.order_sell =
      this.coin.open_price + this.coin.open_price * this.order_percent;
    return this.order_sell;
  }
}

module.exports = { Trade };
