import Dom from '../models/dom.model.js';
import UserRequests from './user.controller.js';
import PostRequests from './post.controller.js';

export default class ComponentsDom extends Dom {
    static postContainer = document.querySelector('.postContainer');
    static postPage = PostRequests.getPostPage();

    static async createHeaderUser(userId) {
        const user = await UserRequests.getUserById(userId);
        const { username, avatarUrl } = user;

        const userContainer = document.querySelector('.user--header');
        userContainer.innerHTML = `
            <figure class="user__figure user__figure">
                <img src="${avatarUrl}" alt="avatar" class="user__img user__img">
            </figure>
            <h3 class="user__name">${username}</h3>
        `
    }

    static async listPosts(userId) {
        const teste = await PostRequests.getPostPage();

        this.postContainer.innerHTML = '';

        teste.data.forEach((post) => {
            this.createPost(userId, post);
        });
    }

    static createPost(userId, postData) {
        const post = document.createElement('section');
        const postText = document.createElement('textarea');
        const postInfo = document.createElement('section');

        post.id = postData.id;
        post.classList.add('postContainer__post', 'post');
        postText.classList.add('post__text');
        postInfo.classList.add('post__menu')

        const dateString = (postData.updatedAt) ? postData.updatedAt : postData.createdAt
        const date = dateString.replace(/(\d*-\d*-\d*).*/, '$1').split('-');
        const datePost = `${date[2]}/${date[1]}/${date[0]}`
        postInfo.innerHTML = `
            <span class="post__date">${datePost}</span>
        `;
        if(postData.user.id === userId) {
            postInfo.insertAdjacentHTML('afterbegin', `
                <details class="post__menu">
                    <summary></summary>
                    <button class="button button--edit"></button>
                    <button class="button button--delete"></button>
                </details>
            `);
        }
        
        postText.disabled = 'disabled';
        postText.innerText = postData.content
        
        post.append(postText, postInfo);
        post.insertAdjacentHTML('afterbegin', `
            <section class="post__user user">
                <figure class="user__figure">
                    <img src="${postData.user.avatarUrl}" alt="avatar" class="user__img">
                </figure>
                <h3 class="user__name">${postData.user.username}</h3>
            </section>
        `);

        this.postContainer.append(post);
    } 
}