export default async function decorate(block) {
    const allDivs = Array.from(block.children);
    for (let i = 0; i < allDivs.length; i += 2) {
        const containerDiv = document.createElement('div');
        containerDiv.className = 'resource-card-container';

        if (allDivs[i]) {
            containerDiv.appendChild(allDivs[i]);
        }
        if (allDivs[i + 1]) {
            containerDiv.appendChild(allDivs[i + 1]);
        }

        block.appendChild(containerDiv);
    }

    allDivs.forEach((div) => {
        if (!div.closest('.resource-card-container')) {
            resourceCard.removeChild(div);
        }
    });
}
