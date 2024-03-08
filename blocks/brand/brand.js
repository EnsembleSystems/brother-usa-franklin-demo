export default function decorate(block) {
    // This will select all 'li' elements that are direct children of a 'ul',
    // which is itself a direct child of another 'li'.
    const subMenuHeader = block.querySelector('ul > li > ul > li');
    const anchor = document.createElement('h3');

    // Get the text content of the current <li> element
    const text = subMenuHeader.childNodes[0].nodeValue.trim();

    // Set the text content of the <a> element
    anchor.textContent = text;

    // Clear the text node
    subMenuHeader.childNodes[0].nodeValue = '';

    // Append the <a> element to the <li>
    subMenuHeader.appendChild(anchor);


    // Select the parent <ul> to target all <li> within it, including nested <ul>

    const allListItems = block.querySelectorAll('ul > li');

    // Iterate over each <li> element
    allListItems.forEach(li => {
        // Skip <li> elements that already have an <a> as a direct child
        if (li.querySelector(':scope > a, :scope > h4')) {
            return;
        }

        // Create a new <a> element
        const anchor = document.createElement('a');

        // Get the text content of the current <li> element
        const text = li.childNodes[0].nodeValue.trim();

        // Set the text content of the <a> element
        anchor.textContent = text;

        // Clear the text node
        li.childNodes[0].nodeValue = '';

        // Append the <a> element to the <li>
        li.appendChild(anchor);
    });

    const brandItems = block.querySelectorAll('ul > li > a');
    console.log('brandItems:', brandItems);
    // Attach click event listeners to brand <a> elements
    // ... rest of your JavaScript code

    brandItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Prevent the default anchor action
            event.preventDefault();

            // The parent <li> of the clicked <a> tag
            const parentLi = event.currentTarget.parentNode;

            // Find a <ul> that is a direct child of the parent <li>
            const siblingUl = Array.from(parentLi.children).find(child => child.tagName === 'UL');
            if (siblingUl) {
                console.log('The clicked item has a <ul> sibling.');
                // Toggle the class of the <li> instead of inline style
                parentLi.classList.toggle('clicked');
            } else {
                console.log('The clicked item does not have a <ul> sibling.');
                // Other actions...
            }
        });
    });
}