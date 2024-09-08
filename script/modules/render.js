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

  // Устанавливаем оригинальную цену для дальнейшего пересчета
  discountState.originalPrice = +good.price;

  // Если есть скидка, вызываем calculateTotal() для пересчета цены с учетом скидки
  if (good.discount > 0) {
    discount.disabled = false;
    checkboxDiscount.checked = true;
    discountState.isDiscountAlreadyApplied = false; // Сброс состояния для пересчета
    calculateTotal(); // Пересчитываем цену с учетом скидки
  }

  overlayShow.style.display = 'block';
};

export const calculateTotal = () => {
  const priceInput = formModal.querySelector('#price');
  const countProduct = formModal.querySelector('#count');

  // Проверяем, что оба значения заполнены
  if (priceInput.value && countProduct.value) {
    let finalPricePerUnit = discountState.originalPrice || +priceInput.value; // Используем оригинальную цену или текущую цену в поле
    let total = finalPricePerUnit * countProduct.value;

    // Применяем скидку, если она есть и еще не была применена
    if (+discount.value && !discountState.isDiscountAlreadyApplied) {
      finalPricePerUnit -= (finalPricePerUnit / 100) * +discount.value; // Применяем скидку
      total = finalPricePerUnit * countProduct.value; // Пересчитываем общую стоимость с учетом скидки
      discountState.isDiscountAlreadyApplied = true; // Отмечаем, что скидка была применена
    }

    // Обновляем отображение итоговой суммы
    amountMoneyAddFrom.textContent = `$ ${Math.round(total)}`;

    // Сохраняем конечную цену для отправки на сервер и обновляем поле цены
    formModal.dataset.finalPricePerUnit = Math.round(finalPricePerUnit);
    priceInput.value = finalPricePerUnit.toFixed(); // Обновляем поле цены в UI
  }

  // Слушатель для изменения значения в поле цены
  priceInput.addEventListener('input', () => {
    discountState.originalPrice = +priceInput.value; // Обновляем оригинальную цену при ручном изменении
    discountState.isDiscountAlreadyApplied = false; // Сбрасываем состояние применения скидки
    calculateTotal(); // Пересчитываем итоговую стоимость
  });

  // Слушатель для изменения количества товара
  countProduct.addEventListener('input', calculateTotal);

  // Слушатель для изменения скидки
  discount.addEventListener('input', () => {
    discountState.isDiscountAlreadyApplied = false; // Сбрасываем состояние применения скидки при изменении значения
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

          // Получаем цену за одну единицу с учётом скидки или без неё
          // const finalPricePerUnit = parseFloat(formModal.dataset.finalPricePerUnit);
          // console.log(`in ${finalPricePerUnit}`);
          const updatedGood = {
            title: formModal.querySelector('#name').value,
            category: formModal.querySelector('#category').value,
            units: formModal.querySelector('#units').value,
            discount: formModal.querySelector('#discount').value,
            description: formModal.querySelector('#description').value,
            count: formModal.querySelector('#count').value,
            price: formModal.querySelector('#price').value,
            // price: finalPricePerUnit, // Отправляем цену за единицу
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
//////20ю08
