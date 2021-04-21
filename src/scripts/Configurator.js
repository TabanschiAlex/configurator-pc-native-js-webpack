const Request = require('./Request');

class Configurator extends Request {
    constructor() {
        super();
        if (document.getElementById('accordionExample')) {
            this.init();
        }
    }

    async init() {

    }

    loadSelectedComponents() {

    }

    remove() {

    }

}

module.exports = new Configurator();
