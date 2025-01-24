import {setupDeleteTrHandler, addProductBtn, editButton} from './modules/identifier.js';
import {closeModal, formSubmit, clearTr, discountRebate, closeError} from './modules/control.js';
import {
  renderGoods,
  calculateTotal,
  editFunc,
  discountState,
  previewFunc,
} from './modules/render.js';
import {loadGoods} from './modules/api.js';
import {showModal, overlayShow, preview, file} from './modules/modal.js';

const init = async () => {
  addProductBtn.addEventListener('click', async () => {
    await showModal();

    overlayShow.style.display = 'block';
    discountState.isDiscountAlreadyApplied = false;
    previewFunc();
    calculateTotal();

    closeModal();
    closeError();
    discountRebate();
    formSubmit();
  });

  clearTr();
  const goods = await loadGoods();

  await renderGoods(goods);
  // editFunc();

  setupDeleteTrHandler();
};

init();
