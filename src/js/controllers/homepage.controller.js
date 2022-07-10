import Dom from "../models/dom.model.js";

export default class ComponentsDom extends Dom {
    static createForm(id, title, details, ...inputNames) {
        const form = document.createElement('form');
        const submitButton = document.createElement('button');

        form.id = id;
        submitButton.type = 'submit';
        submitButton.innerText = 'Enviar';
        submitButton.classList.add('button');

        inputNames.forEach((name) => {
            const input = document.createElement('input');
            input.type = (name === 'password') ? name : 'text';
            input.name = name;
            input.placeholder = name;

            form.append(input);
        })

        form.append(submitButton);

        this.createModal(id, form, title, details);
    }
}