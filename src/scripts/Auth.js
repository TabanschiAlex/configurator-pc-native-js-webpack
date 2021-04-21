const Request = require('./Request');

class Auth extends Request {
    constructor() {
        super();
        this.validateToken();
        console.log(localStorage.getItem('isLogIn'));

        this.navAccount = document.getElementById('nav-account');

        if (localStorage.getItem('isLogIn') === 'true' && this.navAccount) {
            this.navAccount.innerHTML = `
                <li>
                    <a class="nav-link" href="">name</a>
                </li>
                <li>
                    <a class="nav-link" id="logout" href="logout.html">Exit</a>
                </li>`
        } else if (this.navAccount) {
            this.navAccount.innerHTML = `
                <li>
                    <a class="nav-link" href="login.html">Log in</a>
                </li>
                <li>
                    <a class="nav-link" href="register.html">Register</a>
                </li>`
        }

        this.registration = document.getElementById('register') || false;
        this.loginElem = document.getElementById('login') || false;
        this.logoutElem = document.getElementById('logout') || false;

        if (this.registration) {
            this.registration.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.register();
                location.href = "/";
            });
        }

        if (this.loginElem) {
            this.loginElem.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.login();
                location.href = "/";
            })
        }

        if (this.logoutElem) {
            this.logoutElem.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.logout();
                location.href = "/";
            })
        }
    }

    async register() {
        const name = document.getElementById('inputName').value;
        const password = document.getElementById('inputPassword').value;
        const repeatedPassword = document.getElementById('inputPasswordRepeat').value;

        if (password === repeatedPassword) {
            const data = { name, password };

            await this.postData('http://localhost:3000/register', data);
            console.log("New user successful registered");
            return true;
        }

        return false;
    }

    async login() {
        const name = document.getElementById('inputName').value;
        const password = document.getElementById('inputPassword').value;

        if (name && password) {
            const data = { name, password };
            await this.postData('http://localhost:3000/login', data);
            console.log(this.validateToken());

            return true;
        }

        return false;
    }

    async logout() {
        const data = { token: localStorage.getItem('token') };
        await this.postData('http://localhost:3000/logout', data);

        return localStorage.setItem('isLogIn', 'false');
    }
}

module.exports = new Auth();
