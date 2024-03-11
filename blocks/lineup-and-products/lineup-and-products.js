function updateActiveSlide(block, slideIndex) {
    const slides = block.querySelectorAll('.lineup-and-products-slide');
  
    slides.forEach((slide, idx) => {
      const isVisible = idx === slideIndex;
      slide.style.visibility = isVisible ? 'visible' : 'hidden';
      slide.style.opacity = isVisible ? '1' : '0';
      slide.setAttribute('aria-hidden', !isVisible);
      slide.querySelectorAll('button').forEach((button) => {
        button.setAttribute('tabindex', isVisible ? '0' : '-1');
      });
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
  
  export default function decorate(block) {
    const buttonContainers = block.querySelectorAll('.lineup-and-products > div');
    buttonContainers.forEach((div, index) => {
      div.classList.add('lineup-and-products-slide');
      div.dataset.slideIndex = index;
    });
  
    const prevButton = document.createElement('button');
    prevButton.classList.add('lineup-and-products-prev');
    prevButton.textContent = 'Previous'; // Add text or icon
  
    const nextButton = document.createElement('button');
    nextButton.classList.add('lineup-and-products-next');
    nextButton.textContent = 'Next'; // Add text or icon
  
    block.insertBefore(prevButton, block.firstChild);
    block.appendChild(nextButton);
  
    updateActiveSlide(block, 0);
    bindEvents(block);
  }
  