document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('fade-out');
      }, 300);
    });
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

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
  revealOnScroll();

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Featured product gallery
  const productGalleryImages = document.querySelectorAll('.thumbnail-images img');
  const mainProductImage = document.getElementById('main-product-image');
  
  if (productGalleryImages.length > 0 && mainProductImage) {
    productGalleryImages.forEach(img => {
      img.addEventListener('click', function() {
        // Remove active class from all thumbnails
        productGalleryImages.forEach(thumb => thumb.classList.remove('active'));
        // Add active class to clicked thumbnail
        this.classList.add('active');
        
        // Change main image with animation
        const mainImage = mainProductImage.parentElement;
        mainImage.classList.add('changing');
        
        setTimeout(() => {
          mainProductImage.src = this.src;
          mainImage.classList.remove('changing');
        }, 300);
      });
    });
  }

  // Product color selection
  const colorOptions = document.querySelectorAll('.color-option');
  
  if (colorOptions.length > 0) {
    colorOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Find all color options in the same container
        const container = this.closest('.color-options');
        const options = container.querySelectorAll('.color-option');
        
        // Remove active class from all options
        options.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
      });
    });
  }

  // Product size selection
  const sizeOptions = document.querySelectorAll('.size-option');
  
  if (sizeOptions.length > 0) {
    sizeOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Find all size options in the same container
        const container = this.closest('.size-options');
        const options = container.querySelectorAll('.size-option');
        
        // Remove active class from all options
        options.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
      });
    });
  }

  // Quantity selector
  const quantityDecrease = document.querySelectorAll('.quantity-decrease');
  const quantityIncrease = document.querySelectorAll('.quantity-increase');
  
  if (quantityDecrease.length > 0 && quantityIncrease.length > 0) {
    quantityDecrease.forEach(button => {
      button.addEventListener('click', function() {
        const input = this.nextElementSibling;
        let value = parseInt(input.value);
        
        if (value > 1) {
          value--;
          input.value = value;
        }
      });
    });
    
    quantityIncrease.forEach(button => {
      button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        let value = parseInt(input.value);
        const max = parseInt(input.getAttribute('max')) || 10;
        
        if (value < max) {
          value++;
          input.value = value;
        }
      });
    });
  }

  // Quick view modal
  const quickViewButtons = document.querySelectorAll('.quick-view');
  const quickViewModal = document.getElementById('quick-view-modal');
  const closeModalButton = document.querySelector('.close-modal');
  
  if (quickViewButtons.length > 0 && quickViewModal && closeModalButton) {
    quickViewButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = this.getAttribute('data-product-id');
        
        // Here you would normally fetch product details by ID
        // For demo purposes, we'll use hardcoded data based on the product ID
        const products = {
          '1': {
            title: 'Classic Denim Jacket',
            price: '$89.99',
            image: 'https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          '2': {
            title: 'Elegant White Blouse',
            price: '$59.99',
            image: 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          '3': {
            title: 'Slim Fit Jeans',
            price: '$64.99',
            image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          '4': {
            title: 'Floral Summer Dress',
            price: '$75.99',
            image: 'https://images.pexels.com/photos/2531156/pexels-photo-2531156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          '5': {
            title: 'Leather Biker Jacket',
            price: '$129.99',
            image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          }
        };
        
        const product = products[productId];
        
        if (product) {
          document.getElementById('modal-product-title').textContent = product.title;
          document.getElementById('modal-product-price').textContent = product.price;
          document.getElementById('modal-product-image').src = product.image;
          document.getElementById('modal-product-image').alt = product.title;
        }
        
        quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    closeModalButton.addEventListener('click', function() {
      quickViewModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside the content
    quickViewModal.addEventListener('click', function(e) {
      if (e.target === quickViewModal) {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Search functionality
  const searchTrigger = document.querySelector('.search-trigger');
  const searchPopup = document.querySelector('.search-popup');
  const closeSearch = document.querySelector('.close-search');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (searchTrigger && searchPopup && closeSearch) {
    searchTrigger.addEventListener('click', function() {
      searchPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus the search input after a short delay (for animation)
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    });
    
    closeSearch.addEventListener('click', function() {
      searchPopup.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Mock search functionality
    if (searchInput && searchResults) {
      const products = [
        { id: 1, title: 'Classic Denim Jacket', category: 'Jackets', price: '$89.99', image: 'https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 2, title: 'Elegant White Blouse', category: 'Tops', price: '$59.99', image: 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 3, title: 'Slim Fit Jeans', category: 'Bottoms', price: '$64.99', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 4, title: 'Floral Summer Dress', category: 'Dresses', price: '$75.99', image: 'https://images.pexels.com/photos/2531156/pexels-photo-2531156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 5, title: 'Leather Biker Jacket', category: 'Jackets', price: '$129.99', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 6, title: 'Casual Button-down Shirt', category: 'Tops', price: '$49.99', image: 'https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
      ];
      
      searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
          searchResults.innerHTML = '';
          return;
        }
        
        const filteredProducts = products.filter(product => 
          product.title.toLowerCase().includes(query) || 
          product.category.toLowerCase().includes(query)
        );
        
        if (filteredProducts.length === 0) {
          searchResults.innerHTML = '<p class="no-results">No products found matching your search.</p>';
          return;
        }
        
        let resultsHTML = '';
        
        filteredProducts.forEach(product => {
          resultsHTML += `
            <div class="search-result">
              <img class="search-result-image" src="${product.image}" alt="${product.title}">
              <div class="search-result-details">
                <h3 class="search-result-title">${product.title}</h3>
                <p class="search-result-category">${product.category}</p>
                <p class="search-result-price">${product.price}</p>
              </div>
            </div>
          `;
        });
        
        searchResults.innerHTML = resultsHTML;
      });
    }
  }

  // FAQ accordions
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
        });
        
        // Toggle the clicked item
        if (!isActive) {
          faqItem.classList.add('active');
        }
      });
    });
  }

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  const testimonialNext = document.querySelector('.testimonial-arrow.next');
  const testimonialPrev = document.querySelector('.testimonial-arrow.prev');
  
  if (testimonialSlides.length > 0 && testimonialDots.length > 0) {
    let currentTestimonial = 0;
    
    const showTestimonial = (index) => {
      // Hide all testimonials
      testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all dots
      testimonialDots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the selected testimonial and activate its dot
      testimonialSlides[index].classList.add('active');
      testimonialDots[index].classList.add('active');
      
      currentTestimonial = index;
    };
    
    // Click handlers for dots
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
      });
    });
    
    // Next and previous buttons
    if (testimonialNext && testimonialPrev) {
      testimonialNext.addEventListener('click', () => {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialSlides.length) {
          nextIndex = 0;
        }
        showTestimonial(nextIndex);
      });
      
      testimonialPrev.addEventListener('click', () => {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) {
          prevIndex = testimonialSlides.length - 1;
        }
        showTestimonial(prevIndex);
      });
    }
    
    // Auto rotate testimonials
    let testimonialInterval = setInterval(() => {
      let nextIndex = currentTestimonial + 1;
      if (nextIndex >= testimonialSlides.length) {
        nextIndex = 0;
      }
      showTestimonial(nextIndex);
    }, 5000);
    
    // Pause rotation on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
      testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
      });
      
      testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
          let nextIndex = currentTestimonial + 1;
          if (nextIndex >= testimonialSlides.length) {
            nextIndex = 0;
          }
          showTestimonial(nextIndex);
        }, 5000);
      });
    }
  }

  // Newsletter form submission
  const newsletterForms = document.querySelectorAll('.newsletter-form, .sidebar-newsletter');
  
  if (newsletterForms.length > 0) {
    newsletterForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitButton = this.querySelector('button[type="submit"]');
        
        if (emailInput && emailInput.value.trim() !== '') {
          // Add submitting class for loading animation
          this.classList.add('submitting');
          submitButton.innerHTML = '';
          
          // Simulate form submission
          setTimeout(() => {
            this.classList.remove('submitting');
            this.classList.add('success');
            submitButton.textContent = 'Subscribed!';
            emailInput.value = '';
            
            // Reset after a few seconds
            setTimeout(() => {
              this.classList.remove('success');
              submitButton.textContent = 'Subscribe';
            }, 3000);
          }, 1500);
        }
      });
    });
  }

  // Helper function to change main product image
  window.changeImage = function(src) {
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
      const imageContainer = mainImage.parentElement;
      imageContainer.classList.add('changing');
      
      setTimeout(() => {
        mainImage.src = src;
        imageContainer.classList.remove('changing');
        
        // Update active thumbnail
        const thumbnails = document.querySelectorAll('.thumbnail-images img');
        thumbnails.forEach(thumb => {
          if (thumb.src === src) {
            thumb.classList.add('active');
          } else {
            thumb.classList.remove('active');
          }
        });
      }, 300);
    }
  };

  // Checkout page steps navigation
  const checkoutSteps = document.querySelectorAll('.checkout-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step');
  const editButtons = document.querySelectorAll('.edit-section');
  
  if (checkoutSteps.length > 0 && progressSteps.length > 0) {
    // Next step buttons
    if (nextButtons.length > 0) {
      nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          const currentStep = this.closest('.checkout-step');
          const nextStepId = this.getAttribute('data-next');
          const nextStep = document.getElementById(`step-${nextStepId}`);
          
          if (currentStep && nextStep) {
            // If the button is in a form, validate it first
            const form = this.closest('form');
            if (form && !form.checkValidity()) {
              form.reportValidity();
              return;
            }
            
            // Hide current step
            currentStep.classList.remove('active');
            
            // Show next step
            nextStep.classList.add('active');
            
            // Update progress indicator
            progressSteps.forEach(step => {
              if (step.getAttribute('data-step') === currentStep.id.replace('step-', '')) {
                step.classList.add('completed');
              }
              if (step.getAttribute('data-step') === nextStepId) {
                step.classList.add('active');
              }
            });
            
            // Scroll to top of the form
            window.scrollTo({
              top: document.querySelector('.checkout-progress').offsetTop - 100,
              behavior: 'smooth'
            });
          }
        });
      });
    }
    
    // Previous step buttons
    if (prevButtons.length > 0) {
      prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          const currentStep = this.closest('.checkout-step');
          const prevStepId = this.getAttribute('data-prev');
          const prevStep = document.getElementById(`step-${prevStepId}`);
          
          if (currentStep && prevStep) {
            // Hide current step
            currentStep.classList.remove('active');
            
            // Show previous step
            prevStep.classList.add('active');
            
            // Update progress indicator
            progressSteps.forEach(step => {
              if (step.getAttribute('data-step') === currentStep.id.replace('step-', '')) {
                step.classList.remove('active');
              }
              if (step.getAttribute('data-step') === prevStepId) {
                step.classList.add('active');
                step.classList.remove('completed');
              }
            });
          }
        });
      });
    }
    
    // Edit step buttons
    if (editButtons.length > 0) {
      editButtons.forEach(button => {
        button.addEventListener('click', function() {
          const stepId = this.getAttribute('data-step');
          const step = document.getElementById(`step-${stepId}`);
          
          if (step) {
            // Hide all steps
            checkoutSteps.forEach(s => s.classList.remove('active'));
            
            // Show the target step
            step.classList.add('active');
            
            // Update progress indicator
            progressSteps.forEach(progressStep => {
              const stepData = progressStep.getAttribute('data-step');
              
              if (stepData === stepId) {
                progressStep.classList.add('active');
                progressStep.classList.remove('completed');
              } else if (getStepIndex(stepData) < getStepIndex(stepId)) {
                progressStep.classList.add('completed');
                progressStep.classList.remove('active');
              } else {
                progressStep.classList.remove('active');
                progressStep.classList.remove('completed');
              }
            });
          }
        });
      });
    }
    
    // Helper function to get the index of a step
    function getStepIndex(stepId) {
      const steps = ['billing', 'shipping', 'payment', 'review'];
      return steps.indexOf(stepId);
    }
    
    // Place order button
    const placeOrderButton = document.getElementById('place-order-button');
    const orderConfirmationModal = document.getElementById('order-confirmation-modal');
    
    if (placeOrderButton && orderConfirmationModal) {
      placeOrderButton.addEventListener('click', function() {
        const termsCheckbox = document.getElementById('terms-agree');
        
        if (termsCheckbox && !termsCheckbox.checked) {
          alert('Please agree to the terms and conditions before placing your order.');
          return;
        }
        
        // Simulate order processing
        placeOrderButton.disabled = true;
        placeOrderButton.textContent = 'Processing...';
        
        setTimeout(() => {
          // Display confirmation modal
          orderConfirmationModal.classList.add('active');
          document.body.style.overflow = 'hidden';
          
          // Generate random order number
          const orderNumber = Math.floor(100000 + Math.random() * 900000);
          document.getElementById('order-number').textContent = orderNumber;
          
          // Set current date
          const orderDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          document.getElementById('order-date').textContent = orderDate;
          
          // Get email from billing form
          const emailInput = document.getElementById('email');
          if (emailInput) {
            document.getElementById('confirmation-email').textContent = emailInput.value;
          }
          
          // Reset button state
          placeOrderButton.disabled = false;
          placeOrderButton.textContent = 'Place Order';
        }, 2000);
      });
      
      // Confirmation modal buttons
      const viewOrderButton = document.getElementById('view-order-button');
      const continueShoppingButton = document.getElementById('continue-shopping-button');
      
      if (viewOrderButton && continueShoppingButton) {
        viewOrderButton.addEventListener('click', function() {
          // Redirect to orders page (in a real implementation)
          orderConfirmationModal.classList.remove('active');
          document.body.style.overflow = '';
          alert('This would redirect to the order details page in a real implementation.');
        });
        
        continueShoppingButton.addEventListener('click', function() {
          orderConfirmationModal.classList.remove('active');
          document.body.style.overflow = '';
          window.location.href = 'index.html';
        });
      }
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="payment_method"]');
    const paymentDetails = document.querySelectorAll('.payment-details');
    
    if (paymentMethods.length > 0 && paymentDetails.length > 0) {
      paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
          const selectedMethod = this.value;
          
          // Hide all payment details
          paymentDetails.forEach(details => {
            details.style.display = 'none';
          });
          
          // Show selected payment details
          const selectedDetails = document.getElementById(`${selectedMethod}-details`);
          if (selectedDetails) {
            selectedDetails.style.display = 'block';
          }
        });
      });
    }
  }

  // Initialize product image change function
  const changeImageLinks = document.querySelectorAll('.thumbnail-images img');
  if (changeImageLinks.length > 0) {
    changeImageLinks.forEach(link => {
      link.addEventListener('click', function() {
        changeImage(this.src);
      });
    });
  }
});