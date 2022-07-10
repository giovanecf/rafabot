class Wallet {
  constructor(id, crypto, money, current_trade, description) {
    this.id = id;
    this.crypto = crypto;
    this.money = money;
    this.current_trade = current_trade;
    this.description = description;
    this.hasBought = false;
    this.hasSold = false;
  }

  depositCrypto(value) {
    this.crypto += value;
    return this.crypto;
  }

  drawOutCrypto(value) {
    this.crypto -= value;
    return this.crypto;
  }

  depositMoney(value) {
    this.money += value;
    return this.money;
  }

  drawOutMoney(value) {
    this.money -= value;
    return this.money;
  }

  get hasDailyTradeDone() {
    return this.hasBought && this.hasSold ? true : false;
  }

  get balance() {
    let crypto = this.crypto;
    let money = this.money;
    return { money, crypto };
  }
}

module.exports = {
  Wallet,
};
