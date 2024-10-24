// Cuando el usuario inicie sesión
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.token && data.role) {
            // Guarda el token y el rol en el localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);  // Aquí guarda el rol ('admin', 'user', etc.)

            // Redirigir a la página principal
            window.location.href = 'home.html';
        } else {
            alert('Inicio de sesion satisfactorio');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el servidor');
    }
});
