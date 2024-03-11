export default function decorate(block) {
    const legalDisclaimerHeading = block.querySelector('h6');
    const legalDisclaimerText = block.querySelector('ul');
    const icon = block.querySelector('picture');

    // Create a span that will contain the text from the h6
    const span = document.createElement('span');
    span.textContent = legalDisclaimerHeading.textContent;

    // Create an a tag to wrap the span
    const linkWrapper = document.createElement('a');
    linkWrapper.appendChild(icon);
    // Optionally set href for linkWrapper
    // linkWrapper.href = '#';
    linkWrapper.appendChild(span);

    // Replace the h6 with the a tag in the DOM
    legalDisclaimerHeading.parentNode.insertBefore(linkWrapper, legalDisclaimerHeading);
    legalDisclaimerHeading.parentNode.removeChild(legalDisclaimerHeading);

    // Add the CSS class to the a tag's current parent
    linkWrapper.parentNode.classList.add('collapsible-legal-disclaimer');

    // Wrap legalDisclaimerText in a div
    const divWrapperForText = document.createElement('div');
    legalDisclaimerText.parentNode.insertBefore(divWrapperForText, legalDisclaimerText);
    divWrapperForText.appendChild(legalDisclaimerText);

    linkWrapper.addEventListener('click', function() {
        // This will toggle the display of the legalDisclaimerText
        // If it's already displayed, it will be hidden and vice versa
        const currentDisplay = divWrapperForText.style.display;
        divWrapperForText.style.display = currentDisplay === 'none' ? 'block' : 'none';
    });

    // Set the initial display state of the legalDisclaimerText to none
    // divWrapperForText.style.display = 'none';
}
