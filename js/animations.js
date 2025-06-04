document.addEventListener('DOMContentLoaded', function() {
  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-card');
  
  const revealOnScroll = function() {
    for (let i = 0; i < revealElements.length; i++) {
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        revealElements[i].classList.add('active');
        
        // Add card index for staggered animations
        if (revealElements[i].classList.contains('reveal-card')) {
          const cardContainer = revealElements[i].parentElement;
          const cards = cardContainer.querySelectorAll('.reveal-card');
          const cardIndex = Array.from(cards).indexOf(revealElements[i]);
          revealElements[i].style.setProperty('--card-index', cardIndex);
        }
      }
    }
  };
  
  window.addEventListener('scroll', revealOnScroll);
  
  // Trigger once on load to reveal above-the-fold elements
  setTimeout(revealOnScroll, 100);
  
  // Add page transition effects for internal links
  const internalLinks = document.querySelectorAll('a[href^="/"]:not([href*=":"]), a[href^="./"]:not([href*=":"]), a[href^="../"]:not([href*=":"]), a[href^="#"]:not([href*=":"]), a[href^="' + window.location.origin + '"]:not([href*=":"])');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Skip for hash links (page anchors)
      if (this.getAttribute('href').startsWith('#')) return;
      
      e.preventDefault();
      const targetUrl = this.getAttribute('href');
      
      // Create page transition element if it doesn't exist
      let pageTransition = document.querySelector('.page-transition');
      if (!pageTransition) {
        pageTransition = document.createElement('div');
        pageTransition.className = 'page-transition';
        document.body.appendChild(pageTransition);
      }
      
      // Trigger transition animation
      pageTransition.classList.add('active');
      
      // Navigate to the new page after transition completes
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 600); // Match this with the CSS transition duration
    });
  });
  
  // Check if arriving from an internal page transition
  if (performance.navigation.type === 1) {
    // This is a page reload, add exit animation for page transition
    let pageTransition = document.querySelector('.page-transition');
    if (!pageTransition) {
      pageTransition = document.createElement('div');
      pageTransition.className = 'page-transition active exit';
      document.body.appendChild(pageTransition);
      
      // Remove the transition element after animation completes
      setTimeout(() => {
        pageTransition.remove();
      }, 600);
    }
  }
  
  // Add hover animations for collection items
  const collectionItems = document.querySelectorAll('.collection-item');
  
  collectionItems.forEach(item => {
    const overlay = item.querySelector('.collection-overlay');
    const content = item.querySelector('.collection-content');
    
    if (overlay && content) {
      item.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      });
      
      item.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
      });
    }
  });
  
  // Add animations for product cards
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const actions = card.querySelector('.product-actions');
    
    if (actions) {
      card.addEventListener('mouseenter', () => {
        actions.style.opacity = '1';
        actions.style.transform = 'translateX(0)';
      });
      
      card.addEventListener('mouseleave', () => {
        actions.style.opacity = '0';
        actions.style.transform = 'translateX(10px)';
      });
    }
  });
  
  // Add "Add to Cart" animation
  const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-modal');
  const cartCount = document.querySelector('.cart-count');
  
  if (addToCartButtons.length > 0 && cartCount) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Add the item to cart (in a real implementation, this would be more complex)
        let count = parseInt(cartCount.textContent);
        count++;
        cartCount.textContent = count;
        
        // Animate the cart count
        cartCount.classList.add('animate');
        
        // Remove the animation class after it completes
        setTimeout(() => {
          cartCount.classList.remove('animate');
        }, 500);
        
        // Provide visual feedback on the button
        const originalText = this.textContent;
        this.textContent = 'Added!';
        this.style.backgroundColor = 'var(--success)';
        
        // Reset the button after a delay
        setTimeout(() => {
          this.textContent = originalText;
          this.style.backgroundColor = '';
        }, 1500);
      });
    });
  }
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add parallax effect for banner sections
  const banners = document.querySelectorAll('.banner-image, .season-banner');
  
  if (banners.length > 0) {
    window.addEventListener('scroll', () => {
      banners.forEach(banner => {
        const scrollPosition = window.pageYOffset;
        const bannerPosition = banner.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition + windowHeight > bannerPosition && scrollPosition < bannerPosition + banner.offsetHeight) {
          const yPos = (scrollPosition - bannerPosition) * 0.2;
          banner.style.backgroundPosition = `center ${yPos}px`;
        }
      });
    });
  }
  
  // Animate numbers when they come into view
  const animateNumbers = document.querySelectorAll('.animate-number');
  
  if (animateNumbers.length > 0) {
    const animateNumbersOnScroll = function() {
      animateNumbers.forEach(number => {
        const elementTop = number.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible && !number.classList.contains('animated')) {
          number.classList.add('animated');
          
          const targetNumber = parseInt(number.getAttribute('data-number'));
          const duration = 2000; // Duration in milliseconds
          const frameRate = 60; // Frames per second
          const increment = targetNumber / (duration / 1000 * frameRate);
          
          let currentNumber = 0;
          const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
              currentNumber = targetNumber;
              clearInterval(counter);
            }
            number.textContent = Math.floor(currentNumber).toLocaleString();
          }, 1000 / frameRate);
        }
      });
    };
    
    window.addEventListener('scroll', animateNumbersOnScroll);
    setTimeout(animateNumbersOnScroll, 100);
  }
  
  // Text splitting for more advanced animations
  const splitTextElements = document.querySelectorAll('.split-text');
  
  if (splitTextElements.length > 0) {
    splitTextElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${i * 0.05}s`;
        element.appendChild(span);
      }
      
      const animateSplitText = function() {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate');
        }
      };
      
      window.addEventListener('scroll', animateSplitText);
      setTimeout(animateSplitText, 100);
    });
  }
  
  // Add animations for image hover effects
  const hoverImageContainers = document.querySelectorAll('.hover-image-container');
  
  if (hoverImageContainers.length > 0) {
    hoverImageContainers.forEach(container => {
      const primaryImage = container.querySelector('.primary-image');
      const secondaryImage = container.querySelector('.secondary-image');
      
      if (primaryImage && secondaryImage) {
        container.addEventListener('mouseenter', () => {
          primaryImage.style.opacity = '0';
          secondaryImage.style.opacity = '1';
        });
        
        container.addEventListener('mouseleave', () => {
          primaryImage.style.opacity = '1';
          secondaryImage.style.opacity = '0';
        });
      }
    });
  }
  
  // Add staggered animations for multiple elements
  const staggerContainers = document.querySelectorAll('.stagger-animation');
  
  if (staggerContainers.length > 0) {
    const staggerOnScroll = function() {
      staggerContainers.forEach(container => {
        const elementTop = container.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          container.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', staggerOnScroll);
    setTimeout(staggerOnScroll, 100);
  }
});