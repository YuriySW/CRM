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
  preview,
  file,
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
  console.log(good.image);

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

  const preview = document.querySelector('.preview');
  const formAddImgButton = document.querySelector('.form__add-img');
  // const src = URL.createObjectURL(file);
  const src = `https://excited-evanescent-macaroni.glitch.me/image/${goodId}.jpg`;

  preview.src = src;


  preview.onload = () => {
   
    formAddImgButton.style.marginBottom = '10px';
    preview.style.display = 'block';

    const parent = preview.parentElement;
    parent.style.gridColumn = 'span 2';
    parent.style.gridRow = 'span 1';
    parent.style.position = 'relative';


    const gradientOverlay = document.createElement('div');
    gradientOverlay.style.position = 'absolute';
    gradientOverlay.style.top = '0';
    gradientOverlay.style.left = '0';
    gradientOverlay.style.width = '100%';
    gradientOverlay.style.height = '100%';
    gradientOverlay.style.background =
      'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))';
    gradientOverlay.style.pointerEvents = 'none';

 
    parent.appendChild(gradientOverlay);


    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.width = '40px';
    overlay.style.height = '40px';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.cursor = 'pointer';


    overlay.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.5334 17.45L20 20.9833L16.45 17.45L14.1 19.8L17.65 23.3333L14.1167 26.8667L16.4667 29.2167L20 25.6833L23.5334 29.2167L25.8834 26.8667L22.35 23.3333L25.8834 19.8L23.5334 17.45ZM25.8334 6.66667L24.1667 5H15.8334L14.1667 6.66667H8.33337V10H31.6667V6.66667H25.8334ZM10 31.6667C10 33.5 11.5 35 13.3334 35H26.6667C28.5 35 30 33.5 30 31.6667V11.6667H10V31.6667ZM13.3334 15H26.6667V31.6667H13.3334V15Z" fill="white"/>
    </svg>
  `;

 
    parent.appendChild(overlay);

    
    overlay.addEventListener('click', async () => {
      console.log('SVG clicked!');
      preview.src = ''; 
      preview.style.display = 'none'; 

      parent.removeChild(overlay);
      parent.removeChild(gradientOverlay); /

      previewFunc();
    });
  };

 
  preview.onerror = () => {
   
    preview.style.display = 'none';
    formAddImgButton.style.marginBottom = '0';
    previewFunc();
  };

 

  discountRebateEdit();
  calculateTotalEdit();

  closeModal();
  closeError();

  const formModal = document.querySelector('.popup__form');
  formModal.addEventListener(
    'submit',
    async (e) => {
      e.preventDefault();

      const fileInput = document.querySelector('#file');
      let base64Image = '';
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        base64Image = await new Promise((resolve, reject) => {
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      // if (fileInput.files.length === 0) {
      //   base64Image = ''; // Явно отправляем пустое изображение
      // }

      const updatedGood = {
        title: formModal.querySelector('#name').value,
        category: formModal.querySelector('#category').value,
        units: formModal.querySelector('#units').value,
        discount: formModal.querySelector('#discount').value,
        description: formModal.querySelector('#description').value,
        count: formModal.querySelector('#count').value,
        price: formModal.querySelector('#price').value,
        image: base64Image,
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

export const previewFunc = () => {
  const preview = document.querySelector('.preview');
  const formAddImgButton = document.querySelector('.form__add-img');
  const file = document.querySelector('#file');
  preview.style.marginBottom = '20px';
  const warningMessage = document.createElement('h2');

  file.addEventListener('change', () => {
    const maxFileSize = 1048576;
    const fileInput = document.querySelector('#file');
    const preview = document.querySelector('.preview');

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file.size > maxFileSize) {
        warningMessage.style.display = 'block';
        const formOptionalInput = document.querySelector('.form__optional-input');

        warningMessage.textContent = 'Изображение не должно превышать размер 1 Мб';

        warningMessage.style.fontStyle = 'normal';
        warningMessage.style.fontWeight = '700';
        warningMessage.style.fontSize = '14px';
        warningMessage.style.lineHeight = '17px';
        warningMessage.style.textAlign = 'center';
        warningMessage.style.letterSpacing = '0.1em';
        warningMessage.style.textTransform = 'uppercase';
        warningMessage.style.paddingTop = '20px';

        warningMessage.style.color = '#D80101';

        formOptionalInput.parentNode.insertBefore(warningMessage, formOptionalInput.nextSibling);

        fileInput.value = '';
        preview.style.display = 'none';
      } else {
        warningMessage.style.display = 'none';
        const src = URL.createObjectURL(file);
        preview.src = src;
        formAddImgButton.style.marginBottom = '10px';
        preview.style.display = 'block';

        const parent = preview.parentElement;
        parent.style.gridColumn = 'span 2';
        parent.style.gridRow = 'span 1';

        preview.style.width = '100%';
        preview.style.height = 'auto';
        preview.style.objectFit = 'contain';
        preview.style.margin = '0 auto';
        preview.style.display = 'block';
      }
    }
  });
};
