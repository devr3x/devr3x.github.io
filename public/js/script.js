document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulación de login
    if (username === "admin" && password === "1234") {
        alert("Inicio de sesión exitoso");
        // Redirigir al dashboard (en este caso, dashboard.html)
        window.location.href = "dashboard.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});
