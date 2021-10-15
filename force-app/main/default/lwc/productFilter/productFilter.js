import { LightningElement, wire } from 'lwc';
import getCategories from '@salesforce/apex/ProductCategoryController.getCategories';

export default class ProductFilter extends LightningElement {
  categories;
  selectedCategory = '';
  priceOption = 'ASC';
  error = false;

  //fetch category Id and Name from Apex class
  @wire(getCategories)
  wiredCategories({ error, data }) {
    if (data) {
      const options = [{ label: 'All products', value: '' }];

      data.forEach((item) => {
        options.push({ label: item.Name, value: item.Id });
      });

      this.categories = options;
      this.error = false;
    } else if (error) {
      this.error = true;
      this.categories = null;
    }
  }

  //dispatch the category Id to parent
  handleCategoryChange(event) {
    this.selectedCategory = event.detail.value;
    const selectedCategoryEvent = new CustomEvent('selectedcategory', {
      detail: this.selectedCategory
    });
    this.dispatchEvent(selectedCategoryEvent);
  }

  //dispatch the selected price filter to parent
  handlePriceChange(event) {
    this.priceOption = event.detail.value;
    const selectedPriceEvent = new CustomEvent('selectedprice', {
      detail: this.priceOption
    });
    this.dispatchEvent(selectedPriceEvent);
  }

  get priceOptions() {
    return [
      { label: 'LOW TO HIGH', value: 'ASC' },
      { label: 'HIGH TO LOW', value: 'DESC' }
    ];
  }
}
