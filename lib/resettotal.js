import { formatPrice } from "./helpers.js";

// TODO bæta við event handler á form sem submittar pöntun
export function resettotal() {
  const samtal = document.querySelector('tfoot tr td .price');
  const summa = document.querySelectorAll('.totalcost');
  let teljum = 0;
  for (const gg of Array.from(summa)) {
    // gg.innerHTML.replace('.', ',')
    teljum += parseFloat(gg.innerHTML);
  }
  samtal.textContent = formatPrice(teljum * 1000) + '-';
  return;
}