export default function decorate(block) {
    const structureBrandMenu = () => {
        const brandMenu = block.querySelector('ul');

        const topLevelBrandMenuItems = Array.from(brandMenu.children);

        topLevelBrandMenuItems.forEach(topLevelBrandMenuItem => {
            const submenu = topLevelBrandMenuItem.querySelector('ul');
            if (submenu) {
                const submenuItems = Array.from(submenu.children);
                submenuItems.forEach(submenuItem => {
                    const anchor = document.createElement('h3');
                    const text = submenuItem.childNodes[0].nodeValue.trim();
                    anchor.textContent = text;
                    submenuItem.childNodes[0].nodeValue = '';
                    submenuItem.appendChild(anchor);
                });
            }
        });

        topLevelBrandMenuItems.forEach(li => {
            if (li.querySelector(':scope > a, :scope > h3')) {
                return;
            }

            const anchor = document.createElement('a');
            const text = li.childNodes[0].nodeValue.trim();
            anchor.textContent = text;
            li.childNodes[0].nodeValue = '';
            li.appendChild(anchor);
        });
    }

    const toggleBrandMenu = () => {
        const allBrandItems = block.querySelectorAll('ul > li > a');

        allBrandItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                const parentLi = event.currentTarget.parentNode;

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
    };

    structureBrandMenu();
    toggleBrandMenu();
}