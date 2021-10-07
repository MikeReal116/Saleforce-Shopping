import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductsController.getProducts';

export default class ProductMain extends LightningElement {
  selectedCategory = '';
  selectedPrice = 'ASC';
  error = false;
  products;

  //$ to make variables reactive and call apex class to get new set of data on change
  @wire(getProducts, {
    categoryId: '$selectedCategory',
    priceFilter: '$selectedPrice'
  })
  wiredResult({ error, data }) {
    if (data) {
      this.products = data;
      this.error = false;
    } else if (error) {
      this.error = true;
      this.products = null;
    }
  }

  handleSelectedCategory(event) {
    this.selectedCategory = event.detail;
  }

  handleSelectedPrice(event) {
    this.selectedPrice = event.detail;
  }
}
