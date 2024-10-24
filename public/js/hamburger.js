document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    hamburger.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show'); // Añade o quita la clase 'show'
    });

    // Cerrar el menú si se hace clic en un enlace
    dropdownMenu.addEventListener('click', () => {
        dropdownMenu.classList.remove('show'); // Quita la clase 'show' al hacer clic
    });
});