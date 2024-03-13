export default async function decorate(block) {
    // Select the h6 element by its ID
    const h6Element = block.querySelector('#business-resources');

    // Check if the h6 element exists to avoid errors
    const parentElement = h6Element.parentElement;

    // Add the 'business-resource-title-container' class to the parent element
    parentElement.classList.add('business-resource-title-element');
}
