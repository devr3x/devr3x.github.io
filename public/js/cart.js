// Carrito en memoria
let cart = [];

// Función para agregar productos al carrito
function addToCart(productId) {
    // Simular agregar al carrito
    cart.push(productId);
    alert('Producto agregado al carrito');
    updateCartDisplay();
}

// Mostrar los productos en el carrito
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-container');
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Tu carrito está vacío</p>';
    } else {
        cartContainer.innerHTML = '<ul>' + cart.map(id => `<li>Producto ID: ${id}</li>`).join('') + '</ul>';
    }
}

// Lógica para proceder al pago
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('El carrito está vacío');
    } else {
        alert('Procesando compra...');
        cart = [];
        updateCartDisplay();
    }
});
// Obtener el token almacenado
const token = localStorage.getItem('token');

// Agregar producto al carrito
function addToCart(productId) {
    fetch('/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        updateCartDisplay();
    })
    .catch(error => console.error('Error:', error));
}

// Obtener productos del carrito y mostrarlos
function updateCartDisplay() {
    fetch('/api/cart', {
        headers: {
            'Authorization': token
        }
    })
    .then(response => response.json())
    .then(cart => {
        const cartContainer = document.getElementById('cart-container');
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Tu carrito está vacío</p>';
        } else {
            cartContainer.innerHTML = '<ul>' + cart.map(id => `<li>Producto ID: ${id}</li>`).join('') + '</ul>';
        }
    })
    .catch(error => console.error('Error:', error));
}

// Realizar el checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'Authorization': token
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        updateCartDisplay();
    })
    .catch(error => console.error('Error:', error));
});

// Cargar el carrito al cargar la página
updateCartDisplay();
