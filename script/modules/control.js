import {
  formModal,
  checkboxDiscount,
  discount,
  overlay,
  overlayShow,
  amountMoneyAddFrom,
  overlayError,
  overlayErrorShow,
} from './identifier.js';

import {renderGoods, totalCoast, calculateTotal, clearGoods} from './render.js';
import {addGood, loadGoods, deleteGood} from './api.js';

export const deleteTr = async (e) => {
  const target = e.target;

  if (target.closest('.button-basket')) {
    const prodElement = target.closest('.product-tr');
    prodElement.remove();
    const deletedId = prodElement.querySelector('.thead-crm__item').textContent.trim();

    try {
      await deleteGood(deletedId);
      await loadGoods();
    } catch (error) {
      console.log(error);
    }

    totalCoast();
  }
};

export const closeModal = () => {
  overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlay || target === target.closest('.popup-close-img')) {
      overlayShow.style.display = 'none';
    }
  });
};

export const closeError = () => {
  overlayError.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlay || target === target.closest('.popup-close-img-error')) {
      overlayErrorShow.style.display = 'none';
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

export const formSubmit = async () => {
  formModal.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const formData = new FormData(e.target);
    const formProduct = {
      title: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      count: formData.get('count'),
      units: formData.get('units'),
      category: formData.get('category'),
    };

    console.log([formProduct]);

    try {
      const response = await fetch('https://excited-evanescent-macaroni.glitch.me/api/goods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProduct),
      });

      if (response.status === 200 || response.status === 201) {
        const serverResponse = await response.json();
        console.log('Ответ от сервера:', serverResponse);
        const goods = await loadGoods();
        clearGoods();
        renderGoods(goods);

        discount.removeAttribute('required');
        formModal.reset();
        amountMoneyAddFrom.textContent = 0;
        discount.disabled = true;
        overlayShow.style.display = 'none';
      } else {
        overlayError.style.display = 'flex';
        throw new Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    } finally {
      submitButton.disabled = false;
    }
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
