import { LightningElement, api } from 'lwc';

export default class ProductTile extends LightningElement {
  @api product;

  handleAddToCartClick() {
    const addToCartEvent = new CustomEvent('addtocart', {
      detail: this.product.Id
    });
    this.dispatchEvent(addToCartEvent);
  }
}
