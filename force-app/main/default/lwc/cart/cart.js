import { LightningElement, api } from 'lwc';

export default class Cart extends LightningElement {
  @api cartItems;

  get totalProductsQuantity() {
    return this.cartItems.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
  }

  get totalPrice() {
    return this.cartItems.reduce((acc, cur) => {
      return acc + cur.quantity * cur.Price__c;
    }, 0);
  }
}
