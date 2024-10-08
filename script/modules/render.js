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
  productAddTable,
} from './modal.js';
import {getGoodById, updateGood} from './api.js';
import {closeModal, discountRebate, closeError} from './control.js';
import {checkboxDiscount} from './modal.js';

export const clearGoods = () => {
  const table = document.querySelector('.table-crm');
  const rows = table.querySelectorAll('tr:not(:first-child)');
  rows.forEach((row) => row.remove());
};

export const renderGoods = async (arr) => {
  try {
    const rows = await Promise.all(arr.map(createRow));

    rows.forEach((trElement) => thead.append(trElement));

    totalCoast();

    return tableCrm;
  } catch (error) {
    console.error('Ошибка при рендеринге товаров:', error);
  }
};

export const totalCoast = () => {
  const allRows = document.querySelectorAll('.thead-crm__item_centr:nth-child(7)');
  let totalSum = 0;
  allRows.forEach((row) => {
    totalSum += +row.textContent.slice(1);
  });
  amountMoneyCms.textContent = `$${Math.round(totalSum)}`;
  console.log((amountMoneyCms.textContent = `$${Math.round(totalSum)}`));

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

export const calculateTotalEdit = () => {
  const priceInput = formModal.querySelector('#price');
  const countProduct = formModal.querySelector('#count');
  const discountValue = +discount.value || 0;

  if (priceInput.value && countProduct.value) {
    const originalPrice = +priceInput.value;
    const count = +countProduct.value;

    let totalPrice = originalPrice * count;

    if (discountValue) {
      const discountAmount = (originalPrice * discountValue) / 100;
      totalPrice = (originalPrice - discountAmount) * count;
    }

    amountMoneyAddFrom.textContent = `$ ${Math.round(totalPrice)}`;
  }

  priceInput.addEventListener('input', () => {
    discountState.isDiscountAlreadyApplied = false;
    calculateTotalEdit();
  });

  countProduct.addEventListener('input', calculateTotalEdit);

  discount.addEventListener('input', () => {
    discountState.isDiscountAlreadyApplied = false;
    calculateTotalEdit();
  });
};

export const calculateTotal = () => {
  const priceInput = formModal.querySelector('#price');
  const countProduct = formModal.querySelector('#count');

  if (priceInput.value && countProduct.value) {
    let originalPrice = +priceInput.value;
    let total = originalPrice * countProduct.value;

    if (+discount.value && !discountState.isDiscountAlreadyApplied) {
      const discountValue = (originalPrice * +discount.value) / 100;
      const discountedPrice = originalPrice - discountValue;
      total = discountedPrice * countProduct.value;

      discountState.isDiscountAlreadyApplied = true;
    }

    amountMoneyAddFrom.textContent = `$ ${Math.round(total)}`;
  }

  priceInput.addEventListener('input', () => {
    discountState.isDiscountAlreadyApplied = false;
    calculateTotal();
  });

  countProduct.addEventListener('input', calculateTotal);

  discount.addEventListener('input', () => {
    discountState.isDiscountAlreadyApplied = false;
    calculateTotal();
  });
};

export const discountRebateEdit = () => {
  checkboxDiscount.addEventListener('change', (e) => {
    if (e.target.checked) {
      discount.disabled = false;
    } else {
      discount.disabled = true;
      discount.value = '';
      discountState.isDiscountAlreadyApplied = true;

      calculateTotalEdit();
    }
  });
};

export const editFunc = () => {
  const editButtons = document.querySelectorAll('.button-edit');

  editButtons.forEach((button) => {
    button.removeEventListener('click', handleEditButtonClick);
    button.addEventListener('click', handleEditButtonClick);
  });
};

const handleEditButtonClick = async (e) => {
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
  productAddTable.textContent = 'Изменить товар';
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

  discountRebateEdit();
  calculateTotalEdit();

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

      const discountValue = +updatedGood.discount || 0;
      let totalPrice = +updatedGood.price * +updatedGood.count;

      if (discountValue > 0) {
        const discountAmount = (+updatedGood.price * discountValue) / 100;
        totalPrice = (+updatedGood.price - discountAmount) * +updatedGood.count;
      }

      row.querySelector('.thead-crm__item:nth-child(7)').textContent = `$${Math.round(totalPrice)}`;

      totalCoast();
    },
    {once: true}
  );
};
