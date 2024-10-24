// Verificar si el usuario es admin
const role = localStorage.getItem('role');

if (role !== 'admin') {
    alert('Acceso denegado. Solo los administradores pueden ver esta página.');
    window.location.href = 'products.html';  // Redirigir a la página de productos si no es admin
}
