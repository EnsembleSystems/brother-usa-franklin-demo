export default function decorate(block) {
    const brandMenu = block.querySelector('ul');

    const topLevelBrandMenuItems = Array.from(brandMenu.children);

    const structureBrandMenu = () => {

        topLevelBrandMenuItems.forEach(topLevelBrandMenuItem => {
            const anchor = document.createElement('a');
            const text = topLevelBrandMenuItem.childNodes[0].nodeValue.trim();
            anchor.textContent = text;
            topLevelBrandMenuItem.childNodes[0].nodeValue = '';
            topLevelBrandMenuItem.appendChild(anchor);
            const hasSubMenu = topLevelBrandMenuItem.querySelector('ul');
            if (hasSubMenu) {
                topLevelBrandMenuItem.classList.add('has-sub-menu');
            }

            const subMenu = topLevelBrandMenuItem.querySelector('ul');
            if (subMenu) {
                subMenu.classList.add('sub-menu');
                const subMenuHeadings = Array.from(subMenu.children);
                console.log('submenu:', subMenu);
                subMenuHeadings.forEach(subMenuHeading => {
                    const heading = document.createElement('h3');
                    const text = subMenuHeading.childNodes[0].nodeValue.trim();
                    heading.textContent = text;
                    subMenuHeading.childNodes[0].nodeValue = '';
                    subMenuHeading.appendChild(heading);
                });
                const subMenuItems = subMenu.querySelectorAll(':scope > li > ul > li');
                console.log('subMenuItems:', subMenuItems);
                subMenuItems.forEach(subMenuItem => {
                    const anchor = document.createElement('a');
                    const text = subMenuItem.childNodes[0].nodeValue.trim();
                    anchor.textContent = text;
                    subMenuItem.childNodes[0].nodeValue = '';
                    subMenuItem.appendChild(anchor);

                    const hasSecondSubMenu = subMenuItem.querySelector('ul');
                    if (hasSecondSubMenu) {
                        subMenuItem.classList.add('has-second-sub-menu');
                    }
                })

            }
        });
    }

    const toggleBrandMenu = () => {
        
        const allBrandItems = block.querySelectorAll('ul > li > a');

        allBrandItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                topLevelBrandMenuItems.forEach(topLevelBrandMenuItem => {
                    if (item !== topLevelBrandMenuItem && !topLevelBrandMenuItem.contains(item)) {
                        topLevelBrandMenuItem.classList.remove('clicked');
                    }
                });

                const parentLi = event.currentTarget.parentNode;
                const siblingUl = Array.from(parentLi.children).find(child => child.tagName === 'UL');
                console.log('siblingUl:', siblingUl);
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