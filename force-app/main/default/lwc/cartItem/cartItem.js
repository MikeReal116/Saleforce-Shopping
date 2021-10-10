import { LightningElement, api } from 'lwc';

export default class CartItem extends LightningElement {
  @api cartItem;

  handleRemoveFromCart() {
    const removeFromCartEvent = new CustomEvent('removefromcart', {
      detail: this.cartItem.Id
    });
    this.dispatchEvent(removeFromCartEvent);
  }
}
