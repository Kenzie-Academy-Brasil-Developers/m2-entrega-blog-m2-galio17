import ComponentsDom from '../controllers/dashboard.controller.js';
import PostRequests from '../controllers/post.controller.js';

const userId = JSON.parse(localStorage.getItem('@kenzie-blog:userId'));
let postInitial = '';

ComponentsDom.createHeaderUser(userId);
ComponentsDom.listPosts(userId);

function verifyClass(className) {
    return event.target.classList.contains(className);
}

addEventListener('click', async (event) => {
    if(verifyClass('button')) {
        const post = event.composedPath()[3];
        console.log(post)
        const postText = post.querySelector('textarea');

        if(verifyClass('button--close')) document.body.removeChild(event.composedPath()[2]);
        else if(verifyClass('button--add')) {
            const postText = document.getElementById('newPost');
            const newPost = await PostRequests.createPost(postText.value);

            if(newPost.message) ComponentsDom.createError(newPost.message);
            else ComponentsDom.listPosts(userId);

            postText.value = '';
        }
        else if(verifyClass('button--edit')) {
            const deleteButton = post.querySelector('.button--delete');

            postInitial = postText.value

            postText.disabled = !postText.disabled;

            if(verifyClass('button--save')) {
                const editPost = await PostRequests.editPost(post.id, postText.value);
                if(editPost.message) {
                    ComponentsDom.createError(editPost.message);
                    postText.value = postInitial;
                    postText.disabled = !postText.disabled;
                }
                else ComponentsDom.listPosts(userId);
            }

            event.target.classList.toggle('button--save')
            deleteButton.classList.toggle('button--cancel')
        }
        else if(verifyClass('button--cancel')) {
            const editButton = post.querySelector('.button--edit');

            postText.value = postInitial;
            postText.disabled = !postText.disabled;

            event.target.classList.toggle('button--cancel')
            editButton.classList.toggle('button--save')
        }
        else if(verifyClass('button--delete')) {
            await PostRequests.deletePost(post.id);
            ComponentsDom.listPosts(userId);
        }
        else if(verifyClass('button--logout')) {
            localStorage.clear();
            location.replace('../../index.html')
        }
    }
})