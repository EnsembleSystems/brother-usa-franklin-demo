export default function decorate(block) {
    const bbbLogo = block.querySelector('img');
    const pictureTag = block.querySelector('picture');
    const bbbLogoLink = document.createElement('a');
    bbbLogoLink.href = 'https://www.bbb.org/us/nj/bridgewater/profile/commercial-manufacturers/brother-international-corporation-0221-11003469#sealclick';
    bbbLogoLink.target = '_blank';
    bbbLogoLink.append(bbbLogo);
    pictureTag.append(bbbLogoLink);
}