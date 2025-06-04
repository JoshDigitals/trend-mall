document.addEventListener('DOMContentLoaded', function() {
  // Search functionality
  const searchTrigger = document.querySelector('.search-trigger');
  const searchPopup = document.querySelector('.search-popup');
  const closeSearch = document.querySelector('.close-search');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchForm = document.querySelector('.search-form');
  
  // Sample product data for search
  const products = [
    { id: 1, title: 'Classic Denim Jacket', category: 'Jackets', price: '$89.99', image: 'https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=1' },
    { id: 2, title: 'Elegant White Blouse', category: 'Tops', price: '$59.99', image: 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=2' },
    { id: 3, title: 'Slim Fit Jeans', category: 'Bottoms', price: '$64.99', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=3' },
    { id: 4, title: 'Floral Summer Dress', category: 'Dresses', price: '$75.99', image: 'https://images.pexels.com/photos/2531156/pexels-photo-2531156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=4' },
    { id: 5, title: 'Leather Biker Jacket', category: 'Jackets', price: '$129.99', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=5' },
    { id: 6, title: 'Casual Button-down Shirt', category: 'Tops', price: '$49.99', image: 'https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=6' },
    { id: 7, title: 'Striped T-Shirt', category: 'Tops', price: '$34.99', image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=7' },
    { id: 8, title: 'High-Waisted Shorts', category: 'Bottoms', price: '$45.99', image: 'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=8' },
    { id: 9, title: 'Maxi Sundress', category: 'Dresses', price: '$85.99', image: 'https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=9' },
    { id: 10, title: 'Oversized Sweater', category: 'Tops', price: '$69.99', image: 'https://images.pexels.com/photos/2621967/pexels-photo-2621967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=10' },
    { id: 11, title: 'Ripped Skinny Jeans', category: 'Bottoms', price: '$79.99', image: 'https://images.pexels.com/photos/2343661/pexels-photo-2343661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=11' },
    { id: 12, title: 'Hooded Parka', category: 'Jackets', price: '$149.99', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', url: 'product-detail.html?id=12' }
  ];
  
  // Open search popup
  if (searchTrigger && searchPopup) {
    searchTrigger.addEventListener('click', function() {
      searchPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus the search input after a short delay (for animation)
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 300);
    });
  }
  
  // Close search popup
  if (closeSearch && searchPopup) {
    closeSearch.addEventListener('click', function() {
      searchPopup.classList.remove('active');
      document.body.style.overflow = '';
      
      // Clear search results
      if (searchResults) searchResults.innerHTML = '';
      if (searchInput) searchInput.value = '';
    });
    
    // Close search popup when clicking outside the content
    searchPopup.addEventListener('click', function(e) {
      if (e.target === searchPopup) {
        searchPopup.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear search results
        if (searchResults) searchResults.innerHTML = '';
        if (searchInput) searchInput.value = '';
      }
    });
    
    // Close search popup on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchPopup.classList.contains('active')) {
        searchPopup.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear search results
        if (searchResults) searchResults.innerHTML = '';
        if (searchInput) searchInput.value = '';
      }
    });
  }
  
  // Search input functionality
  if (searchInput && searchResults) {
    // Live search as user types
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }
      
      performSearch(query);
    });
    
    // Search on form submission
    if (searchForm) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length < 2) {
          return;
        }
        
        performSearch(query);
      });
    }
  }
  
  // Perform search and display results
  function performSearch(query) {
    // Filter products based on query
    const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.category.toLowerCase().includes(query)
    );
    
    // Display results
    if (filteredProducts.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results">
          <p>No products found matching "${query}".</p>
          <p>Try checking your spelling or using more general terms.</p>
        </div>
      `;
      return;
    }
    
    let resultsHTML = '';
    
    filteredProducts.forEach(product => {
      resultsHTML += `
        <a href="${product.url}" class="search-result">
          <img class="search-result-image" src="${product.image}" alt="${product.title}">
          <div class="search-result-details">
            <h3 class="search-result-title">${highlightQuery(product.title, query)}</h3>
            <p class="search-result-category">${product.category}</p>
            <p class="search-result-price">${product.price}</p>
          </div>
        </a>
      `;
    });
    
    searchResults.innerHTML = resultsHTML;
    
    // Add animation to search results
    const results = searchResults.querySelectorAll('.search-result');
    results.forEach((result, index) => {
      result.style.animationDelay = `${index * 0.05}s`;
      result.classList.add('fade-in');
    });
  }
  
  // Highlight matching query in search results
  function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
  
  // Sidebar search functionality (for blog and other pages)
  const sidebarSearchForms = document.querySelectorAll('.sidebar-search');
  
  if (sidebarSearchForms.length > 0) {
    sidebarSearchForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchInput = this.querySelector('input');
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length < 2) {
          return;
        }
        
        // In a real implementation, this would redirect to a search results page
        // For this demo, we'll just show an alert
        alert(`Searching for "${query}"`);
      });
    });
  }
});