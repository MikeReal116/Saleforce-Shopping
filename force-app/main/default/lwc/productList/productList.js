import { LightningElement, api } from 'lwc';

export default class ProductList extends LightningElement {
  @api products;

  //Receives the Id of the selected product and dispatches it to parent
  handleAddToCart(event) {
    const addToCartEvent = new CustomEvent('addtocart', {
      detail: event.detail
    });
    this.dispatchEvent(addToCartEvent);
  }
}
