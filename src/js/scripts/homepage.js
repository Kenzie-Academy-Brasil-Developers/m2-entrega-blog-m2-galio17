import ComponentsDom from '../controllers/homepage.controller.js';
import UserRequests from '../controllers/user.controller.js';

function verifyClass(className) {
    return event.target.classList.contains(className);
}

function createSignInForm() {
    const modal = document.querySelector('.modal');

    ComponentsDom.createForm('signIn', 'Cadastre-se', `
    Já possui login? <button class="button button--login">Click aqui</button>
    `, 'username', 'email', 'avatarUrl', 'password');
    
    if(modal) document.body.removeChild(modal);
}

function createLoginForm() {
    const modal = document.querySelector('.modal');

    ComponentsDom.createForm('login', 'Login', `
        Ainda não se cadastrou? <button class="button button--signIn">Click aqui</button>
    `, 'email', 'password');

    if(modal) document.body.removeChild(modal);
}

async function verifyFormInfo() {
    if(verifyClass('button')) {
        event.preventDefault()
        const form = document.querySelector('form');
        const newUser = {};
    
        for(let i = 0; i < form.length - 1; i++) {
            const input = form[i];

            newUser[input.name] = input.value;
        }
        if(event.composedPath()[1].id === 'signIn') {
            const register = await UserRequests.register(newUser);

            if(register.message) ComponentsDom.createError(register);
            else createLoginForm();
        }
        else if(event.composedPath()[1].id === 'login') {
            const login = await UserRequests.login(newUser);

            if(login.message) ComponentsDom.createError(login);
            else location.replace('./src/views/dashboard.html');
        }
    }
}

addEventListener('click', (event) => {
    if(verifyClass('button--signIn')) {
        createSignInForm()
    } 
    else if(verifyClass('button--login')) {
        createLoginForm();
    } 
    else if(verifyClass('button--close')) {
        document.body.removeChild(event.composedPath()[1]);
    }
    
    verifyFormInfo();
})
