import Requests from "../models/requests.model.js";

export default class UserRequests extends Requests {
    static baseUrl = 'https://blog-m2.herokuapp.com/users';

    static async register(registerData) {
        return await fetch(`${this.baseUrl}/register`, this.options('POST', registerData))
        .then((response) => response.json())
        .catch((error) => console.log(error));
    }

    static async login(loginData) {
        return await fetch(`${this.baseUrl}/login`, this.options('POST', loginData))
        .then((response) => response.json())
        .then((response) => {
            localStorage.setItem('@kenzie-blog:token', JSON.stringify(response.token));
            localStorage.setItem('@kenzie-blog:userId', JSON.stringify(response.userId));
            return response;
        })
        .catch((error) => console.log(error));
    }

    static async getUserById() {
        return await fetch(`${this.baseUrl}`, this.options('GET'))
        .catch((error) => console.log(error))
    }
}