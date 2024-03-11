export default function decorate(block) {

    const card = document.querySelector('.card');
    const children = Array.from(card.children);

    for (let i = 0; i < children.length; i += 2) {
        // Create a new div that will act as a grid item
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item'); // This class is for styling purposes

        // Append the picture and description to the grid item
        if (children[i]) gridItem.appendChild(children[i]);
        if (children[i + 1]) gridItem.appendChild(children[i + 1]);

        // Append the grid item to the card
        card.appendChild(gridItem);
    }

    // Remove the original divs that are now nested inside the new grid items
    // This step might be optional if appending the children above already removes them from their original parent
    children.forEach((child) => {
        if (child.parentNode === card) {
            card.removeChild(child);
        }
    });
}