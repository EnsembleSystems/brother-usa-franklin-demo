export default function decorate(block) {
    const legalDisclaimerHeading = block.querySelector('h6');
    const legalDisclaimerText = block.querySelector('ul');
    const icon = block.querySelector('picture');

    const span = document.createElement('span');
    span.textContent = legalDisclaimerHeading.textContent;

    const linkWrapper = document.createElement('a');
    linkWrapper.appendChild(icon);
    // Optionally set href for linkWrapper
    // linkWrapper.href = '#';
    linkWrapper.appendChild(span);

    legalDisclaimerHeading.parentNode.insertBefore(linkWrapper, legalDisclaimerHeading);
    legalDisclaimerHeading.parentNode.removeChild(legalDisclaimerHeading);

    linkWrapper.parentNode.classList.add('collapsible-legal-disclaimer');

    const divWrapperForText = document.createElement('div');
    legalDisclaimerText.parentNode.insertBefore(divWrapperForText, legalDisclaimerText);
    divWrapperForText.appendChild(legalDisclaimerText);

    linkWrapper.addEventListener('click', function() {
        const currentDisplay = divWrapperForText.style.display;
        divWrapperForText.style.display = currentDisplay === 'none' ? 'block' : 'none';
    });

    divWrapperForText.style.display = 'none';
}
