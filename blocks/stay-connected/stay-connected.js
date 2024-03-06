export default function decorate(block) {
    const emailInputField = block.querySelector('p');

    emailInputField.innerHTML = '';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Enter your email here';
    emailInput.classList.add('email-input');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Subscribe';
    submitButton.classList.add('submit-button');

    const form = document.createElement('form');
    form.classList.add('email-form');
    form.appendChild(emailInput);
    form.appendChild(submitButton);

    const styleDiv = document.createElement('div');
    styleDiv.classList.add('style-div');

    block.appendChild(form);
    block.prepend(styleDiv);

}