class Auth {
    constructor() {
        this.registration = document.getElementById('register') || false;
        this.login = document.getElementById('login') || false;

        this.registration.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(this.register());
        })
    }

    async fetchData(request, data, type = 'POST') {
        const keys = Object.keys(data);
        const bodySend = '';


        const response = await fetch(request, {
            method: type,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `name=${data.name}&password=${data.password}`
        });

        return await response.json();
    }

    register() {
        const name = document.getElementById('inputName').value;
        const password = document.getElementById('inputPassword').value;
        const repeatedPassword = document.getElementById('inputPasswordRepeat').value;

        if (password === repeatedPassword) {
            const data = {
                name,
                password
            };

            return this.fetchData('http://localhost:3000/register', data);
        }

        return false;
    }
}

module.exports = new Auth();
