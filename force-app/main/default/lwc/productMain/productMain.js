import { LightningElement, wire, track } from 'lwc';
import getProducts from '@salesforce/apex/ProductsController.getProducts';

export default class ProductMain extends LightningElement {
  selectedCategory = '';
  selectedPrice = 'ASC';
  error = false;
  @track cartItems = [];
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

  handleAddToCart(event) {
    if (this.products) {
      const productToAddToCart = this.products.find(
        (product) => product.Id === event.detail
      );

      if (!productToAddToCart) return;

      const productIndex = this.cartItems.findIndex(
        (product) => product.Id === productToAddToCart.Id
      );

      if (productIndex === -1) {
        this.cartItems.push({ ...productToAddToCart, quantity: 1 });
      } else {
        this.cartItems[productIndex].quantity =
          this.cartItems[productIndex].quantity + 1;
      }
    }
  }

  handleRemoveFromCart(event) {
    this.cartItems = this.cartItems.filter(
      (product) => product.Id !== event.detail
    );
  }

  handleClearCart() {
    this.cartItems = [];
  }

  get productInCart() {
    if (this.cartItems.length) {
      return true;
    }
    return false;
  }
}
