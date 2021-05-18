const Request = require('./Request');

class Auth extends Request {
  constructor() {
    super();
    this.navAccount = document.getElementById('nav-account');

    if (localStorage.getItem('isLogIn') === 'true' && this.navAccount) {
      this.navAccount.innerHTML = `
                <li>
                    <a class="nav-link">Hello, ${localStorage.getItem('username')}</a>
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
        const response = await this.register()

        if (!response) {
          return alert("Fill in all the fields");
        }

        return location.href = "/";
      });
    }

    if (this.loginElem) {
      this.loginElem.addEventListener('click', async (e) => {
        e.preventDefault();
        const response = await this.login();

        if (!response) {
          return alert("Incorrect password or email");
        }

        return location.href = "/";
      })
    }

    if (this.logoutElem) {
      this.logoutElem.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.logout();

        return location.href = "/login.html";
      })
    }
  }

  async register() {
    try {
      const email = document.getElementById('inputMail').value;
      const name = document.getElementById('inputName').value;
      const password = document.getElementById('inputPassword').value;
      const repeatedPassword = document.getElementById('inputPasswordRepeat').value;

      if (!(password === repeatedPassword) || !email || !name) {
        return false;
      }

      const data = {email, password};
      await this.authRequest('http://localhost/auth/register', data);

      return true;
    } catch (e) {
      console.log(e.message);
    }

  }

  async login() {
    const email = document.getElementById('inputMail').value;
    const password = document.getElementById('inputPassword').value;
    const data = {email, password};

    return await this.authRequest('http://localhost/auth/login', data);;
  }

  logout() {
    localStorage.clear();
  }
}

module.exports = new Auth();
