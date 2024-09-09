import {thead, tableCrm, amountMoneyCms} from './identifier.js';
import {createRow} from './createElement.js';
import {
  formModal,
  discount,
  amountMoneyAddFrom,
  showModal,
  overlayShow,
  popupTitle,
  formInputPrice,
} from './modal.js';
import {getGoodById, updateGood} from './api.js';
import {closeModal, discountRebate, closeError} from './control.js';
import {checkboxDiscount} from './modal.js';

export const clearGoods = () => {
  const table = document.querySelector('.table-crm');
  const rows = table.querySelectorAll('tr:not(:first-child)');
  rows.forEach((row) => row.remove());
};

export const renderGoods = (arr) => {
  const rows = arr.map(createRow);
  rows.map((trElement) => thead.append(trElement));

  totalCoast();

  return tableCrm;
};

export const totalCoast = () => {
  const allRows = document.querySelectorAll('.thead-crm__item_centr:nth-child(7)');
  let totalSum = 0;
  allRows.forEach((row) => {
    totalSum += +row.textContent.slice(1);
  });
  amountMoneyCms.textContent = `$${Math.round(totalSum)}`;
  return totalSum;
};

export const discountState = {
  isDiscountAlreadyApplied: false,
};

const fillFormWithGoodData = (good) => {
  const formModal = document.querySelector('.popup__form');
  formModal.querySelector('#name').value = good.title;
  formModal.querySelector('#category').value = good.category;
  formModal.querySelector('#units').value = good.units;
  formModal.querySelector('#discount').value = good.discount || '';
  formModal.querySelector('#description').value = good.description;
  formModal.querySelector('#count').value = good.count;
  formModal.querySelector('#price').value = good.price;

  discountState.originalPrice = +good.price;

  if (good.discount > 0) {
    discount.disabled = false;
    checkboxDiscount.checked = true;
    discountState.isDiscountAlreadyApplied = false;
    calculateTotal();
  }

  overlayShow.style.display = 'block';
};

export const calculateTotal = () => {
  const priceInput = formModal.querySelector('#price');
  const countProduct = formModal.querySelector('#count');

  if (priceInput.value && countProduct.value) {
    let finalPricePerUnit = discountState.originalPrice || +priceInput.value;
    let total = finalPricePerUnit * countProduct.value;

    if (+discount.value && !discountState.isDiscountAlreadyApplied) {
      finalPricePerUnit -= (finalPricePerUnit / 100) * +discount.value;
      total = finalPricePerUnit * countProduct.value;
      discountState.isDiscountAlreadyApplied = true;
    }

    amountMoneyAddFrom.textContent = `$ ${Math.round(total)}`;

    formModal.dataset.finalPricePerUnit = Math.round(finalPricePerUnit);
    priceInput.value = finalPricePerUnit.toFixed();
  }

  priceInput.addEventListener('input', () => {
    discountState.originalPrice = +priceInput.value;
    discountState.isDiscountAlreadyApplied = false;
    calculateTotal();
  });

  countProduct.addEventListener('input', calculateTotal);

  discount.addEventListener('input', () => {
    discountState.isDiscountAlreadyApplied = false;
    calculateTotal();
  });
};

export const editFunc = () => {
  const editButtons = document.querySelectorAll('.button-edit');

  editButtons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const row = e.target.closest('tr');
      const goodId = row.querySelector('.thead-crm__item').textContent.trim();

      if (!goodId) {
        console.error('Good ID is not defined');
        return;
      }

      const good = await getGoodById(goodId);
      console.log(goodId, good);

      await showModal();

      popupTitle.textContent = 'Изменить товар';
      overlayShow.style.display = 'block';

      fillFormWithGoodData(good);

      if (good.discount > 0) {
        discount.disabled = false;
        checkboxDiscount.checked = true;
        discountState.isDiscountAlreadyApplied = true;
      } else {
        discount.disabled = true;
        discount.value = '';
        discountState.isDiscountAlreadyApplied = false;
      }

      discountRebate();
      calculateTotal();

      closeModal();
      closeError();

      const formModal = document.querySelector('.popup__form');
      formModal.addEventListener(
        'submit',
        async (e) => {
          e.preventDefault();

          const updatedGood = {
            title: formModal.querySelector('#name').value,
            category: formModal.querySelector('#category').value,
            units: formModal.querySelector('#units').value,
            discount: formModal.querySelector('#discount').value,
            description: formModal.querySelector('#description').value,
            count: formModal.querySelector('#count').value,
            price: formModal.querySelector('#price').value,
          };

          await updateGood(goodId, updatedGood);
          overlayShow.style.display = 'none';
          row.querySelector('.thead-crm__item:nth-child(2)').textContent = updatedGood.title;
          row.querySelector('.thead-crm__item:nth-child(3)').textContent = updatedGood.category;
          row.querySelector('.thead-crm__item:nth-child(4)').textContent = updatedGood.units;
          row.querySelector('.thead-crm__item:nth-child(5)').textContent = updatedGood.count;
          row.querySelector('.thead-crm__item:nth-child(6)').textContent = `$${updatedGood.price}`;
          row.querySelector('.thead-crm__item:nth-child(7)').textContent = `$${
            updatedGood.count * updatedGood.price
          }`;

          totalCoast();
        },
        {once: true}
      );
    });
  });
};
