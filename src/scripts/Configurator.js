class Configurator {
    constructor() {
        this.init();
    }

    init() {
        this.loadSelectedComponents()
    }

    loadSelectedComponents() {
        for(const key in localStorage) {
            if (!localStorage.hasOwnProperty(key) || key.includes('q')) {
                continue;
            }

            console.log(`${key}: ${localStorage.getItem(key)}`);
        }
    }

    remove() {

    }

}

module.exports = new Configurator;
