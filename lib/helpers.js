export function formatPrice(price) {
  const formatter = new Intl.NumberFormat('is-IS', {
    style: 'currency',
    currency: 'ISK',
  });

  return formatter.format(price);
}

window.increment = increment
window.save = save
window.reset = reset