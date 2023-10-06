// Obtener el menú de navegación y su altura
var navbar = document.querySelector(".navbar");
var navbarHeight = navbar.offsetHeight;

// Función para manejar el desplazamiento
function handleScroll() {
    if (window.pageYOffset > navbarHeight) {
        navbar.classList.add("fixed"); // Agregamos la clase 'fixed' para fijar el menú
    } else {
        navbar.classList.remove("fixed"); // Quitamos la clase 'fixed' cuando el usuario sube
    }
}

// Agregamos un listener para el evento 'scroll'
window.addEventListener("scroll", handleScroll);
