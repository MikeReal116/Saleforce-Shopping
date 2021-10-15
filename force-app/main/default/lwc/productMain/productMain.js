import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import getProducts from '@salesforce/apex/ProductsController.getProducts';
import CART_ITEM_CHANNEL from '@salesforce/messageChannel/cartItem__c';

export default class ProductMain extends LightningElement {
  selectedCategory = '';
  selectedPrice = 'ASC';
  error = false;
  products;

  //fetch products based on filter values
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

  @wire(MessageContext)
  messageContext;

  //respond to dispatched selectedcategory event
  handleSelectedCategory(event) {
    this.selectedCategory = event.detail;
  }

  //respond to dispatched selectedprice event
  handleSelectedPrice(event) {
    this.selectedPrice = event.detail;
  }

  //receives Id of the selected to add to cart
  handleAddToCart(event) {
    if (this.products) {
      const productToAddToCart = this.products.find(
        (product) => product.Id === event.detail
      );

      if (!productToAddToCart) return;

      //prepares the expected data to publish it to the message channel
      const payload = {
        Name: productToAddToCart.Name,
        Price__c: productToAddToCart.Price__c,
        Id: productToAddToCart.Id
      };

      publish(this.messageContext, CART_ITEM_CHANNEL, payload);
    }
  }
}
