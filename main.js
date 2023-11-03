import { formatPrice } from "./lib/helpers.js";
import { createCartLine, showCartContent } from "./lib/ui.js";
import { resettotal } from "./lib/resettotal.js";


/**
 * @typedef {Object} Product
 * @property {number} id Auðkenni vöru, jákvæð heiltala stærri en 0.
 * @property {string} title Titill vöru, ekki tómur strengur.
 * @property {string} description Lýsing á vöru, ekki tómur strengur.
 * @property {number} price Verð á vöru, jákvæð heiltala stærri en 0.
 */

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

/**
 * Bæta vöru í körfu
 * @param  {Product} product
 * @param {number} quantity 
 */
function addProductToCart(product, quantity) {
  const cartTableBodyElement = document.querySelector('.cart table tbody');
  
  if (!cartTableBodyElement) {
    console.warn('fann ekki .cart table');
    return;
  }
  
  // let total;
  // hér þarf að athuga hvort lína fyrir vöruna sé þegar til check
  let s = true;
  const che = cartTableBodyElement.querySelectorAll('tr');
  for (const tr of Array.from(che)) {
    if (tr.dataset.productId == product.id) {
      s = false;
      let num = tr.querySelector('.foo');
      if (!num) { return };
      num.textContent = String(quantity+Number(num.innerHTML));
      let total = tr.querySelector('.totalcost');
      total.textContent = formatPrice(product.price*num.innerHTML)
    }
  }
  if (s) {
    const cartLine = createCartLine(product, quantity);
    cartTableBodyElement.appendChild(cartLine);
  } 
  // Sýna efni körfu
  showCartContent(true);

  // sýna/uppfæra samtölu körfu 
  resettotal()
}

function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr');

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  if (!product) {
    return;
  }

  // hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input
  let quantity = parent.querySelector('input').valueAsNumber;
  if (!quantity) {
    console.error('Fjöldi fannst ekki');
    return;
  }

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}

const sendaInn = document.querySelector('.senda');
sendaInn.addEventListener('submit', klara);

function klara(event) {
  event.preventDefault()
  const nafn = event.target[0].value
  const heimili = event.target[1].value
  showreceipt(nafn,heimili);
}

function showreceipt(nafn,heimili) {
  const dot = document.querySelectorAll('.cart table tbody tr');
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
    setning.textContent = String(product.title) + ': ' + String(formatPrice(product.price)) + ' ' + String(magn) + ' stykki'
    newl.appendChild(setning); 
    finalprice	+= parseFloat(product.price)*Number(magn);
  }
  const newl = document.createElement('li');
  newl.textContent = 'Samtals: ' + formatPrice(finalprice);
  kvittun.appendChild(newl);
  resettotal()

  const takk = document.createElement('p');
  takk.textContent = 'Takk fyrir að versla hjá okkur!'
  const meira = document.createElement('a')
  meira.textContent = 'Kaupa meira.'
  meira.setAttribute('href', '.')
  
  rec.append(kvittun,takk,meira)
}