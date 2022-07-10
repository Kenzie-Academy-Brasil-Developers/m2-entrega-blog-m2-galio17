export default class Dom {
    static body = document.body;

    static createModal(classModify, content, title, details) {
        const modalError = document.querySelector('.modal--error');
        if(modalError) this.body.removeChild(modalError)
        
        const modal = document.createElement('div');
        const modalOut = document.createElement('div');
        const modalInner = document.createElement('section');
        const closeButton = document.createElement('button');

        modal.classList.add('modal', `modal--${classModify}`);
        modalOut.classList.add('modal__out');
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

        modalOut.append(modalInner, closeButton);
        modal.append(modalOut);
        this.body.append(modal)
    }

    static createError({ message }){
        const modalError = document.querySelector('.modal--error');
        if(modalError) this.body.removeChild(modalError);

        const error = document.createElement('h4');
        error.innerText = message;
        this.createModal('error', error);
    }
}