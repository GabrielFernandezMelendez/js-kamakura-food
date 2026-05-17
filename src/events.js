//Intenta separar los eventos en este archivo.

// events.js
// Responsabilidad: registrar todos los eventos de la aplicación.
// Es el punto de entrada → lo carga el index.html con type="module".
import { printFilters, printProducts } from './menu.js';
import { filterByCategory } from './searcher.js';

/**
 * Inicialización de la app.
 *
 * Al cargar la página ejecutamos:
 *   1. printFilters() → pinta los botones de categoría
 *   2. printProducts() → pinta todos los platos (sin filtro)
 */
printFilters();
printProducts();

/**
 * TAREA 1 — Evento de filtrado por categoría.
 *
 * Usamos delegación de eventos: en lugar de añadir un listener
 * a cada botón individualmente, lo añadimos al CONTENEDOR (#filters).
 * Cuando el usuario hace click, comprobamos si el elemento clickado
 * es un botón con clase "filter" usando e.target.classList.contains().
 *
 * ¿Por qué delegación?
 * → Si mañana añadimos un nuevo filtro al array, el evento seguirá
 *   funcionando sin tocar este código (impresión dinámica + evento dinámico).
 *
 * Flujo:
 *   click en botón → leemos data-filter → filterByCategory() → printProducts()
 */
const filtersContainer = document.getElementById('filters');

filtersContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter')) {
        // Leemos el atributo data-filter que pusimos en printFilters()
        const selectedCategory = e.target.dataset.filter;

        // Filtramos y volvemos a imprimir solo los platos de esa categoría
        const filteredProducts = filterByCategory(selectedCategory);
        printProducts(filteredProducts);
    }
});