import { LightningElement, track, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CreateOrder from '@salesforce/apex/OrderContoller.createOrder';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CART_ITEM_CHANNEL from '@salesforce/messageChannel/cartItem__c';

export default class Cart extends LightningElement {
  @track cartItems = [];
  address = {
    Address__c: '',
    Postal_Code__c: '',
    Country__c: ''
  };

  subcription = null;
  receivedMessage;

  @wire(MessageContext)
  messageContext;

  //subscribe to the message channel
  subscribeToMessageChannel() {
    this.subcription = subscribe(
      this.messageContext,
      CART_ITEM_CHANNEL,
      (message) => {
        this.handleMessage(message);
      }
    );
  }

  //handles data received from the message channel to add to cart
  handleMessage(message) {
    const productIndex = this.cartItems.findIndex(
      (product) => product.Id === message.Id
    );

    if (productIndex === -1) {
      this.cartItems.push({ ...message, quantity: 1 });
    } else {
      this.cartItems[productIndex].quantity =
        this.cartItems[productIndex].quantity + 1;
    }
    console.log(message);
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  //Receives the Id of the product to remove filters it from cartItems
  handleRemoveFromCart(event) {
    this.cartItems = this.cartItems.filter(
      (product) => product.Id !== event.detail
    );
  }

  handleAddressChange(event) {
    const name = event.target.name;
    this.address = { ...this.address, [name]: event.target.value };
  }

  async handleCreateOrder() {
    const orderDetail = JSON.stringify({
      ...this.address,
      Total_Price__c: this.totalPrice
    });
    const orderLineItems = [];
    this.cartItems.forEach((item) => {
      orderLineItems.push({
        Price__c: item.Price__c,
        Product__c: item.Id,
        Quantity__c: item.quantity,
        Name: item.Name
      });
    });
    try {
      await CreateOrder({
        orderDetails: orderDetail,
        orderLineDetails: JSON.stringify(orderLineItems)
      });

      this.handleClearCart();

      this.showToast('Success', `Order was successfully made`, 'success');
      this.address = {
        Address__c: '',
        Postal_Code__c: '',
        Country__c: ''
      };
    } catch (error) {
      console.log(error);
      this.showToast('Error', `Order wasn't made, try again later`, 'error');
    }
  }

  showToast(title, message, variant) {
    const toastEvent = new ShowToastEvent({
      title,
      message,
      variant
    });
    this.dispatchEvent(toastEvent);
  }

  get totalProductsQuantity() {
    if (this.cartItems) {
      return this.cartItems.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
    }
    return 0;
  }

  get totalPrice() {
    if (this.cartItems) {
      return this.cartItems.reduce((acc, cur) => {
        return acc + cur.quantity * cur.Price__c;
      }, 0);
    }
    return 0;
  }

  get showButton() {
    if (
      this.address.Address__c &&
      this.address.Postal_Code__c &&
      this.address.Country__c
    ) {
      return true;
    }
    return false;
  }

  get productInCart() {
    if (this.cartItems.length) {
      return true;
    }
    return false;
  }

  handleClearCart() {
    this.cartItems = [];
  }
}
