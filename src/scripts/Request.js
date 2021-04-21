class Request {
    async getData(request) {
        const response = await fetch(request, {method: 'GET'});
        this.json = await response.json();
    }

    async postData(request, data) {
        try {
            let sendData = '';

            for (const key of Object.keys(data)) {
                sendData += `${key}=${data[key]} `;
            }

            sendData = sendData.trim().replaceAll(' ', '&');

            const response = await fetch(request, {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: sendData
            });

            const json = await response.json();

            if (typeof json === 'string' && json.length > 5) {
                localStorage.setItem('token', json);
            }

            return json;
        } catch (e) {
            console.log(e.message);
        }
    }

    async validateToken() {
        const response = await fetch('http://localhost:3000/validateToken', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `token=${localStorage.getItem('token')}`
        });

        const json = await response.json();
        console.log(localStorage.getItem('token'))
        localStorage.setItem('isLogIn', json);

        return json;
    }
}

module.exports = Request;
