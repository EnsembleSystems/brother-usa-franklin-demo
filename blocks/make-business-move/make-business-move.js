export default function decorate(block) {
    // Assuming there's only one h6 with this specific id on the page
const h6 = block.querySelector('h6');
console.log('h6:', h6);
h6.parentElement.classList.add('make-business-move-container');
}