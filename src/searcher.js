//DEBE buscar los productos por los filtros


// searcher.js
// Responsabilidad: filtrar los productos según la categoría seleccionada.
import { products } from '../assets/data/data.js';

/**
 * TAREA 1 (parte 2) — Filtra los productos por categoría.
 *
 * Recibe la categoría (string) que el usuario ha pulsado.
 *
 * Si la categoría es 'todos' → devuelve el array completo sin filtrar.
 * Si es cualquier otra → usa .filter() para devolver solo los productos
 * cuya propiedad `category` coincida con el filtro seleccionado.
 *
 * Esta función NO imprime nada, solo DEVUELVE el array filtrado.
 * Será printProducts() en menu.js quien lo imprima.
 * → Principio de responsabilidad única: cada función hace UNA sola cosa.
 */
export const filterByCategory = (category) => {
    if (category === 'todos') {
        return products;
    }
    return products.filter(product => product.category === category);
};