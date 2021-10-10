import { LightningElement, api } from 'lwc';
import CreateOrder from '@salesforce/apex/OrderContoller.createOrder';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Cart extends LightningElement {
  @api cartItems;
  address = {
    Address__c: '',
    Postal_Code__c: '',
    Country__c: ''
  };

  handleRemoveFromCart(event) {
    const removeFromCartEvent = new CustomEvent('removefromcart', {
      detail: event.detail
    });
    this.dispatchEvent(removeFromCartEvent);
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
      const res = await CreateOrder({
        orderDetails: orderDetail,
        orderLineDetails: JSON.stringify(orderLineItems)
      });
      this.dispatchEvent(new CustomEvent('clearcart'));
      this.showToast('Success', `Order was successfully made`, 'success');
      this.address = {
        Address__c: '',
        Postal_Code__c: '',
        Country__c: ''
      };
      console.log(res);
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
    return this.cartItems.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
  }

  get totalPrice() {
    return this.cartItems.reduce((acc, cur) => {
      return acc + cur.quantity * cur.Price__c;
    }, 0);
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
}
