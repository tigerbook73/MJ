const p1 = {
  cardNumber: 1,
  cardType: 'p',
  dora: 0,
  heldInHand: 0,
  withdrawl: 0,
};

class Card {
  cardSetup(number, type, dora, held, withdrawl) {
    (this.cardNumber = number),
      (this.cardType = type),
      (this.dora = dora),
      (this.heldInHand = held),
      (this.withdrawl = withdrawl);
  }
}
