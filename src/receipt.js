//Aquí intenta poner las funcionalidades del recibo
// receipt.js
// Responsabilidad: lógica del recibo y del modal de confirmación de pago.
import { cart, calculateTotal, clearCart } from './cart.js';

// ─────────────────────────────────────────────
// TAREA 6 — Mostrar el recibo
//
// Lee el array `cart` y genera una línea por cada plato con:
//   - Nombre del plato
//   - Cantidad elegida
//   - Subtotal (precio × cantidad)
//
// Al final escribe el total general y hace visible
// el #receipt-container cambiando su display a 'flex'
// (igual que hicimos con el carrito con la clase .active,
// pero aquí usamos style directamente ya que el CSS
// ya define display:none y display:flex para este elemento).
// ─────────────────────────────────────────────
export const printReceipt = () => {
    const receiptContainer = document.getElementById('receipt-container');
    const receiptProduct   = document.getElementById('receipt-product');
    const receiptTotal     = document.getElementById('receipt-total');

    // Generamos una tarjeta por cada plato del carrito
    receiptProduct.innerHTML = cart.map(item =>
        `<div class="receipt-product">
            <h3>${item.name}</h3>
            <div class="receipt-price">
                <p>Cantidad: ${item.quantity}</p>
                <h5>${(item.price * item.quantity).toFixed(2)} €</h5>
            </div>
        </div>`
    ).join('');

    // Total general reutilizando calculateTotal() de cart.js
    receiptTotal.textContent = `Total: ${calculateTotal().toFixed(2)} €`;

    // Mostramos el contenedor del recibo
    receiptContainer.style.display = 'flex';
};


// ─────────────────────────────────────────────
// TAREA 6 — Cerrar el recibo
//
// Oculta el #receipt-container y limpia su contenido
// para que la próxima vez que se abra empiece limpio.
// ─────────────────────────────────────────────
export const closeReceipt = () => {
    const receiptContainer = document.getElementById('receipt-container');
    receiptContainer.style.display = 'none';
    document.getElementById('receipt-product').innerHTML = '';
    document.getElementById('receipt-total').textContent = 'Total: €';
};


// ─────────────────────────────────────────────
// TAREA 7 — Mostrar el modal de confirmación
//
// Añade la clase 'active' al overlay del modal,
// igual que hicimos con el carrito en la tarea 3.
// ─────────────────────────────────────────────
export const showModal = () => {
    document.getElementById('modal').classList.add('active');
};


// ─────────────────────────────────────────────
// TAREA 7 — Cerrar el modal y limpiar todo
//
// Al cerrar el modal:
//   1. Ocultamos el modal
//   2. Cerramos el recibo
//   3. Vaciamos el carrito con clearCart()
//   4. Cerramos el panel del carrito (quitamos clase active)
// ─────────────────────────────────────────────
export const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
    closeReceipt();
    clearCart();
    document.getElementById('cart-container').classList.remove('active');
};