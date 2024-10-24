// panel.js

// Función principal que se ejecuta al cargar la página
window.onload = function() {
    loadNavbar(); // Cargar la barra de navegación
};

// Función para cargar el navbar
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        if (!response.ok) {
            throw new Error(`Error al cargar el navbar: ${response.statusText}`);
        }
        const navbarHtml = await response.text();
        document.getElementById('navbar-container').innerHTML = navbarHtml;

        initialize(); // Inicializar después de cargar el navbar
    } catch (error) {
        console.error('Error cargando el navbar:', error);
    }
}

// Función para inicializar el panel
function initialize() {
    const userNameElement = document.getElementById('user-name');
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Mostrar el nombre de usuario si existe
    if (user && token) {
        userNameElement.textContent = user.username; // Establece el nombre de usuario

        // Agregar etiqueta de admin si corresponde
        if (role === 'admin') {
            const adminTag = document.createElement('span');
            adminTag.className = 'admin-tag';
            adminTag.textContent = 'Admin';
            userNameElement.appendChild(adminTag); // Agregar etiqueta al nombre
        }

        // Verifica el rol del usuario
        checkUserRole(role);
    } else {
        window.location.href = 'index.html'; // Redirigir si no hay sesión
    }

    // Asignar eventos a los botones
    assignEventListeners();
}

// Verifica el rol del usuario y muestra/oculta elementos según corresponda
function checkUserRole(role) {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        if (role === 'admin') {
            adminPanel.style.display = 'block'; // Mostrar el panel de control
        } else {
            adminPanel.style.display = 'none'; // Ocultar el panel
            alert("No tienes permiso para acceder al panel de control."); // Avisar al usuario no admin
            window.location.href = 'home.html'; // Redirigir a la página de inicio
        }
    } else {
        console.error("Elemento 'admin-panel' no encontrado en el DOM.");
    }
}

// Asignar eventos a los botones
function assignEventListeners() {
    const loadUsersBtn = document.getElementById('load-users-btn');
    const loadProductsBtn = document.getElementById('load-products-btn');
    const addUserBtn = document.getElementById('add-user-btn');
    const addProductBtn = document.getElementById('add-product-btn');
    const closeModalBtn = document.getElementById('close-modal');

    // Asignar eventos a cada botón
    if (loadUsersBtn) {
        loadUsersBtn.addEventListener('click', loadUsers);
    } else {
        console.error("Elemento 'load-users-btn' no encontrado en el DOM.");
    }

    if (loadProductsBtn) {
        loadProductsBtn.addEventListener('click', loadProducts);
    } else {
        console.error("Elemento 'load-products-btn' no encontrado en el DOM.");
    }

    if (addUserBtn) {
        addUserBtn.addEventListener('click', addUser);
    } else {
        console.error("Elemento 'add-user-btn' no encontrado en el DOM.");
    }

    if (addProductBtn) {
        addProductBtn.addEventListener('click', addProduct);
    } else {
        console.error("Elemento 'add-product-btn' no encontrado en el DOM.");
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.style.display = 'none'; // Cerrar el modal
            } else {
                console.error("Elemento 'overlay' no encontrado en el DOM.");
            }
        });
    } else {
        console.error("Elemento 'close-modal' no encontrado en el DOM.");
    }
}

// Cargar usuarios
async function loadUsers() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error cargando usuarios:', error);
        showErrorModal('Error al cargar los usuarios');
    }
}

// Mostrar usuarios en el panel
function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Limpiar contenido previo

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `ID: ${user._id}, Nombre: ${user.username} - Rol: `;

        const roleSelect = document.createElement('select');
        const roles = ['admin', 'user']; // Lista de roles

        roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role;
            option.textContent = role.charAt(0).toUpperCase() + role.slice(1);
            if (role === user.role) {
                option.selected = true;
            }
            roleSelect.appendChild(option);
        });

        // Añadir evento al seleccionar un nuevo rol
        roleSelect.addEventListener('change', async () => {
            await updateUserRole(user._id, roleSelect.value);
        });

        li.appendChild(roleSelect);
        userList.appendChild(li);
    });
}

async function updateUserRole(userId, newRole) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}/role`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });

        if (!response.ok) {
            const errorResponse = await response.text(); // Obtén el cuerpo de la respuesta
            throw new Error(`Error: ${response.status} - ${errorResponse}`); // Muestra el error
        }

        showModal('Éxito', 'Rol actualizado correctamente.');
    } catch (error) {
        console.error('Error actualizando rol:', error);
        showErrorModal('Error al actualizar el rol');
    }
}

// Mostrar un modal de error
function showErrorModal(message) {
    const overlay = document.getElementById('overlay');
    const errorMessageElement = document.getElementById('modal-message');

    errorMessageElement.textContent = message;
    overlay.style.display = 'flex'; // Mostrar el modal de error
}

// Cargar productos
async function loadProducts() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error cargando productos:', error);
        showErrorModal('Error al cargar los productos');
    }
}

// Mostrar productos en el panel
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar contenido previo

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `ID: ${product._id}, Nombre: ${product.name}`; // Asegúrate de que esto sea correcto
        productList.appendChild(li);
    });
}

// Función para añadir un nuevo usuario
async function addUser() {
    const username = prompt("Ingrese el nombre del nuevo usuario:");
    const password = prompt("Ingrese la contraseña del nuevo usuario:");

    if (username && password) {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const newUser = await response.json();
            alert(`Usuario creado: ${newUser.username}`);
            loadUsers(); // Recargar la lista de usuarios
        } catch (error) {
            console.error('Error añadiendo usuario:', error);
            showErrorModal('Error al añadir el usuario');
        }
    } else {
        alert('El nombre de usuario y la contraseña no pueden estar vacíos.');
    }
}

// Función para añadir un nuevo producto
async function addProduct() {
    const productName = prompt("Ingrese el nombre del nuevo producto:");

    if (productName) {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: productName }) // Ajusta el formato según tu API
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const newProduct = await response.json();
            alert(`Producto creado: ${newProduct.name}`);
            loadProducts(); // Recargar la lista de productos
        } catch (error) {
            console.error('Error añadiendo producto:', error);
            showErrorModal('Error al añadir el producto');
        }
    } else {
        alert('El nombre del producto no puede estar vacío');
    }
}
