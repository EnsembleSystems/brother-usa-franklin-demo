export default function decorate(block) {
    const brotherUSALogo = block.querySelector('img');
    const brotherUSAPictureTag = block.querySelector('picture');
    const iconList = block.querySelector('ul');
    
    // Clear block's innerHTML after storing necessary elements
    block.innerHTML = '';
    
    const homeLink = document.createElement('a');
    homeLink.classList.add('home-link');
    homeLink.href = `${window.location.origin}/`;
    homeLink.textContent = 'For Home';

    const businessLink = document.createElement('a');
    businessLink.classList.add('business-link');
    businessLink.href = `${window.location.origin}/`; // Assumed correction for distinct business link
    businessLink.textContent = 'For Business';
    
    const homeAndBusinessMenu = document.createElement('div');
    homeAndBusinessMenu.classList.add('home-and-business-menu');
    
    const homeBusinessTitle = document.createElement('div');
    homeBusinessTitle.classList.add('home-business-title');
    homeBusinessTitle.appendChild(homeLink);
    homeBusinessTitle.appendChild(businessLink);

    // Append homeBusinessTitle, brotherUSALogo, brotherUSAPictureTag, and iconList to homeAndBusinessMenu
    homeAndBusinessMenu.appendChild(brotherUSALogo);
    homeAndBusinessMenu.appendChild(brotherUSAPictureTag);
    homeAndBusinessMenu.appendChild(homeBusinessTitle); // Corrected: append homeBusinessTitle instead of individual links
    homeAndBusinessMenu.appendChild(iconList);

    // Finally, append homeAndBusinessMenu to the block
    block.append(homeAndBusinessMenu);
}
