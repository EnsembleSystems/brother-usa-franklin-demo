function updateActiveSlide(block, slideIndex) {
    // Insert the h6 tag before the .lineup-and-products.block element
    const slides = block.querySelectorAll('.lineup-and-products-slide');

    const dots = block.querySelectorAll('.slick-dots button');
    dots.forEach((dot, idx) => {
      if (idx === slideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    slides.forEach((slide, idx) => {
        const isVisible = idx === slideIndex;
        slide.style.display = isVisible ? 'flex' : 'none'; // Adjust display property here
        slide.style.opacity = isVisible ? '1' : '0';
        slide.setAttribute('aria-hidden', !isVisible);
        slide.querySelectorAll('button').forEach((button) => {
            button.setAttribute('tabindex', isVisible ? '0' : '-1');
        });

        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description');

        // Select the h6, first p tag, and a tag and append them to the description div
        const h6 = slide.querySelector('h6');
        const p = slide.querySelector('p');
        const a = slide.querySelector('a');

        descriptionDiv.appendChild(h6);
        descriptionDiv.appendChild(p);
        descriptionDiv.appendChild(a);


        // Insert the description div at the start of the slide div
        slide.insertBefore(descriptionDiv, slide.firstChild);

        // Now move the picture element to be a direct sibling after the description div
        const picture = slide.querySelector('picture');
        if (picture) slide.appendChild(picture);

        const emptyDiv = descriptionDiv.nextElementSibling;
        emptyDiv.remove();
    });

    const indicators = block.querySelectorAll('.lineup-and-products-indicator');
    indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === slideIndex);
    });

    block.dataset.activeSlide = slideIndex;
}


function showSlide(block, slideIndex) {
    const slides = block.querySelectorAll('.lineup-and-products-slide');
    const numSlides = slides.length;
    const normalizedIndex = (slideIndex + numSlides) % numSlides;
    updateActiveSlide(block, normalizedIndex);
}

function bindEvents(block) {
    const prevButton = block.querySelector('.lineup-and-products-prev');
    const nextButton = block.querySelector('.lineup-and-products-next');

    prevButton.addEventListener('click', () => {
        const currentSlide = parseInt(block.dataset.activeSlide, 10);
        showSlide(block, currentSlide - 1);
    });

    nextButton.addEventListener('click', () => {
        const currentSlide = parseInt(block.dataset.activeSlide, 10);
        showSlide(block, currentSlide + 1);
    });
}

function createDots(container, count, block) {
    for (let i = 0; i < count; i++) {
      let dotLi = document.createElement('li');
      let dotButton = document.createElement('button');
      dotButton.textContent = '•'; // or any other content
      dotButton.onclick = () => showSlide(block, i); // Add onclick event to each dot
      dotLi.appendChild(dotButton);
      container.appendChild(dotLi);
    }
  }
  

export default function decorate(block) {
    const header = document.createElement('h3');
    header.textContent = 'Featured Lineups and Products';
    block.parentNode.insertBefore(header, block);

    const buttonContainers = block.querySelectorAll('.lineup-and-products > div');
    buttonContainers.forEach((div, index) => {
        div.classList.add('lineup-and-products-slide');
        div.dataset.slideIndex = index;
    });

    const slideNav = document.createElement('div');
    slideNav.classList.add('slide-nav');

    const prevButton = document.createElement('button');
    prevButton.classList.add('lineup-and-products-prev');

    const nextButton = document.createElement('button');
    nextButton.classList.add('lineup-and-products-next');

    const dotsUl = document.createElement('ul');
    dotsUl.classList.add('slick-dots');
    // The dots themselves would be created and appended here based on slide count,
    // which I'll represent with a placeholder function call
    createDots(dotsUl, block.querySelectorAll('.lineup-and-products-slide').length, block);

    slideNav.appendChild(prevButton);
    slideNav.appendChild(dotsUl);
    slideNav.appendChild(nextButton);


    block.appendChild(slideNav);

    // block.appendChild(nextButton);

    updateActiveSlide(block, 0);
    bindEvents(block);
}
