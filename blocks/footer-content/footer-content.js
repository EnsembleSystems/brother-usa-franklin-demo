export default function decorate(block) {
    const bbbLogo = block.querySelector('img');
    const pictureTag = block.querySelector('picture');
    const bbbLogoLink = document.createElement('a');
    bbbLogoLink.href = `${window.location.origin}/`
    bbbLogoLink.target = '_blank';
    bbbLogoLink.append(bbbLogo);
    pictureTag.append(bbbLogoLink);
}