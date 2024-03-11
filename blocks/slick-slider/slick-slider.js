function updateActiveSlide(block, slideIndex) {
    const slides = block.querySelectorAll('.slick-slide');
  
    slides.forEach((slide, idx) => {
      slide.style.display = idx === slideIndex ? 'block' : 'none'; // Show only the active slide
      slide.setAttribute('aria-hidden', idx !== slideIndex);
      slide.querySelectorAll('button').forEach((button) => {
        button.setAttribute('tabindex', idx === slideIndex ? '0' : '-1');
      });
    });
  
    const indicators = block.querySelectorAll('.slick-slide-indicator');
    indicators.forEach((indicator, idx) => {
      indicator.classList.toggle('active', idx === slideIndex);
    });
  
    // Update the active slide index in the block's dataset
    block.dataset.activeSlide = slideIndex;
  }
  
  function showSlide(block, slideIndex) {
    const slides = block.querySelectorAll('.slick-slide');
    // Normalize the slide index in case it's out of bounds
    const numSlides = slides.length;
    const normalizedIndex = (slideIndex + numSlides) % numSlides;
    updateActiveSlide(block, normalizedIndex);
  }
  
  // Uncomment and use this function when you need event handling for navigation buttons
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
    // Add 'slick-slide' class to all '.button-container' divs
    const prevButton = document.createElement('button');
    prevButton.classList.add('slick-prev'); // Add the appropriate class
    // You might want to set other attributes or styles on prevButton here
  
    const nextButton = document.createElement('button');
    nextButton.classList.add('slick-next'); // Add the appropriate class
    const buttonContainers = block.querySelectorAll('.button-container');
    buttonContainers.forEach((div) => {
      div.classList.add('slick-slide');
    });

    block.insertBefore(prevButton, block.firstChild);

    // Add the next button as the last child of the block
    block.appendChild(nextButton);
  
    // Initialize the first slide as active
    updateActiveSlide(block, 0);
  
    // Start auto-rotating slides
    autoRotate(block);
  
    // Uncomment the following line when you're ready to use navigation buttons
    bindEvents(block);
  }
  