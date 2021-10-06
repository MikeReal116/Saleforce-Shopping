import { LightningElement, wire } from 'lwc';
import getCategories from '@salesforce/apex/ProductCategoryController.getCategories';

export default class ProductFilter extends LightningElement {
  categories;
  selectedCategory = '';
  priceOption = 'ASC';
  error = false;

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

  handleCategoryChange() {}

  handlePriceChange() {}

  get priceOptions() {
    return [
      { label: 'LOW TO HIGH', value: 'ASC' },
      { label: 'HIGH TO LOW', value: 'DESC' }
    ];
  }
}
