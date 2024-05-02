import {
  formModal,
  checkboxDiscount,
  discount,
  overlay,
  overlayShow,
  amountMoneyAddFrom,
} from './identifier.js';
import {renderGoods, totalCoast, calculateTotal} from './render.js';
import {product} from './data.js';

export const deleteTr = (e) => {
  const target = e.target;

  if (target.closest('.button-basket')) {
    const prodElement = target.closest('.product-tr');
    prodElement.remove();

    const deletedId = +prodElement.querySelector('.thead-crm__item').textContent;

    const index = product.findIndex((item) => item.id === deletedId);
    if (index !== -1) {
      product.splice(index, 1);
    }

    console.log(product);
    totalCoast();
  }
};

export const closeModal = () => {
  overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlay || target === target.closest('.popup__close-img')) {
      overlayShow.style.display = 'none';
    }
  });
};

export const discountRebate = () => {
  checkboxDiscount.addEventListener('change', (e) => {
    if (e.target.checked) {
      discount.disabled = false;
    } else {
      discount.disabled = true;
      discount.value = '';
      calculateTotal();
    }
  });
};

export const formSubmit = () => {
  formModal.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProduct = {};

    const generateRandomNumbers = () => {
      let numbers = '';
      for (let i = 0; i < 9; i++) {
        numbers += Math.floor(Math.random() * 10) + 1;
      }
      return numbers;
    };

    const randomNumbers = generateRandomNumbers();

    formProduct.id = +randomNumbers;
    formProduct.title = formData.get('name');
    formProduct.category = formData.get('category');
    formProduct.units = formData.get('units');
    formProduct.description = formData.get('description');
    formProduct.count = formData.get('count');
    formProduct.price = formData.get('price');

    console.log([formProduct]);

    renderGoods([formProduct]);
    product.push(formProduct);
    console.log(product);
    discount.removeAttribute('required');

    formModal.reset();
    amountMoneyAddFrom.textContent = 0;
    discount.disabled = true;
    overlayShow.style.display = 'none';
  });
};

export const clearTr = () => {
  const trForDelet = document.querySelectorAll('tr');
  trForDelet.forEach((tr, index) => {
    if (index > 0) {
      tr.remove();
    }
  });
};
