document.addEventListener('DOMContentLoaded', function() {
  // Checkout page functionality
  
  // Get cart data from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Helper function to format currency
  const formatCurrency = (amount) => {
    return '$' + amount.toFixed(2);
  };
  
  // Update cart summary in checkout
  const updateCheckoutSummary = () => {
    const cartItemsMini = document.getElementById('cart-items-mini');
    const sidebarSubtotal = document.getElementById('sidebar-subtotal');
    const sidebarShipping = document.getElementById('sidebar-shipping');
    const sidebarDiscount = document.getElementById('sidebar-discount');
    const sidebarTax = document.getElementById('sidebar-tax');
    const sidebarTotal = document.getElementById('sidebar-total');
    const sidebarDiscountRow = document.getElementById('sidebar-discount-row');
    
    if (!cartItemsMini || !sidebarSubtotal) return;
    
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      cartHTML += `
        <div class="cart-item-mini">
          <img src="${item.image}" alt="${item.name}" class="cart-item-mini-image">
          <div class="cart-item-mini-details">
            <h3 class="cart-item-mini-title">${item.name}</h3>
            <p class="cart-item-mini-price">${formatCurrency(item.price)}</p>
            <p class="cart-item-mini-quantity">Quantity: ${item.quantity}</p>
          </div>
        </div>
      `;
    });
    
    cartItemsMini.innerHTML = cartHTML;
    
    // Calculate shipping, tax, and total
    const shipping = subtotal > 0 ? 5.99 : 0;
    const discount = 0; // For now, no discount
    const tax = subtotal * 0.08; // Assume 8% tax
    const total = subtotal + shipping + tax - discount;
    
    // Update summary values
    sidebarSubtotal.textContent = formatCurrency(subtotal);
    if (sidebarShipping) sidebarShipping.textContent = formatCurrency(shipping);
    if (sidebarDiscount) sidebarDiscount.textContent = '-' + formatCurrency(discount);
    if (sidebarTax) sidebarTax.textContent = formatCurrency(tax);
    if (sidebarTotal) sidebarTotal.textContent = formatCurrency(total);
    
    // Show/hide discount row
    if (sidebarDiscountRow && discount > 0) {
      sidebarDiscountRow.style.display = 'flex';
    } else if (sidebarDiscountRow) {
      sidebarDiscountRow.style.display = 'none';
    }
    
    // Update order review section
    updateOrderReview(subtotal, shipping, discount, tax, total);
  };
  
  // Update order review section
  const updateOrderReview = (subtotal, shipping, discount, tax, total) => {
    const orderItemsReview = document.getElementById('order-items-review');
    const reviewSubtotal = document.getElementById('review-subtotal');
    const reviewShipping = document.getElementById('review-shipping');
    const reviewDiscount = document.getElementById('review-discount');
    const reviewTax = document.getElementById('review-tax');
    const reviewTotal = document.getElementById('review-total');
    const reviewDiscountRow = document.getElementById('review-discount-row');
    
    if (!orderItemsReview || !reviewSubtotal) return;
    
    let reviewHTML = '';
    
    cart.forEach(item => {
      reviewHTML += `
        <div class="order-item">
          <div class="order-item-name">
            <span>${item.name}</span>
            <span class="order-item-quantity">x${item.quantity}</span>
          </div>
          <div class="order-item-price">${formatCurrency(item.price * item.quantity)}</div>
        </div>
      `;
    });
    
    orderItemsReview.innerHTML = reviewHTML;
    
    // Update review totals
    reviewSubtotal.textContent = formatCurrency(subtotal);
    if (reviewShipping) reviewShipping.textContent = formatCurrency(shipping);
    if (reviewDiscount) reviewDiscount.textContent = '-' + formatCurrency(discount);
    if (reviewTax) reviewTax.textContent = formatCurrency(tax);
    if (reviewTotal) reviewTotal.textContent = formatCurrency(total);
    
    // Show/hide discount row in review
    if (reviewDiscountRow && discount > 0) {
      reviewDiscountRow.style.display = 'flex';
    } else if (reviewDiscountRow) {
      reviewDiscountRow.style.display = 'none';
    }
  };
  
  // Update billing review section
  const updateBillingReview = () => {
    const billingReview = document.getElementById('billing-review');
    if (!billingReview) return;
    
    const firstName = document.getElementById('first-name')?.value || '';
    const lastName = document.getElementById('last-name')?.value || '';
    const company = document.getElementById('company')?.value || '';
    const streetAddress = document.getElementById('street-address')?.value || '';
    const streetAddress2 = document.getElementById('street-address-2')?.value || '';
    const city = document.getElementById('city')?.value || '';
    const state = document.getElementById('state')?.value || '';
    const zip = document.getElementById('zip')?.value || '';
    const country = document.getElementById('country')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const email = document.getElementById('email')?.value || '';
    
    let addressHTML = '';
    
    if (firstName || lastName) {
      addressHTML += `<p>${firstName} ${lastName}</p>`;
    }
    
    if (company) {
      addressHTML += `<p>${company}</p>`;
    }
    
    if (streetAddress) {
      addressHTML += `<p>${streetAddress}</p>`;
    }
    
    if (streetAddress2) {
      addressHTML += `<p>${streetAddress2}</p>`;
    }
    
    if (city || state || zip) {
      let cityStateZip = '';
      if (city) cityStateZip += city;
      if (state) cityStateZip += (city ? ', ' : '') + state;
      if (zip) cityStateZip += ' ' + zip;
      addressHTML += `<p>${cityStateZip}</p>`;
    }
    
    if (country) {
      const countryName = document.querySelector(`#country option[value="${country}"]`)?.textContent || country;
      addressHTML += `<p>${countryName}</p>`;
    }
    
    if (email) {
      addressHTML += `<p>${email}</p>`;
    }
    
    if (phone) {
      addressHTML += `<p>${phone}</p>`;
    }
    
    billingReview.innerHTML = addressHTML;
  };
  
  // Update shipping review section
  const updateShippingReview = () => {
    const shippingReview = document.getElementById('shipping-review');
    if (!shippingReview) return;
    
    const selectedShipping = document.querySelector('input[name="shipping_method"]:checked');
    if (!selectedShipping) return;
    
    const shippingMethod = selectedShipping.value;
    let shippingText = '';
    let shippingCost = '';
    
    switch (shippingMethod) {
      case 'standard':
        shippingText = 'Standard Shipping';
        shippingCost = 'Delivery in 3-5 business days';
        break;
      case 'express':
        shippingText = 'Express Shipping';
        shippingCost = 'Delivery in 2-3 business days';
        break;
      case 'overnight':
        shippingText = 'Overnight Delivery';
        shippingCost = 'Next day delivery (order before 2pm)';
        break;
    }
    
    shippingReview.innerHTML = `
      <p>${shippingText}</p>
      <p>${shippingCost}</p>
      <p>${shippingMethod === 'standard' ? '$5.99' : shippingMethod === 'express' ? '$12.99' : '$19.99'}</p>
    `;
  };
  
  // Update payment review section
  const updatePaymentReview = () => {
    const paymentReview = document.getElementById('payment-review');
    if (!paymentReview) return;
    
    const selectedPayment = document.querySelector('input[name="payment_method"]:checked');
    if (!selectedPayment) return;
    
    const paymentMethod = selectedPayment.value;
    let paymentText = '';
    let paymentDetails = '';
    
    switch (paymentMethod) {
      case 'credit_card':
        paymentText = 'Credit / Debit Card';
        const cardNumber = document.getElementById('card-number')?.value || '';
        const expiryDate = document.getElementById('expiry-date')?.value || '';
        
        if (cardNumber) {
          // Mask all but last 4 digits
          const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
          paymentDetails = `**** **** **** ${lastFour}`;
        }
        
        if (expiryDate) {
          paymentDetails += `<p>Expires: ${expiryDate}</p>`;
        }
        break;
      case 'paypal':
        paymentText = 'PayPal';
        paymentDetails = 'You will be redirected to PayPal to complete your payment.';
        break;
      case 'apple_pay':
        paymentText = 'Apple Pay';
        paymentDetails = 'You will be prompted to confirm your payment with Apple Pay.';
        break;
    }
    
    paymentReview.innerHTML = `
      <p>${paymentText}</p>
      <p>${paymentDetails}</p>
    `;
  };
  
  // Check if cart is empty
  const checkCartEmpty = () => {
    const emptyCheckoutMessage = document.getElementById('empty-checkout-message');
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    
    if (!emptyCheckoutMessage || !checkoutFormContainer) return;
    
    if (cart.length === 0) {
      emptyCheckoutMessage.style.display = 'block';
      checkoutFormContainer.style.display = 'none';
    } else {
      emptyCheckoutMessage.style.display = 'none';
      checkoutFormContainer.style.display = 'block';
    }
  };
  
  // Initialize checkout page
  const initCheckout = () => {
    checkCartEmpty();
    updateCheckoutSummary();
    
    // Set up event listeners
    setupCheckoutForms();
    setupPaymentMethods();
    setupPromoCode();
  };
  
  // Set up checkout forms
  const setupCheckoutForms = () => {
    const billingForm = document.getElementById('billing-form');
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    
    if (billingForm) {
      billingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update billing review
        updateBillingReview();
        
        // Proceed to next step
        const nextStep = document.getElementById('step-shipping');
        const currentStep = document.getElementById('step-billing');
        
        if (nextStep && currentStep) {
          currentStep.classList.remove('active');
          nextStep.classList.add('active');
          
          // Update progress indicator
          const progressSteps = document.querySelectorAll('.progress-step');
          progressSteps.forEach(step => {
            if (step.getAttribute('data-step') === 'billing') {
              step.classList.add('completed');
            }
            if (step.getAttribute('data-step') === 'shipping') {
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
    }
    
    if (shippingForm) {
      shippingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update shipping review
        updateShippingReview();
        
        // Proceed to next step
        const nextStep = document.getElementById('step-payment');
        const currentStep = document.getElementById('step-shipping');
        
        if (nextStep && currentStep) {
          currentStep.classList.remove('active');
          nextStep.classList.add('active');
          
          // Update progress indicator
          const progressSteps = document.querySelectorAll('.progress-step');
          progressSteps.forEach(step => {
            if (step.getAttribute('data-step') === 'shipping') {
              step.classList.add('completed');
            }
            if (step.getAttribute('data-step') === 'payment') {
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
    }
    
    if (paymentForm) {
      paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update payment review
        updatePaymentReview();
        
        // Proceed to next step
        const nextStep = document.getElementById('step-review');
        const currentStep = document.getElementById('step-payment');
        
        if (nextStep && currentStep) {
          currentStep.classList.remove('active');
          nextStep.classList.add('active');
          
          // Update progress indicator
          const progressSteps = document.querySelectorAll('.progress-step');
          progressSteps.forEach(step => {
            if (step.getAttribute('data-step') === 'payment') {
              step.classList.add('completed');
            }
            if (step.getAttribute('data-step') === 'review') {
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
    }
    
    // Back buttons
    const prevButtons = document.querySelectorAll('.prev-step');
    if (prevButtons.length > 0) {
      prevButtons.forEach(button => {
        button.addEventListener('click', function() {
          const prevStepId = this.getAttribute('data-prev');
          const prevStep = document.getElementById(`step-${prevStepId}`);
          const currentStep = this.closest('.checkout-step');
          
          if (prevStep && currentStep) {
            currentStep.classList.remove('active');
            prevStep.classList.add('active');
            
            // Update progress indicator
            const progressSteps = document.querySelectorAll('.progress-step');
            progressSteps.forEach(step => {
              if (step.getAttribute('data-step') === currentStep.id.replace('step-', '')) {
                step.classList.remove('active');
              }
              if (step.getAttribute('data-step') === prevStepId) {
                step.classList.add('active');
                step.classList.remove('completed');
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
    
    // Edit section buttons
    const editButtons = document.querySelectorAll('.edit-section');
    if (editButtons.length > 0) {
      editButtons.forEach(button => {
        button.addEventListener('click', function() {
          const sectionId = this.getAttribute('data-step');
          const section = document.getElementById(`step-${sectionId}`);
          const currentSection = document.querySelector('.checkout-step.active');
          
          if (section && currentSection) {
            currentSection.classList.remove('active');
            section.classList.add('active');
            
            // Update progress indicator
            const progressSteps = document.querySelectorAll('.progress-step');
            progressSteps.forEach(step => {
              const stepId = step.getAttribute('data-step');
              
              if (stepId === sectionId) {
                step.classList.add('active');
                step.classList.remove('completed');
              } else if (getStepIndex(stepId) < getStepIndex(sectionId)) {
                step.classList.add('completed');
                step.classList.remove('active');
              } else {
                step.classList.remove('active');
                step.classList.remove('completed');
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
          
          // Get payment method
          const selectedPayment = document.querySelector('input[name="payment_method"]:checked');
          if (selectedPayment) {
            const paymentMethod = selectedPayment.value;
            let paymentText = '';
            
            switch (paymentMethod) {
              case 'credit_card':
                paymentText = 'Credit / Debit Card';
                break;
              case 'paypal':
                paymentText = 'PayPal';
                break;
              case 'apple_pay':
                paymentText = 'Apple Pay';
                break;
            }
            
            document.getElementById('order-payment-method').textContent = paymentText;
          }
          
          // Get shipping method
          const selectedShipping = document.querySelector('input[name="shipping_method"]:checked');
          if (selectedShipping) {
            const shippingMethod = selectedShipping.value;
            let shippingText = '';
            
            switch (shippingMethod) {
              case 'standard':
                shippingText = 'Standard Shipping';
                break;
              case 'express':
                shippingText = 'Express Shipping';
                break;
              case 'overnight':
                shippingText = 'Overnight Delivery';
                break;
            }
            
            document.getElementById('order-shipping-method').textContent = shippingText;
          }
          
          // Calculate total
          let subtotal = 0;
          cart.forEach(item => {
            subtotal += item.price * item.quantity;
          });
          
          const shipping = subtotal > 0 ? 5.99 : 0;
          const discount = 0; // For now, no discount
          const tax = subtotal * 0.08; // Assume 8% tax
          const total = subtotal + shipping + tax - discount;
          
          document.getElementById('order-total').textContent = formatCurrency(total);
          
          // Reset button state
          placeOrderButton.disabled = false;
          placeOrderButton.textContent = 'Place Order';
          
          // Clear cart after successful order
          localStorage.removeItem('cart');
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
  };
  
  // Set up payment methods
  const setupPaymentMethods = () => {
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
  };
  
  // Set up promo code
  const setupPromoCode = () => {
    const applyPromoButton = document.getElementById('apply-promo');
    const promoCodeInput = document.getElementById('promo-code');
    
    if (applyPromoButton && promoCodeInput) {
      applyPromoButton.addEventListener('click', function() {
        const promoCode = promoCodeInput.value.trim().toUpperCase();
        
        if (promoCode === 'SALE20') {
          // Apply 20% discount
          alert('Promo code applied: 20% discount');
          
          // In a real implementation, you would store the promo in localStorage
          // and apply the discount in the cart calculations
          
          // For this demo, we'll just show an alert
        } else {
          alert('Invalid promo code');
        }
      });
    }
  };
  
  // Call initialization function
  initCheckout();
});