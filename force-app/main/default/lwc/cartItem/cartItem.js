import { LightningElement, api } from 'lwc';

export default class CartItem extends LightningElement {
  @api cartItem;

  //dispatches Id of the product to remove from the cart
  handleRemoveFromCart() {
    const removeFromCartEvent = new CustomEvent('removefromcart', {
      detail: this.cartItem.Id
    });
    this.dispatchEvent(removeFromCartEvent);
  }
}
