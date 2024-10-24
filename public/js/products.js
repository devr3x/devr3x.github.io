// Obtener productos del servidor
fetch('/api/products')
    .then(response => response.json())
    .then(products => {
        const container = document.getElementById('products-container');
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p><strong>Precio:</strong> $${product.price}</p>
                <button onclick="addToCart(${product.id})">Agregar al carrito</button>
            `;
            container.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error:', error));

// Función para agregar productos al carrito (en construcción)
function addToCart(productId) {
    alert('Producto agregado al carrito: ' + productId);
}
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
