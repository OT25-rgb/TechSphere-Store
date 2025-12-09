// Application Data
const products = [
    {id: 1, name: "UltraPro Smartphone X", category: "smartphones", price: 899.99, description: "Latest flagship with 5G, 128GB storage, and triple camera system.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"},
    {id: 2, name: "ProBook Laptop", category: "laptops", price: 1299.99, description: "Powerful laptop with 16GB RAM, 1TB SSD, and dedicated graphics.", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"},
    {id: 3, name: "NoiseCancel Pro", category: "audio", price: 249.99, description: "Wireless headphones with active noise cancellation and 30h battery.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"},
    {id: 4, name: "SmartFit Watch 4", category: "wearables", price: 299.99, description: "Advanced smartwatch with health monitoring and GPS tracking.", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"},
    {id: 5, name: "UltraView 4K TV", category: "tv", price: 799.99, description: "55-inch 4K Ultra HD Smart TV with HDR and voice control.", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"},
    {id: 6, name: "GameMaster Pro", category: "gaming", price: 499.99, description: "Gaming console with 1TB storage and VR ready capability.", image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"},
    {id: 7, name: "TabPlus Tablet", category: "tablets", price: 449.99, description: "10-inch tablet with stylus support and 128GB storage.", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"},
    {id: 8, name: "ProShot Camera", category: "cameras", price: 999.99, description: "Mirrorless camera with 24MP sensor and 4K video recording.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"}
];

// Cart functionality
let cart = [];
let currentCategory = 'all';

// DOM Elements
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.querySelector('.cart-count');
const notification = document.getElementById('notification');
const searchBox = document.getElementById('search-box');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');

// Initialize the application
function initApp() {
    // Load products
    renderProducts('home');
    renderProducts('products');
    
    // Initialize cart with demo items
    cart = [
        {id: 1, name: "UltraPro Smartphone X", price: 899.99, quantity: 1, image: products[0].image},
        {id: 2, name: "ProBook Laptop", price: 1299.99, quantity: 1, image: products[1].image}
    ];
    updateCartCount();
    renderCartItems();
    updateCartTotal();
    
    // Setup event listeners
    setupEventListeners();
    
    // Start sale timer
    startSaleTimer();
}

// Setup all event listeners
function setupEventListeners() {
    // Cart functionality
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);
    
    // Search functionality
    searchBox.addEventListener('input', handleSearch);
    
    // Form submissions
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showPage(page);
        });
    });
    
    // Email links - Show notification but don't prevent default behavior
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            showNotification("Opening email client...", 'info');
        });
    });
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected page
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate the corresponding nav link
        const activeLink = document.querySelector(`.nav-link[onclick*="'${pageId}'"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Show notification for certain pages
        if (pageId !== 'home') {
            showNotification(`Navigated to ${pageId.charAt(0).toUpperCase() + pageId.slice(1)} page`, 'info');
        }
    }
}

// Render products
function renderProducts(pageId) {
    let container;
    let productsToShow = products;
    
    if (pageId === 'home') {
        container = document.getElementById('home-products');
        productsToShow = products.slice(0, 4); // Only show 4 products on home
    } else {
        container = document.getElementById('products-grid');
    }
    
    if (!container) return;
    
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn-add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-view" onclick="viewProductDetails(${product.id})">View Details</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if item is already in cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        // Increase quantity if item already exists
        cart[existingItemIndex].quantity++;
        showNotification(`${product.name} quantity increased`, 'success');
    } else {
        // Add new item to cart
        cart.push({...product, quantity: 1});
        showNotification(`${product.name} added to cart`, 'success');
    }
    
    updateCartCount();
    renderCartItems();
    updateCartTotal();
}

// Render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Update cart quantity
function updateCartQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        // Remove item if quantity becomes 0
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
            showNotification("Item removed from cart", 'info');
        }
        
        updateCartCount();
        renderCartItems();
        updateCartTotal();
    }
}

// Remove from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        const itemName = cart[itemIndex].name;
        cart.splice(itemIndex, 1);
        updateCartCount();
        renderCartItems();
        updateCartTotal();
        showNotification(`${itemName} removed from cart`, 'info');
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Open cart
function openCart() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
}

// Close cart
function closeCart() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification("Your cart is empty!", 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Checkout successful! Total: $${total.toFixed(2)}`, 'success');
    cart = [];
    updateCartCount();
    renderCartItems();
    updateCartTotal();
    closeCart();
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    showPage('products');
    
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn-add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-view" onclick="viewProductDetails(${product.id})">View Details</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    showNotification(`Showing ${category} products`, 'info');
}

// View product details
function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showNotification(`Viewing details for ${product.name}`, 'info');
        // In a real app, this would open a product detail page/modal
        // For now, we'll just show a notification
    }
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length < 2) return;
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    // Update both product grids
    updateProductGrids(filteredProducts);
}

// Update product grids with search results
function updateProductGrids(filteredProducts) {
    // Update home products grid
    const homeGrid = document.getElementById('home-products');
    if (homeGrid) {
        homeGrid.innerHTML = '';
        filteredProducts.slice(0, 4).forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn-add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                        <button class="btn-view" onclick="viewProductDetails(${product.id})">View Details</button>
                    </div>
                </div>
            `;
            homeGrid.appendChild(productCard);
        });
    }
    
    // Update products page grid
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = '';
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn-add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                        <button class="btn-view" onclick="viewProductDetails(${product.id})">View Details</button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
    }
}

// Send email function - simple mailto: redirect
function sendEmail() {
    const userEmail = "otungaallanhenry256@gmail.com";
    const emailSubject = encodeURIComponent("Inquiry from TechSphere");
    const emailBody = encodeURIComponent("Hello,\n\nI would like to get more information about your products/services.\n\nBest regards,");
    
    window.location.href = `mailto:${userEmail}?subject=${emailSubject}&body=${emailBody}`;
    showNotification("Opening email client...", 'info');
}

// Handle contact form submission with Formspree or mailto fallback
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Check if form has Formspree action
    const form = e.target;
    const hasFormspree = form.action && form.action.includes('formspree.io');
    
    if (hasFormspree) {
        // Use Formspree backend
        const formData = new FormData(form);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showNotification("Thank you for your message! We'll get back to you soon.", 'success');
                form.reset();
            } else {
                // Fallback to mailto if Formspree fails
                const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nThis message was sent from TechSphere contact form.`);
                window.location.href = `mailto:otungaallanhenry256@gmail.com?subject=Contact Form: ${encodeURIComponent(subject)}&body=${mailtoBody}`;
            }
        })
        .catch(error => {
            // Fallback to mailto on network error
            const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nThis message was sent from TechSphere contact form.`);
            window.location.href = `mailto:otungaallanhenry256@gmail.com?subject=Contact Form: ${encodeURIComponent(subject)}&body=${mailtoBody}`;
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    } else {
        // Use mailto method
        const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nThis message was sent from TechSphere contact form.`);
        window.location.href = `mailto:otungaallanhenry256@gmail.com?subject=Contact Form: ${encodeURIComponent(subject)}&body=${mailtoBody}`;
        showNotification("Opening email client to send your message...", 'info');
        form.reset();
    }
}

// Handle newsletter subscription
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification(`Thank you for subscribing with ${email}!`, 'success');
        e.target.reset();
    }
}

// Make phone call
function makePhoneCall() {
    const phoneNumber = "+256779979629";
    showNotification(`Calling ${phoneNumber}...`, 'info');
    // In a real app on mobile, this would trigger the phone dialer
    // window.location.href = `tel:${phoneNumber}`;
}

// Show notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type);
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Start sale timer
function startSaleTimer() {
    let hours = 24;
    let minutes = 59;
    let seconds = 59;
    
    const timerInterval = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    clearInterval(timerInterval);
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                }
            }
        }
        
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', initApp);