// Global Cart Management using LocalStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => el.textContent = cartItems.length);
}

function addToCart(itemName, itemPrice) {
    cartItems.push({ name: itemName, price: itemPrice });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    
    // UI Animation for cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2) rotate(10deg)';
        cartIcon.style.color = 'var(--primary-color)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1) rotate(0)';
            cartIcon.style.color = '#333';
        }, 300);
    }

    // Modern notification (Toast-like)
    showToast(`${itemName} added to cart!`);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #333;
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateY(100px);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Initial count update
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Auto-setup observer for products if elements exist
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});

// Scroll Effect for Nav
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = '0.8rem 5%';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.padding = '1.5rem 5%';
        nav.style.background = '#ffffff';
    }
});
