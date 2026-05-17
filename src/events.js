//Intenta separar los eventos en este archivo.

// events.js
// Responsabilidad: registrar todos los eventos de la aplicación.
// Es el punto de entrada → lo carga el index.html con type="module".
import { printFilters, printProducts } from './menu.js';
import { filterByCategory } from './searcher.js';
import { toggleCart, addToCart, removeFromCart,updateQuantity  } from './cart.js';
import { printReceipt, closeReceipt, showModal, closeModal } from './receipt.js';

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
// TAREAS 4 + 5 — Interacciones dentro del carrito
//
// Un ÚNICO listener en #cart-products gestiona los tres botones:
//   • close-button → eliminar plato
//   • plus-button  → aumentar cantidad
//   • minus-button → reducir cantidad (a 0 = elimina el plato)
//
// Usamos .closest() en todos porque dentro de cada botón
// puede haber elementos hijos (la imagen del close, por ejemplo)
// y e.target podría apuntar al hijo en vez de al botón.
// .closest() sube por el DOM hasta encontrar el elemento correcto.
// ─────────────────────────────────────────────
const cartProductsContainer = document.getElementById('cart-products');
 
cartProductsContainer.addEventListener('click', (e) => {
    const closeButton = e.target.closest('.close-button');
    const plusButton  = e.target.closest('.plus-button');
    const minusButton = e.target.closest('.minus-button');
 
    if (closeButton) {
        removeFromCart(Number(closeButton.dataset.id));
    } else if (plusButton) {
        updateQuantity(Number(plusButton.dataset.id), 'plus');
    } else if (minusButton) {
        updateQuantity(Number(minusButton.dataset.id), 'minus');
    }
});

// ─────────────────────────────────────────────
// TAREA 6 — Mostrar el recibo al proceder al pago
// ─────────────────────────────────────────────
document.getElementById('proceedPay-button').addEventListener('click', printReceipt);
 
// ─────────────────────────────────────────────
// TAREA 6 — Cerrar el recibo con el botón "x"
// ─────────────────────────────────────────────
document.getElementById('close-receipt').addEventListener('click', closeReceipt);
 
// ─────────────────────────────────────────────
// TAREA 7 — Abrir el modal al hacer click en "Pagar"
// ─────────────────────────────────────────────
document.getElementById('pay-button').addEventListener('click', showModal);
 
// ─────────────────────────────────────────────
// TAREA 7 — Cerrar el modal (limpia recibo y carrito)
// ─────────────────────────────────────────────
document.getElementById('close-modal').addEventListener('click', closeModal);