export default function decorate(block) {
    const brotherUSALogo = block.querySelector('img');
    const brotherUSAPictureTag = block.querySelector('picture');
    const home = block.querySelector('#home');
    const business = block.querySelector('#business');
    const iconList = block.querySelector('ul');
    const homeAndBusinessMenu = document.createElement('div');
    homeAndBusinessMenu.classList.add('home-and-business-menu');
    homeAndBusinessMenu.appendChild(brotherUSALogo);
    homeAndBusinessMenu.appendChild(brotherUSAPictureTag);
    homeAndBusinessMenu.appendChild(home);
    homeAndBusinessMenu.appendChild(business);
    homeAndBusinessMenu.appendChild(iconList);
    block.innerHTML = '';
    block.append(homeAndBusinessMenu);
}