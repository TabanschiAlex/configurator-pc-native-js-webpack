class Request {
  async request(url, method, body = {}) {
    try {
      const token = localStorage.getItem('token');
      const options = {
        method: method,
        headers: {
          'Content-type': 'application/json'
        }
      }

      if (token) {
        options.headers['Authorization'] = token;
      }

      if (Object.keys(body).length) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options)
      if (response.status === 401) {
        localStorage.clear();
      }

      return response;
    } catch (e) {
      console.log('Request error: ' + e.message);
    }
  }

  async getComponents(request) {
    const response = await this.request(request, 'GET');
    this.components = await response.json();
  }

  async authRequest(request, data) {
    const response = await this.request(request, 'POST', data);
    const json = await response.json();

    if (response.status === 401) {
      return false;
    }

    localStorage.setItem('token', json.token);
    localStorage.setItem('username', json.username);
    localStorage.setItem('isLogIn', 'true');

    return true;
  }
}

module.exports = Request;
