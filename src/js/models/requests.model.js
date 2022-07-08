export default class Requests {
    static token = JSON.parse(localStorage.getItem('@kenzie-blog:token'));

    static options(method, body) {
        return {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        };
    }
}