import { createCartLine, showCartContent } from './ui.js';

/**
 * Bæta vöru í körfu
 * @param  {Product} product
 * @param {number} quantity
 */
export function addProductToCart(product, quantity) {
  const cartTableBodyElement = document.querySelector('.cart table tbody');

  if (!cartTableBodyElement) {
    console.warn('fann ekki .cart table');
    return;
  }

  // TODO hér þarf að athuga hvort lína fyrir vöruna sé þegar til
  let s = true;
  const che = cartTableBodyElement.querySelectorAll('tr');
  for (const tr of Array.from(che)) {
    if (tr.dataset.productId == product.id) {
      s = false;
      const fj = tr.querySelector('.foo');
      const nyrfj = number(fj.textContent) + quantity;
      fj.textContent = nyrfj.toString();
    }
  }
  if (s) {
    const cartLine = createCartLine(product, quantity);
    cartTableBodyElement.appendChild(cartLine);
  } else {

  }

  // Sýna efni körfu
  showCartContent(true);

  // TODO sýna/uppfæra samtölu körfu
}
