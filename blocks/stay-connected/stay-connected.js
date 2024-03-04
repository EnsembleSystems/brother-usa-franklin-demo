export default function decorate(block) {
    console.log('block:', block)
    const emailInputField = block.querySelector('p');

    console.log('emailInputField:', emailInputField);

    emailInputField.innerHTML = '';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Enter your email here';
    emailInput.classList.add('email-input'); // Add class for styling

    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Subscribe';
    submitButton.classList.add('submit-button'); // Add class for styling

    // Create the form element and append the email input and submit button to it
    const form = document.createElement('form');
    form.classList.add('email-form'); // Add class for styling
    form.appendChild(emailInput);
    form.appendChild(submitButton);

    // Append the heading and form to the form container
    block.appendChild(form);

}