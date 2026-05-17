//DEBE imprimir en pantalla la información de filtros.

//DEBE imprimir en pantalla los productos, con su Título, descripción y precio en € y botón de añadir.

// menu.js
// Responsabilidad: imprimir filtros y platos en el DOM de forma dinámica.
// Importamos los datos desde data.js usando ESModules (import/export)
import { filters, products } from '../assets/data/data.js';

/**
 * TAREA 1 — Imprime los botones de filtro en el DOM.
 *
 * Recorre el array `filters` con .map() y por cada categoría
 * genera un <button> con:
 *   - class="filter"         → para los estilos ya definidos en menu.css
 *   - data-filter="${filter}" → atributo personalizado que usaremos luego
 *                              en events.js para saber qué categoría filtrar
 *
 * .join('') convierte el array de strings en un solo string de HTML.
 * innerHTML lo inyecta dentro del <section id="filters">.
 */
export const printFilters = () => {
    const filtersContainer = document.getElementById('filters');

    filtersContainer.innerHTML = filters.map(filter =>
        `<button class="filter" data-filter="${filter}">
            ${filter}
        </button>`
    ).join('');
};

/**
 * TAREA 2 — Imprime las tarjetas de los platos en el DOM.
 *
 * Recibe como parámetro el array de platos a mostrar.
 * Por defecto muestra TODOS los productos (útil al cargar la página).
 * Cuando el usuario filtra por categoría, se le pasará un subarray filtrado.
 *
 * Por cada producto genera un <div class="product-container"> con:
 *   - name        → nombre del plato
 *   - description → descripción
 *   - price       → precio formateado con .toFixed(2) para mostrar siempre 2 decimales
 *   - data-id     → el id del producto, lo usaremos en events.js para añadirlo al carrito
 */
export const printProducts = (productsToShow = products) => {
    const productsContainer = document.getElementById('products');

    productsContainer.innerHTML = productsToShow.map(product =>
        `<div class="product-container">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price-container">
                <h5>${product.price.toFixed(2)} €</h5>
                <button class="add-button" data-id="${product.id}">Añadir</button>
            </div>
        </div>`
    ).join('');
};

// Exportamos también products para que otros archivos puedan usarlo
export { products };