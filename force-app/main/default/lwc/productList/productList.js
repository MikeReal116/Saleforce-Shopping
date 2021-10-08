import { LightningElement, api } from 'lwc';

export default class ProductList extends LightningElement {
  @api products;

  handleAddToCart(event) {
    const addToCartEvent = new CustomEvent('addtocart', {
      detail: event.detail
    });
    this.dispatchEvent(addToCartEvent);
  }
}
