import {
  sampleRUM,
  // buildBlock is used for autoblocking
  // buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './aem.js';

import ffetch from './ffetch.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
// eslint-disable-next-line no-unused-vars

const buildSlickSliderBlock = (main) => {
  // Assuming ffetch has been included in your project
  document.addEventListener('DOMContentLoaded', function () {
    const hypertextContainer = document.createElement('hypertext-container');
    const prevButton = document.createElement('prev');
    const nextButton = document.createElement('next');

    // This will hold the fetched entries from the index
    let hypertextEntries = [];

    // Fetch entries from your JSON endpoint
    async function fetchHypertexts() {
      for await (const entry of ffetch('/path-to-your-json-index.json')) {
        hypertextEntries.push(entry);
      }
      updateHypertext(); // Initially populate the hypertext
    }

    let currentIndex = 0;

    function updateHypertext() {
      hypertextContainer.innerHTML = `<a href="${hypertextEntries[currentIndex].url}">${hypertextEntries[currentIndex].text}</a>`;
    }

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + hypertextEntries.length) % hypertextEntries.length;
      updateHypertext();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % hypertextEntries.length;
      updateHypertext();
    });

    // Auto-rotate hypertexts
    setInterval(() => {
      nextButton.click();
    }, 3000); // Rotate every 3000 ms

    // Initial fetch of the hypertexts data
    fetchHypertexts();
  });

}

function buildAutoBlocks(main) {
  try {
    buildSlickSliderBlock();
    // add AutoBlocks functions here
    // example AutoBlocks function https://github.com/adobe/aem-boilerplate/blob/main/scripts/scripts.js#L22
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
