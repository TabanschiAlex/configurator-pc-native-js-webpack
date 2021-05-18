const Request = require('./Request');

class Catalog extends Request {
  constructor() {
    super();
    this.selectedCategory = 'cpu';
    this.requestURL = 'http://localhost/components/cpu';
    this.components = [];
    this.componentsField = document.getElementById('products') || false;

    if (this.componentsField) {
      this.init();
      this.switchCategory();
    }
  }

  async init() {
    await this.getComponents(this.requestURL);
    await this.showProducts();
  }

  createReqPath() {
    return 'http://localhost/components/' + this.selectedCategory;
  }

  showProducts() {
    this.componentsField.innerHTML = '';

    if (!this.components.length) {
      return this.componentsField.innerHTML =
        `<div class="alert alert-secondary" role="alert">
          There are no components in the ${this.selectedCategory} category.
         </div>`;
    }

    for (const product of this.components) {
      const description = [];

      for (const key of Object.keys(product)) {
        if (key === 'id' || key === 'photo' || key === 'price') continue;
        description.push(`${key}: ${product[key]}`);
      }

      this.componentsField.innerHTML +=
        ` <div class="card card-body">
            <div class="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                <div class="mr-2 mb-3 mb-lg-0"> <img src="https://i.imgur.com/5Aqgz7o.jpg" width="150" height="150" alt=""> </div>
                <div class="media-body">
                    <h6 class="media-title font-weight-semibold"> <a href="#" data-abc="true">${product.manufacturer} ${product.model}</a> </h6>
                    <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                        <li class="list-inline-item">Category: <a href="#" class="text-muted" data-abc="true">${this.selectedCategory}</a></li>
                    </ul>
                    <p class="mb-3">${description.join(' | ')}</p>
                </div>
                <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
                    <h3 class="mb-0 font-weight-semibold">$${product.price}</h3>
                    <div> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                    <button type="button" class="btn btn-warning mt-4 text-white select" id="${product.id}"><i class="icon-cart-add mr-2"></i>Select</button>
                </div>
            </div>
          </div>`;
    }

    return true;
  }

  switchCategory() {
    document.querySelectorAll("input[name='options']").forEach(category => {
      category.addEventListener('change', async () => {
        document.querySelector('.btn.active').classList.remove('active');
        document.querySelector("input[name='options']:checked").checked = false;
        category.checked = true;
        category.parentElement.classList.add('active');
        this.selectedCategory = category.value;
        this.requestURL = this.createReqPath();

        await this.getComponents(this.requestURL);
        await this.showProducts();
      });
    });
  }

  /*addToConfig() {
    document.querySelectorAll('.select').forEach(element => {
      element.addEventListener('click', (e) => {
        const category = e.target.parentElement.parentElement.children[1].children[1].children[0].children[0].innerText;
        this.request('http://localhost:3000/config/add', 'POST', {table: category, id: e.target.id});
      });
    });
  }*/
}

module.exports = new Catalog();
