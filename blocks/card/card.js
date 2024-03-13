export default function decorate(block) {

    const card = document.querySelector('.card');
    const children = Array.from(card.children);

    for (let i = 0; i < children.length; i += 2) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        if (children[i]) gridItem.appendChild(children[i]);
        if (children[i + 1]) gridItem.appendChild(children[i + 1]);

        card.appendChild(gridItem);
    }

    children.forEach((child) => {
        if (child.parentNode === card) {
            card.removeChild(child);
        }
    });
}