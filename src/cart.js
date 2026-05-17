// cart.js
// Responsabilidad: toda la lógica del carrito de compras.
import { products } from './menu.js';

// ─────────────────────────────────────────────
// ESTADO del carrito
//
// `cart` es un array que actúa como la "memoria" de la app.
// Cada elemento será un objeto con todas las propiedades del
// producto MÁS una propiedad `quantity` que añadimos nosotros.
//
// Ejemplo de elemento en cart:
// { id: 2, name: 'Shogun roll', price: 8.25, category: 'sushi', quantity: 1 }
//
// Usamos `let` porque el array se reasigna al eliminar productos.
// ─────────────────────────────────────────────
let cart = [];


// ─────────────────────────────────────────────
// TAREA 3 — Toggle del carrito
// ─────────────────────────────────────────────
export const toggleCart = () => {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.classList.toggle('active');
};


// ─────────────────────────────────────────────
// TAREA 4 — Añadir un plato al carrito
//
// Recibe el `id` del producto (lo leeremos del data-id del botón).
//
// Pasos:
//   1. Comprobamos con .find() si el producto ya está en `cart`.
//      Si existe → salimos con `return` (sin duplicados).
//   2. Buscamos el producto completo en `products` con .find().
//   3. Lo añadimos a `cart` con spread {...product} para copiar
//      todas sus propiedades, y le sumamos `quantity: 1`.
//   4. Llamamos a printCart() para reflejar el cambio en el DOM.
// ─────────────────────────────────────────────
export const addToCart = (id) => {
    // ¿Ya está en el carrito? (comparamos como número con ===)
    const alreadyInCart = cart.find(item => item.id === id);
    if (alreadyInCart) return; // salimos sin hacer nada

    // Encontramos el producto completo en el array original
    const product = products.find(p => p.id === id);

    // Lo añadimos al carrito con quantity inicial de 1
    // {...product} crea una COPIA del objeto, no una referencia
    cart.push({ ...product, quantity: 1 });

    printCart();
};


// ─────────────────────────────────────────────
// TAREA 4 — Eliminar un plato del carrito
//
// Recibe el `id` del producto a eliminar.
//
// .filter() devuelve un NUEVO array con todos los elementos
// EXCEPTO el que tenga ese id. Así nunca mutamos el array
// directamente, sino que lo sustituimos por uno nuevo.
// ─────────────────────────────────────────────
export const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    printCart();
};


// ─────────────────────────────────────────────
// TAREA 4 — Pintar el carrito en el DOM
//
// Lee el array `cart` y genera el HTML para cada plato.
// Si el carrito está vacío, muestra el mensaje por defecto.
//
// Cada tarjeta del carrito tiene:
//   - Botón "x" (close-button) con data-id → para eliminar
//   - Nombre y precio del plato
//   - Contador con botones "+" y "-" con data-id → para tarea 5
// ─────────────────────────────────────────────
export const printCart = () => {
    const cartProducts = document.getElementById('cart-products');

    // Si el carrito está vacío mostramos el mensaje inicial
    if (cart.length === 0) {
        cartProducts.innerHTML = '<h3>Añade un plato a tu menú</h3>';
        return;
    }

    cartProducts.innerHTML = cart.map(item =>
        `<div class="cart-container">
            <button class="close-button" data-id="${item.id}">
                <img src="./assets/img/close.svg" alt="close">
            </button>
            <div class="text-container">
                <h3>${item.name}</h3>
                <h5>${item.price.toFixed(2)} €</h5>
            </div>
            <div class="quantity-container">
                <button class="plus-button" data-id="${item.id}">+</button>
                <p class="quantity">${item.quantity}</p>
                <button class="minus-button" data-id="${item.id}">-</button>
            </div>
        </div>`
    ).join('');
};

// Exportamos cart para que otros módulos (receipt) puedan leerlo
export { cart };