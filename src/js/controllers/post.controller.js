import Requests from "../models/requests.model.js";

export default class PostRequests extends Requests {
    static baseUrl = 'https://blog-m2.herokuapp.com/posts';

    static async getPostPage(page = '') {
        return await fetch(`${this.baseUrl}?${page}`, this.options('GET'))
        .then((response) => response.json())
        .catch((error) => console.log(error));
    }

    static async getPostById(postId) {
        return await fetch(`${this.baseUrl}/${postId}`, this.options('GET'))
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }

    static async createPost(postData) {
        return await fetch(this.baseUrl, this.options('POST', { content: postData}))
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }

    static async editPost(postId, editData) {
        return await fetch(`${this.baseUrl}/${postId}`, this.options('PATCH', { content: editData}))
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }

    static async deletePost(postId) {
        return await fetch(`${this.baseUrl}/${postId}`, this.options('DELETE'))
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }
}