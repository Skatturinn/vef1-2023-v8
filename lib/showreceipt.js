import { formatPrice } from "./helpers.js";
import { resettotal } from "./resettotal.js";
import { products } from "../main.js";

export function showreceipt(nafn, heimili, dot) {
  // sýnum kvittun og felum rest
  const pro = document.querySelector('.products');
  const car = document.querySelector('.cart');
  const rec = document.querySelector('.receipt');
  if (!pro || !car || !rec) {
    console.warn('fann ekki element.');
    return;
  }
  const kvittun = document.createElement('ul');
  pro.classList.add('hidden');
  car.classList.add('hidden');
  rec.classList.remove('hidden');
  // 
  const newlnafn = document.createElement('li');
  kvittun.appendChild(newlnafn);
  const setning = document.createElement('p');
  setning.textContent = 'Pöntun móttekin: ' + String(nafn) + ' Heimilisfang: ' + String(heimili);
  newlnafn.appendChild(setning);
  // tæmum cart
  let finalprice = 0;
  for (const efni of Array.from(dot)) {
    const newl = document.createElement('li');
    kvittun.appendChild(newl);
    const magn = efni.querySelector('.foo').innerHTML;
    const product = products.find((i) => i.id === Number(efni.dataset.productId));
    efni.parentElement.removeChild(efni);
    const setning = document.createElement('p');
    setning.textContent = String(product.title) + ': ' + String(formatPrice(product.price)) + ' ' + String(magn) + ' stykki';
    newl.appendChild(setning);
    finalprice += parseFloat(product.price) * Number(magn);
  }
  const newl = document.createElement('li');
  newl.textContent = 'Samtals: ' + formatPrice(finalprice);
  kvittun.appendChild(newl);
  resettotal();

  const takk = document.createElement('p');
  takk.textContent = 'Takk fyrir að versla hjá okkur!';
  const meira = document.createElement('a');
  meira.textContent = 'Kaupa meira.';
  meira.setAttribute('href', '.');

  rec.append(kvittun, takk, meira);
}

window.increment = increment
window.save = save
window.reset = reset
