// cart.js
// Responsabilidad: toda la lógica del carrito de compras.
import { products } from './menu.js';

// ─────────────────────────────────────────────
// ESTADO del carrito
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
// TAREA 5 — Calcular el total del carrito
//
// .reduce() recorre el array `cart` y acumula la suma de
// (precio × cantidad) de cada plato, empezando desde 0.
//
// Ejemplo con 2 platos:
//   Shogun roll  8.25 × 2 = 16.50
//   Alaska roll  6.50 × 1 =  6.50
//   ─────────────────────────────
//   Total                 = 23.00
// ─────────────────────────────────────────────
export const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};


// ─────────────────────────────────────────────
// TAREA 5 — Actualizar la cantidad de un plato
//
// Recibe el `id` del plato y la acción ('plus' o 'minus').
//
// Usamos .map() para recorrer el array y devolver uno nuevo
// donde SOLO el item con ese id tiene la cantidad modificada.
// Esto es inmutabilidad: no modificamos el objeto original,
// sino que creamos uno nuevo con spread {...item}.
//
// Después filtramos con .filter() para eliminar cualquier
// plato cuya quantity haya llegado a 0.
//
// Finalmente llamamos a printCart() para reflejar el cambio.
// ─────────────────────────────────────────────
export const updateQuantity = (id, action) => {
    cart = cart.map(item => {
        if (item.id !== id) return item; // no es el plato buscado → sin cambios

        // Creamos un nuevo objeto con la cantidad actualizada
        return {
            ...item,
            quantity: action === 'plus' ? item.quantity + 1 : item.quantity - 1
        };
    });

    // Si quantity llegó a 0 → eliminamos el plato del carrito
    cart = cart.filter(item => item.quantity > 0);

    printCart();
};


// ─────────────────────────────────────────────
// TAREA 4 — Añadir un plato al carrito
// ─────────────────────────────────────────────
export const addToCart = (id) => {
    const alreadyInCart = cart.find(item => item.id === id);
    if (alreadyInCart) return;

    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });

    printCart();
};


// ─────────────────────────────────────────────
// TAREA 4 — Eliminar un plato del carrito
// ─────────────────────────────────────────────
export const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    printCart();
};


// ─────────────────────────────────────────────
// TAREA 4 + 5 — Pintar el carrito en el DOM
//
// Ahora también actualiza el total después de renderizar
// los platos, usando calculateTotal().
//
// Cada plato del carrito muestra:
//   - Subtotal individual: price × quantity
//   - El total global se escribe en #cart-total
// ─────────────────────────────────────────────
export const printCart = () => {
    const cartProducts = document.getElementById('cart-products');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartProducts.innerHTML = '<h3>Añade un plato a tu menú</h3>';
        cartTotal.textContent = 'Total: €';
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

    // TAREA 5 — Actualizamos el total en el DOM
    cartTotal.textContent = `Total: ${calculateTotal().toFixed(2)} €`;
};

// ─────────────────────────────────────────────
// TAREA 7 — Vaciar el carrito completamente
//
// Resetea el array `cart` a vacío y vuelve a pintar
// el carrito para reflejar que está limpio.
// Se llama cuando el usuario cierra el modal de pago.
// ─────────────────────────────────────────────
export const clearCart = () => {
    cart = [];
    printCart();
};

// Exportamos cart para que receipt.js pueda leerlo
export { cart };