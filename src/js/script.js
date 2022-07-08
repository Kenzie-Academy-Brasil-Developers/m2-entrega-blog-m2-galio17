import UserRequests from './controllers/user.controller.js';
import PostRequests from './controllers/post.controller.js';

/* 
const user = {
    username: 'galio17',
    email: 'giu17@kenzie.com.br',
    avatarUrl: 'https://github.com/phmc99.png',
    password: 'Giu123'
};
UserRequests.register(user)
 */

const userLogin = {
    email: 'giu17@kenzie.com.br',
    password: 'Giu123'
};
await UserRequests.login(userLogin);

/* 
const userId = JSON.parse(localStorage.getItem('@kenzie-blog:userId'));
const userInfo = await UserRequests.getUserById(userId);
console.log(userInfo)
 */
/* 
let posts = await PostRequests.getPosts();
posts = await PostRequests.getPosts(posts.nextPage)
console.log(posts);
 */
/* 
const post = await PostRequests.getPostById(789);
console.log(post)
 */
/* 
const newPost = await PostRequests.createPost({
    content: 'giu test'
})
 */
/* 
await PostRequests.editPost(1516, {
    content: 'giu test editado'
});
 */

// await PostRequests.deletePost(1515);