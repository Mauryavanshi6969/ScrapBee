// Selecting elements
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let buyButton = document.querySelector('.btn-buy');
let shopContent = document.querySelector('.shop-content');
let cartContent = document.querySelector('.cart-content');
let totalElement = document.querySelector('.total-price');

// Open cart
cartIcon.onclick = () => {
    cart.classList.add('active');
};

// Close cart
closeCart.onclick = () => {
    cart.classList.remove('active');
};

// Add item to cart
function addToCart(event) {
    let buttonClicked = event.target;
    let productBox = buttonClicked.parentElement;
    let productTitle = productBox.querySelector('.product-title').innerText;
    let productPrice = productBox.querySelector('.price').innerText;

    // Check if the cart is already full
    if (cartContent.children.length >= 6) {
        showNotification('Cart is full! You cannot add more items.');
        return;
    }

    // Check if the product is already in the cart
    if (isProductInCart(productTitle)) {
        showNotification(`${productTitle} is already in the cart!`);
        return;
    }

    // Create a new cart item
    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-box');
    cartItem.innerHTML = `
        <img src="img/image2.jpg" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${productTitle}</div>
            <div class="cart-price">${productPrice}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
    `;

    // Add the cart item to the cart content
    cartContent.appendChild(cartItem);

    // Update cart total
    updateCartTotal();

    // Show notification
    showNotification(`${productTitle} added to cart!`);
}

// Function to check if the product is already in the cart
function isProductInCart(productTitle) {
    let cartItems = document.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].innerText === productTitle) {
            return true;
        }
    }
    return false;
}

// Add click event listeners to "Add to Cart" buttons
shopContent.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-cart')) {
        addToCart(event);
    }
});

// Buy button click event
buyButton.onclick = () => {
    // Implement your logic for the "Buy Now" functionality
    // For now, let's just clear the cart
    cartContent.innerHTML = '';
    updateCartTotal();
};

// Remove item
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
}

// Add click event listeners to remove buttons
cartContent.addEventListener('click', (event) => {
    if (event.target.classList.contains('cart-remove')) {
        removeCartItem(event);
    }
});

// Calculate and update total price
function updateCartTotal() {
    let cartItems = document.getElementsByClassName('cart-box');
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
        let cartItem = cartItems[i];
        let priceElement = cartItem.querySelector('.cart-price');
        let quantityElement = cartItem.querySelector('.cart-quantity');
        let price = parseFloat(priceElement.innerText.replace('₹', ''));
        let quantity = quantityElement.value;
        total += price * quantity;
    }

    // Update total price in the cart
    totalElement.innerText = '₹' + total.toFixed(2);
}

// Function to show notification
function showNotification(message) {
    // Create a notification element
    let notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    // Append notification to the body
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
// Add click event listener to remove all items
document.querySelector('.remove-all').onclick = () => {
    cartContent.innerHTML = '';
    updateCartTotal();
};
