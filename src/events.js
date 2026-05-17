//Intenta separar los eventos en este archivo.

// events.js
// Responsabilidad: registrar todos los eventos de la aplicación.
// Es el punto de entrada → lo carga el index.html con type="module".
import { printFilters, printProducts } from './menu.js';
import { filterByCategory } from './searcher.js';
import { toggleCart, addToCart, removeFromCart } from './cart.js';

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

 
// ─────────────────────────────────────────────
// TAREA 3 — Toggle del carrito
// El botón #cart (icono del carrito en el header)
// abre y cierra el panel lateral #cart-container
// ─────────────────────────────────────────────
const cartButton = document.getElementById('cart');
 
cartButton.addEventListener('click', toggleCart);


// ─────────────────────────────────────────────
// TAREA 4 — Añadir al carrito (delegación sobre #products)
//
// Usamos delegación: un solo listener en #products captura
// todos los clicks en los botones "Añadir" de cada plato.
//
// e.target.dataset.id devuelve un STRING ("2"), pero los ids
// en products son NÚMEROS (2). Por eso usamos Number() para
// convertirlo antes de pasarlo a addToCart().
// ─────────────────────────────────────────────
const productsContainer = document.getElementById('products');
 
productsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-button')) {
        const id = Number(e.target.dataset.id); // "2" → 2
        addToCart(id);
    }
});
 
// ─────────────────────────────────────────────
// TAREA 4 — Eliminar del carrito (delegación sobre #cart-products)
//
// El botón "x" tiene clase "close-button" y data-id.
// Como los elementos del carrito se regeneran con innerHTML,
// no podemos añadir listeners directamente a ellos (desaparecen
// y se recrean). La delegación sobre el contenedor padre
// soluciona este problema: el contenedor siempre existe.
// ─────────────────────────────────────────────
const cartProductsContainer = document.getElementById('cart-products');
 
cartProductsContainer.addEventListener('click', (e) => {
    // closest() sube por el DOM hasta encontrar el close-button
    // aunque se haga click en la imagen <img> que está dentro
    const closeButton = e.target.closest('.close-button');
    if (closeButton) {
        const id = Number(closeButton.dataset.id);
        removeFromCart(id);
    }
});