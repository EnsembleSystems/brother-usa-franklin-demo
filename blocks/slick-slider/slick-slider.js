function updateActiveSlide(block, slideIndex) {
    const slides = block.querySelectorAll('.slick-slide');

    slides.forEach((slide, idx) => {
        const isVisible = idx === slideIndex;
        slide.style.visibility = isVisible ? 'visible' : 'hidden';
        slide.style.opacity = isVisible ? '1' : '0';
        slide.setAttribute('aria-hidden', !isVisible);
        slide.querySelectorAll('button').forEach((button) => {
            button.setAttribute('tabindex', isVisible ? '0' : '-1');
        });
    });

    const indicators = block.querySelectorAll('.slick-slide-indicator');
    indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === slideIndex);
    });

    block.dataset.activeSlide = slideIndex;
}

function showSlide(block, slideIndex) {
    const slides = block.querySelectorAll('.slick-slide');
    const numSlides = slides.length;
    const normalizedIndex = (slideIndex + numSlides) % numSlides;
    updateActiveSlide(block, normalizedIndex);
}

function bindEvents(block) {
    const prevButton = block.querySelector('.slick-prev');
    const nextButton = block.querySelector('.slick-next');

    prevButton.addEventListener('click', () => {
        const currentSlide = parseInt(block.dataset.activeSlide, 10);
        showSlide(block, currentSlide - 1);
    });

    nextButton.addEventListener('click', () => {
        const currentSlide = parseInt(block.dataset.activeSlide, 10);
        showSlide(block, currentSlide + 1);
    });
}

function autoRotate(block, interval = 5000) {
    let activeSlideIndex = parseInt(block.dataset.activeSlide, 10) || 0;
    const slides = block.querySelectorAll('.slick-slide');

    setInterval(() => {
        activeSlideIndex = (activeSlideIndex + 1) % slides.length;
        showSlide(block, activeSlideIndex);
    }, interval);
}

export default function decorate(block) {
    const prevButton = document.createElement('div');
    prevButton.classList.add('slick-prev');

    const nextButton = document.createElement('div');
    nextButton.classList.add('slick-next');
    const buttonContainers = block.querySelectorAll('.button-container');
    buttonContainers.forEach((div) => {
        div.classList.add('slick-slide');
    });

    block.insertBefore(prevButton, block.firstChild);

    block.appendChild(nextButton);

    updateActiveSlide(block, 0);

    autoRotate(block);

    bindEvents(block);
}
