document.addEventListener('DOMContentLoaded', function() {
  // Hero Slider
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevButton = document.querySelector('.slider-arrow.prev');
  const nextButton = document.querySelector('.slider-arrow.next');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    const showSlide = (index) => {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the selected slide and activate its dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      currentSlide = index;
    };
    
    // Initialize the slider with the first slide
    showSlide(0);
    
    // Start automatic sliding
    const startSlideshow = () => {
      slideInterval = setInterval(() => {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) {
          nextSlide = 0;
        }
        showSlide(nextSlide);
      }, 6000); // Change slide every 6 seconds
    };
    
    // Stop automatic sliding
    const stopSlideshow = () => {
      clearInterval(slideInterval);
    };
    
    // Initialize the slideshow
    startSlideshow();
    
    // Click handlers for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        // Reset the interval when manually changing slides
        stopSlideshow();
        startSlideshow();
      });
    });
    
    // Next and previous buttons
    if (nextButton && prevButton) {
      nextButton.addEventListener('click', () => {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) {
          nextSlide = 0;
        }
        showSlide(nextSlide);
        // Reset the interval when manually changing slides
        stopSlideshow();
        startSlideshow();
      });
      
      prevButton.addEventListener('click', () => {
        let prevSlide = currentSlide - 1;
        if (prevSlide < 0) {
          prevSlide = slides.length - 1;
        }
        showSlide(prevSlide);
        // Reset the interval when manually changing slides
        stopSlideshow();
        startSlideshow();
      });
    }
    
    // Pause slideshow on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopSlideshow);
      sliderContainer.addEventListener('mouseleave', startSlideshow);
    }
    
    // Touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const swipeThreshold = 50; // Minimum distance required for a swipe
      
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - show next slide
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) {
          nextSlide = 0;
        }
        showSlide(nextSlide);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - show previous slide
        let prevSlide = currentSlide - 1;
        if (prevSlide < 0) {
          prevSlide = slides.length - 1;
        }
        showSlide(prevSlide);
      }
      
      // Reset the interval when manually changing slides
      stopSlideshow();
      startSlideshow();
    };
    
    if (sliderContainer) {
      sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Only handle keyboard navigation if the slider is in the viewport
      const sliderRect = sliderContainer.getBoundingClientRect();
      const isInViewport = sliderRect.top < window.innerHeight && sliderRect.bottom > 0;
      
      if (isInViewport) {
        if (e.key === 'ArrowRight') {
          // Right arrow - show next slide
          let nextSlide = currentSlide + 1;
          if (nextSlide >= slides.length) {
            nextSlide = 0;
          }
          showSlide(nextSlide);
          stopSlideshow();
          startSlideshow();
        } else if (e.key === 'ArrowLeft') {
          // Left arrow - show previous slide
          let prevSlide = currentSlide - 1;
          if (prevSlide < 0) {
            prevSlide = slides.length - 1;
          }
          showSlide(prevSlide);
          stopSlideshow();
          startSlideshow();
        }
      }
    });
  }
});