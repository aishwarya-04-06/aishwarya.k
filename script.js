let cart = [];

// Sample products with names, images, and prices
const products = [
    { 
        title: "Nike Air Zoom", 
        price: 5000, 
        rating: 4.5, 
        image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/20547d52-3e1b-4c3d-b917-f0d7e0eb8bdf/custom-nike-air-force-1-low-by-you-shoes.png" 
    },
    { 
        title: "Adidas Ultraboost", 
        price: 8000, 
        rating: 4.7, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4biV66-P7Or8T-qEUNxINd9VHb60eZjTt-Q&s" 
    },
    { 
        title: "Puma RS-X", 
        price: 6500, 
        rating: 4.6, 
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/391928/01/sv01/fnd/IND/fmt/png/RS-X-Triple-Unisex-Sneakers" 
    },
    { 
        title: "New Balance 574", 
        price: 12000, 
        rating: 4.8, 
        image: "https://nb.scene7.com/is/image/NB/ml574egg_nb_02_i?$pdpflexf2$&wid=880&hei=880" 
    }
];

// Render products on page load
renderProducts(products);

// Function to render products on the page
function renderProducts(products) {
    const productContainer = document.querySelector('.products');
    productContainer.innerHTML = '';
    products.forEach((product, index) => {
        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <p>${product.title}</p>
                <p>★ ${product.rating}</p>
                <p>₹${product.price}</p>
                <button class="add-to-cart" data-index="${index}">Add to Cart</button>
            </div>
        `;
    });
    setAddToCartListeners();
}

// Add product to cart
function addToCart(product) {
    const existingItemIndex = cart.findIndex(item => item.title === product.title);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    renderCart();
}

// Render cart items
function renderCart() {
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <p>${item.title}</p>
                <p>₹${item.price}</p>
                <div class="quantity">
                    <button class="decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <button class="delete-item" data-index="${index}">&times;</button>
            </div>
        `;
    });
    setCartListeners();
    calculatePriceDetails();
}

// Delete item from cart
function deleteCartItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Increase/Decrease quantity of items in the cart
function changeItemQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        deleteCartItem(index);
    }
    renderCart();
}

// Calculate total price details
function calculatePriceDetails() {
    let totalMRP = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let discount = 50; // Sample discount
    let platformFee = 10;
    let shippingCharges = 20;
    let totalAmount = totalMRP - discount + platformFee + shippingCharges;

    const priceDetailsContainer = document.querySelector('.price-details');
    priceDetailsContainer.innerHTML = `
        <h3>Price Details</h3>
        <p>Total MRP: ₹${totalMRP}</p>
        <p>Coupon Discount: ₹${discount}</p>
        <p>Platform Fee: ₹${platformFee}</p>
        <p>Shipping Charges: ₹${shippingCharges}</p>
        <h4>Total Amount: ₹${totalAmount}</h4>
        <button class="place-order">Place Order</button>
    `;
    setOrderListener();
}

// Set listeners for add-to-cart buttons
function setAddToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productIndex = e.target.getAttribute('data-index');
            addToCart(products[productIndex]);
        });
    });
}

// Set listeners for cart item actions (increase, decrease, delete)
function setCartListeners() {
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const deleteButtons = document.querySelectorAll('.delete-item');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            changeItemQuantity(index, -1);
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            changeItemQuantity(index, 1);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteCartItem(index);
        });
    });
}

// Place order handler
function placeOrder() {
    if (cart.length > 0) {
        alert('Order placed successfully!');
        cart = []; // Clear the cart after placing the order
        renderCart(); // Refresh the cart view
    } else {
        alert('Your cart is empty.');
    }
}

// Set listener for the place order button
function setOrderListener() {
    const placeOrderButton = document.querySelector('.place-order');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', placeOrder);
    }
}
