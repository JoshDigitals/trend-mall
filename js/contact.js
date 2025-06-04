document.addEventListener('DOMContentLoaded', function() {
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      
      // Validate form
      if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
        alert('Please fill out all fields');
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // In a real implementation, you would send the form data to a server
      // For this demo, we'll simulate a successful form submission
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate form processing
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        const formContainer = contactForm.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
          <div class="success-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <h3>Message Sent!</h3>
          <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
        `;
        
        // Hide form and show success message
        contactForm.style.display = 'none';
        formContainer.appendChild(successMessage);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // After a few seconds, remove success message and show form again
        setTimeout(() => {
          successMessage.classList.add('fade-out');
          
          setTimeout(() => {
            formContainer.removeChild(successMessage);
            contactForm.style.display = 'block';
          }, 500);
        }, 5000);
      }, 2000);
    });
  }
  
  // Map interaction
  const contactMap = document.querySelector('.contact-map iframe');
  
  if (contactMap) {
    // Add placeholder for map if needed
    contactMap.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    // Add some basic interaction
    contactMap.style.opacity = '0.8';
    
    contactMap.addEventListener('mouseenter', function() {
      this.style.opacity = '1';
    });
    
    contactMap.addEventListener('mouseleave', function() {
      this.style.opacity = '0.8';
    });
  }
  
  // FAQ section
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
  
  // Newsletter subscription in contact page
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  if (newsletterForms.length > 0) {
    newsletterForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitButton = this.querySelector('button[type="submit"]');
        
        if (emailInput && emailInput.value.trim() !== '') {
          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailInput.value)) {
            alert('Please enter a valid email address');
            return;
          }
          
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
});