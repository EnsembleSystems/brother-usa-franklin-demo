import { getMetadata } from '../../scripts/aem.js';

function buildBreadcrumbs(currentLocation) {
    // Create the breadcrumbs navigation element
    const breadcrumbs = document.createElement('nav');
    breadcrumbs.className = 'breadcrumbs';
    breadcrumbs.setAttribute('aria-label', 'Breadcrumb');
  
    // Static URL for the 'For Business' section
    const forBusinessUrl = '/';
  
    // Construct the breadcrumbs list
    const ol = document.createElement('ol');
  
    // Add the 'For Business' crumb
    const liForBusiness = document.createElement('li');
    const aForBusiness = document.createElement('a');
    aForBusiness.href = forBusinessUrl;
    aForBusiness.textContent = 'For Business';
    liForBusiness.appendChild(aForBusiness);
    ol.appendChild(liForBusiness);
  
    // Add the current location crumb
    const liCurrent = document.createElement('li');
    liCurrent.textContent = `/  ${currentLocation}`;
    liCurrent.setAttribute('aria-current', 'page');
    ol.appendChild(liCurrent);
  
    // Append the list to the breadcrumbs navigation element
    breadcrumbs.appendChild(ol);
  
    return breadcrumbs;
  }
  
  export default function decorate(block) {
    // Use the location metadata or a default value for the current location
    const titleWrapper = document.querySelector('.business-resources-title-wrapper');
    console.log('titleWrapper:', titleWrapper);

    if (getMetadata('breadcrumbs').toLowerCase() === 'true') {
        const location = getMetadata('location'); // Replace with dynamic content if needed
        titleWrapper.parentNode.insertBefore(buildBreadcrumbs(location), titleWrapper.nextSibling);
    }

    const h6Element = block.querySelector('#business-resources');

    // Check if the h6 element exists to avoid errors
    const parentElement = h6Element.parentElement;

    // Add the 'business-resource-title-container' class to the parent element
    parentElement.classList.add('business-resource-title-element');
  }
  