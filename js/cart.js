document.addEventListener('DOMContentLoaded', function() {
  // Cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-modal');
  const cartCount = document.querySelector('.cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartItemsDropdown = document.getElementById('cart-items');
  const subtotalAmount = document.querySelector('.subtotal-amount');
  
  // Cart page elements
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartItemsList = document.getElementById('cart-items-list');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartSummary = document.getElementById('cart-summary');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartShipping = document.getElementById('cart-shipping');
  const cartDiscount = document.getElementById('cart-discount');
  const cartTotal = document.getElementById('cart-total');
  const discountRow = document.getElementById('discount-row');
  
  // Checkout page elements
  const cartItemsMini = document.getElementById('cart-items-mini');
  const emptyCheckoutMessage = document.getElementById('empty-checkout-message');
  const checkoutFormContainer = document.getElementById('checkout-form-container');
  const sidebarSubtotal = document.getElementById('sidebar-subtotal');
  const sidebarShipping = document.getElementById('sidebar-shipping');
  const sidebarDiscount = document.getElementById('sidebar-discount');
  const sidebarTax = document.getElementById('sidebar-tax');
  const sidebarTotal = document.getElementById('sidebar-total');
  const sidebarDiscountRow = document.getElementById('sidebar-discount-row');
  const orderItemsReview = document.getElementById('order-items-review');
  const reviewSubtotal = document.getElementById('review-subtotal');
  const reviewShipping = document.getElementById('review-shipping');
  const reviewDiscount = document.getElementById('review-discount');
  const reviewTax = document.getElementById('review-tax');
  const reviewTotal = document.getElementById('review-total');
  const reviewDiscountRow = document.getElementById('review-discount-row');
  
  // Load cart data from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Helper function to format currency
  const formatCurrency = (amount) => {
    return '$' + amount.toFixed(2);
  };
  
  // Helper function to calculate cart total
  const calculateCartTotal = () => {
    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.price * item.quantity;
    });
    return subtotal;
  };
  
  // Update cart count
  const updateCartCount = () => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
      cartCount.textContent = count;
      
      // Add animation class
      cartCount.classList.add('animate');
      
      // Remove animation class after it completes
      setTimeout(() => {
        cartCount.classList.remove('animate');
      }, 500);
    }
  };
  
  // Update dropdown cart
  const updateDropdownCart = () => {
    if (!cartItemsDropdown) return;
    
    if (cart.length === 0) {
      cartItemsDropdown.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      if (subtotalAmount) {
        subtotalAmount.textContent = '$0.00';
      }
      return;
    }
    
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      cartHTML += `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h3 class="cart-item-title">${item.name}</h3>
            <p class="cart-item-price">${formatCurrency(item.price)} x ${item.quantity}</p>
            <div class="cart-item-quantity">
              <button class="cart-item-remove" data-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    });
    
    cartItemsDropdown.innerHTML = cartHTML;
    
    if (subtotalAmount) {
      subtotalAmount.textContent = formatCurrency(subtotal);
    }
    
    // Add event listeners to remove buttons
    const removeButtons = cartItemsDropdown.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const itemId = this.getAttribute('data-id');
        removeFromCart(itemId);
      });
    });
  };
  
  // Update cart page
  const updateCartPage = () => {
    if (!cartItemsContainer || !cartItemsList || !emptyCartMessage || !cartSummary) return;
    
    if (cart.length === 0) {
      cartItemsContainer.style.display = 'none';
      cartSummary.style.display = 'none';
      emptyCartMessage.style.display = 'block';
      return;
    }
    
    emptyCartMessage.style.display = 'none';
    cartItemsContainer.style.display = 'block';
    cartSummary.style.display = 'block';
    
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      cartHTML += `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-product">
            <img src="${item.image}" alt="${item.name}" class="cart-product-image">
            <div class="cart-product-details">
              <h3>${item.name}</h3>
              <p>${item.color}, ${item.size}</p>
            </div>
          </div>
          <div class="cart-price">${formatCurrency(item.price)}</div>
          <div class="cart-quantity">
            <button class="quantity-decrease cart-quantity-decrease" data-id="${item.id}">-</button>
            <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" max="10" data-id="${item.id}">
            <button class="quantity-increase cart-quantity-increase" data-id="${item.id}">+</button>
          </div>
          <div class="cart-subtotal">${formatCurrency(itemTotal)}</div>
          <button class="cart-remove" data-id="${item.id}"><i class="fas fa-times"></i></button>
        </div>
      `;
    });
    
    cartItemsList.innerHTML = cartHTML;
    
    // Calculate shipping and total
    const shipping = subtotal > 0 ? 5.99 : 0;
    const discount = 0; // For now, no discount
    const total = subtotal + shipping - discount;
    
    // Update summary values
    if (cartSubtotal) cartSubtotal.textContent = formatCurrency(subtotal);
    if (cartShipping) cartShipping.textContent = formatCurrency(shipping);
    if (cartDiscount) cartDiscount.textContent = '-' + formatCurrency(discount);
    if (cartTotal) cartTotal.textContent = formatCurrency(total);
    
    // Show/hide discount row
    if (discountRow && discount > 0) {
      discountRow.style.display = 'flex';
    } else if (discountRow) {
      discountRow.style.display = 'none';
    }
    
    // Add event listeners to quantity buttons and inputs
    const decreaseButtons = cartItemsList.querySelectorAll('.cart-quantity-decrease');
    const increaseButtons = cartItemsList.querySelectorAll('.cart-quantity-increase');
    const quantityInputs = cartItemsList.querySelectorAll('.cart-quantity-input');
    const removeButtons = cartItemsList.querySelectorAll('.cart-remove');
    
    decreaseButtons.forEach(button => {
      button.addEventListener('click', function() {
        const itemId = this.getAttribute('data-id');
        updateCartItemQuantity(itemId, 'decrease');
      });
    });
    
    increaseButtons.forEach(button => {
      button.addEventListener('click', function() {
        const itemId = this.getAttribute('data-id');
        updateCartItemQuantity(itemId, 'increase');
      });
    });
    
    quantityInputs.forEach(input => {
      input.addEventListener('change', function() {
        const itemId = this.getAttribute('data-id');
        const quantity = parseInt(this.value);
        
        if (quantity > 0 && quantity <= 10) {
          updateCartItemQuantity(itemId, 'set', quantity);
        } else if (quantity > 10) {
          this.value = 10;
          updateCartItemQuantity(itemId, 'set', 10);
        } else {
          this.value = 1;
          updateCartItemQuantity(itemId, 'set', 1);
        }
      });
    });
    
    removeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const itemId = this.getAttribute('data-id');
        removeFromCart(itemId);
      });
    });
  };
  
  // Update checkout page
  const updateCheckoutPage = () => {
    if (!cartItemsMini || !emptyCheckoutMessage || !checkoutFormContainer) return;
    
    if (cart.length === 0) {
      if (emptyCheckoutMessage) emptyCheckoutMessage.style.display = 'block';
      if (checkoutFormContainer) checkoutFormContainer.style.display = 'none';
      return;
    }
    
    if (emptyCheckoutMessage) emptyCheckoutMessage.style.display = 'none';
    if (checkoutFormContainer) checkoutFormContainer.style.display = 'block';
    
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
    
    if (cartItemsMini) cartItemsMini.innerHTML = cartHTML;
    
    // Calculate shipping, tax, and total
    const shipping = subtotal > 0 ? 5.99 : 0;
    const discount = 0; // For now, no discount
    const tax = subtotal * 0.08; // Assume 8% tax
    const total = subtotal + shipping + tax - discount;
    
    // Update sidebar summary values
    if (sidebarSubtotal) sidebarSubtotal.textContent = formatCurrency(subtotal);
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
    if (orderItemsReview) {
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
    }
    
    // Update review totals
    if (reviewSubtotal) reviewSubtotal.textContent = formatCurrency(subtotal);
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
  
  // Add item to cart
  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.id === item.id && 
      cartItem.color === item.color && 
      cartItem.size === item.size
    );
    
    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      cart[existingItemIndex].quantity += item.quantity;
      
      // Cap quantity at 10
      if (cart[existingItemIndex].quantity > 10) {
        cart[existingItemIndex].quantity = 10;
      }
    } else {
      // Item doesn't exist, add it
      cart.push(item);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    updateCartCount();
    updateDropdownCart();
    updateCartPage();
    updateCheckoutPage();
  };
  
  // Remove item from cart
  const removeFromCart = (itemId) => {
    cart = cart.filter(item => item.id !== itemId);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    updateCartCount();
    updateDropdownCart();
    updateCartPage();
    updateCheckoutPage();
  };
  
  // Update cart item quantity
  const updateCartItemQuantity = (itemId, action, quantity) => {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      switch (action) {
        case 'increase':
          if (cart[itemIndex].quantity < 10) {
            cart[itemIndex].quantity++;
          }
          break;
        case 'decrease':
          if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
          }
          break;
        case 'set':
          cart[itemIndex].quantity = quantity;
          break;
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart UI
      updateCartCount();
      updateDropdownCart();
      updateCartPage();
      updateCheckoutPage();
    }
  };
  
  // Add event listeners to "Add to Cart" buttons
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        let productTitle, productPrice, productImage;
        
        if (productId === 'featured') {
          // Featured product on homepage
          productTitle = document.querySelector('.featured-product .product-details h3').textContent;
          productPrice = parseFloat(document.querySelector('.featured-product .product-price').textContent.replace('$', ''));
          productImage = document.getElementById('main-product-image').src;
        } else {
          // Product in the products grid
          const productCard = this.closest('.product-card');
          productTitle = productCard.querySelector('.product-title').textContent;
          
          const priceElement = productCard.querySelector('.product-price');
          const priceText = priceElement.textContent;
          const oldPriceElement = priceElement.querySelector('.old-price');
          
          if (oldPriceElement) {
            // There's a sale price
            productPrice = parseFloat(priceText.replace(oldPriceElement.textContent, '').replace('$', '').trim());
          } else {
            productPrice = parseFloat(priceText.replace('$', ''));
          }
          
          productImage = productCard.querySelector('.product-image img').src;
        }
        
        // Get selected color and size
        let selectedColor = 'Black'; // Default
        let selectedSize = 'M'; // Default
        
        const colorOptions = document.querySelectorAll('.color-option');
        if (colorOptions.length > 0) {
          const activeColor = document.querySelector('.color-option.active');
          if (activeColor) {
            selectedColor = activeColor.getAttribute('data-color');
          }
        }
        
        const sizeOptions = document.querySelectorAll('.size-option');
        if (sizeOptions.length > 0) {
          const activeSize = document.querySelector('.size-option.active');
          if (activeSize) {
            selectedSize = activeSize.getAttribute('data-size');
          }
        }
        
        // Get quantity
        let quantity = 1;
        const quantityInput = this.closest('.product-details')?.querySelector('#quantity') || 
                              this.closest('.modal-body')?.querySelector('.modal-quantity');
        
        if (quantityInput) {
          quantity = parseInt(quantityInput.value);
        }
        
        // Create item object
        const item = {
          id: productId,
          name: productTitle,
          price: productPrice,
          image: productImage,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity
        };
        
        // Add to cart
        addToCart(item);
        
        // Provide visual feedback
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
  
  // Initialize cart on page load
  updateCartCount();
  updateDropdownCart();
  updateCartPage();
  updateCheckoutPage();
  
  // Apply coupon code
  const applyCouponButton = document.getElementById('apply-coupon');
  const couponCodeInput = document.getElementById('coupon-code');
  
  if (applyCouponButton && couponCodeInput) {
    applyCouponButton.addEventListener('click', function() {
      const couponCode = couponCodeInput.value.trim().toUpperCase();
      
      if (couponCode === 'SALE20') {
        // Apply 20% discount
        alert('Coupon applied: 20% discount');
        
        // In a real implementation, you would store the coupon in localStorage
        // and apply the discount in the cart calculations
        
        // For this demo, we'll just show an alert
      } else {
        alert('Invalid coupon code');
      }
    });
  }
  
  // Apply promo code in checkout
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
  
  // Update cart button
  const updateCartButton = document.getElementById('update-cart');
  
  if (updateCartButton) {
    updateCartButton.addEventListener('click', function() {
      alert('Cart updated');
      
      // In a real implementation, you would sync the cart with the server
      
      // For this demo, we'll just show an alert
    });
  }
});