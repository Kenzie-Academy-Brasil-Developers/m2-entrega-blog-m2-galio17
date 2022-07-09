export default class Dom {
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

    static createError({ message }){
        const error = document.createElement('h4');
        error.innerText = message;
        this.createModal('error', error);
    }
}