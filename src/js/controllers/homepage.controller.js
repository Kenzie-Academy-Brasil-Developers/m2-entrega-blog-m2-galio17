export default class ComponentsDom {
    static body = document.body;

    static createModal(classModify, content, title, details) {
        const modal = document.createElement('div');
        const modalInner = document.createElement('section');
        const closeButton = document.createElement('button');

        modal.classList.add('modal', `modal--${classModify}`);
        modalInner.classList.add('modal__inner');
        closeButton.classList.add('button', 'button--close')

        modalInner.append(content);

        if(title) {
            const modalTitle = document.createElement('h2');
            modalTitle.innerText = title;
            modalInner.insertAdjacentElement('afterbegin', modalTitle)
        }
        if(details) {
            const modalDetails = document.createElement('span');
            modalDetails.innerHTML = details;
            modalInner.insertAdjacentElement('beforeend', modalDetails)
        }

        modal.append(modalInner, closeButton);
        this.body.append(modal)
    }

    static createForm(id, title, details, ...inputNames) {
        const form = document.createElement('form');
        const submitButton = document.createElement('button');

        form.id = id;
        submitButton.type = 'submit';
        submitButton.classList.add('button');

        inputNames.forEach((name) => {
            const input = document.createElement('input');
            input.type = (name === 'password') ? name : 'text';
            input.name = name;

            form.append(input);
        })

        form.append(submitButton);

        this.createModal(id, form, title, details);
    }

    static createError({ message }){
        const error = document.createElement('h4');
        error.innerText = message;
        this.createModal('error', error);
    }
}