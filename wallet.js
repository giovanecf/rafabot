class Wallet {
  constructor(id, crypto, money) {
    this.id = id;
    this.crypto = crypto;
    this.money = money;
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

  get balance() {
    let crypto = this.crypto;
    let money = this.money;
    return { money, crypto };
  }

  get identification() {
    return this.id;
  }
}

module.exports = {
  Wallet,
};
