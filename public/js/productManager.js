document.getElementById('manage-products').addEventListener('click', () => {
    document.getElementById('manage-products-container').style.display = 'block';
    // Lógica para cargar los productos desde la API
    loadProducts();
});

async function loadProducts() {
    const response = await fetch('http://localhost:3000/api/products'); // Cambia la URL a tu API
    const products = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar la lista antes de cargar nuevos productos
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.textContent = product.name; // Ajusta según tu estructura de datos
        productList.appendChild(productDiv);
    });
}

document.getElementById('add-product').addEventListener('click', () => {
    // Lógica para agregar un nuevo producto (puedes abrir un formulario modal aquí)
    const newProduct = { name: "Nuevo Producto" }; // Ejemplo de un nuevo producto
    fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
    }).then(() => loadProducts());
});
