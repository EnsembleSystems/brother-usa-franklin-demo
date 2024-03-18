import { getMetadata } from '../../scripts/aem.js';

function buildBreadcrumbs(currentLocation) {
    const breadcrumbs = document.createElement('nav');
    breadcrumbs.className = 'breadcrumbs';
    breadcrumbs.setAttribute('aria-label', 'Breadcrumb');

    const forBusinessUrl = '/';

    const ol = document.createElement('ol');

    const liForBusiness = document.createElement('li');
    const aForBusiness = document.createElement('a');
    aForBusiness.href = forBusinessUrl;
    aForBusiness.textContent = 'For Business';
    liForBusiness.appendChild(aForBusiness);
    ol.appendChild(liForBusiness);

    const liCurrent = document.createElement('li');
    liCurrent.textContent = `/   ${currentLocation}`; // Intended spaces
    liCurrent.style.whiteSpace = 'pre';

    liCurrent.setAttribute('aria-current', 'page');
    ol.appendChild(liCurrent);

    breadcrumbs.appendChild(ol);

    return breadcrumbs;
}

export default function decorate(block) {
    const titleWrapper = document.querySelector('.business-resources-title-wrapper');

    const picture = block.querySelector('p picture');
    const parentPTag = picture.parentElement;
    parentPTag.parentNode.insertBefore(picture, parentPTag.nextSibling);

    if (getMetadata('breadcrumbs').toLowerCase() === 'true') {
        const location = getMetadata('location');
        titleWrapper.parentNode.insertBefore(buildBreadcrumbs(location), titleWrapper.nextSibling);
    }

    const h6Element = block.querySelector('#business-resources');

    const parentElement = h6Element.parentElement;

    parentElement.classList.add('business-resource-title-element');
}
