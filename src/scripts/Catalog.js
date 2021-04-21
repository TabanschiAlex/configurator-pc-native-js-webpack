class Catalog {
    constructor() {
        this.selectedCategory = 'cpu';
        this.requestURL = 'http://localhost:3000/cpu';
        this.json = [];
        this.products = document.getElementById('products') || false;

        if (this.products) {
            this.init();
            this.switchCategory();
        }
    }

    async init() {
        await this.fetchData(this.requestURL).then(_ => _);
        await this.showProducts();
        this.add();
    }

    async fetchData(request, type = 'GET') {
        const response = await fetch(request, {method: type});
        this.json = await response.json();
    }

    getRequest() {
        return 'http://localhost:3000/' + this.selectedCategory;
    }

    showProducts() {
        if (!this.json.length) {
            return this.products.innerHTML = `
                <div class="alert alert-secondary" role="alert">
                    There are no products in the ${this.selectedCategory} category.
                </div>
            `;
        }
        this.products.innerHTML = '';

        for (const product of this.json) {
            this.products.innerHTML += `
            <div class="card card-body">
                <div class="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                    <div class="mr-2 mb-3 mb-lg-0"> <img src="https://i.imgur.com/5Aqgz7o.jpg" width="150" height="150" alt=""> </div>
                    <div class="media-body">
                        <h6 class="media-title font-weight-semibold"> <a href="#" data-abc="true">${product.manufacturer} ${product.model}</a> </h6>
                        <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                            <li class="list-inline-item">Category: <a href="#" class="text-muted" data-abc="true">${this.selectedCategory}</a></li>
                        </ul>
                        <p class="mb-3">Manufacturer: ${product.manufacturer} | Model: ${product.model} | Frequency: ${product.frequency} | Cores: ${product.cores} | Threads: ${product.threads}</p>
                    </div>
                    <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
                        <h3 class="mb-0 font-weight-semibold">$${product.price}</h3>
                        <div> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                        <button type="button" class="btn btn-warning mt-4 text-white select" id="${product.id}"><i class="icon-cart-add mr-2"></i>Select</button>
                    </div>
                </div>
            </div>                     
        `;
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
                this.requestURL = this.getRequest();

                await this.fetchData(this.requestURL).then(_ => _);
                await this.showProducts();
                await this.add();
            });
        });
    }

    add() {
        document.querySelectorAll('.select').forEach(element => {
            element.addEventListener('click', (e) => {
                if (!localStorage.getItem('q' + this.selectedCategory)) {
                    localStorage.setItem('q' + this.selectedCategory, '1');
                }

                localStorage.setItem(
                    this.selectedCategory + localStorage.getItem('q' + this.selectedCategory),
                    e.target.id
                );

                const number = Number(localStorage.getItem('q' + this.selectedCategory)) + 1;
                localStorage.setItem('q' + this.selectedCategory, number.toString());
            });
        });
    }
}

module.exports = new Catalog();
