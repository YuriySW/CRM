import {setupDeleteTrHandler, addProductBtn, editButton} from './modules/identifier.js';
import {closeModal, formSubmit, clearTr, discountRebate, closeError} from './modules/control.js';
import {renderGoods, calculateTotal, editFunc, discountState} from './modules/render.js';
import {loadGoods} from './modules/api.js';
import {showModal, overlayShow} from './modules/modal.js';

const init = async () => {
  addProductBtn.addEventListener('click', async () => {
    await showModal();
    overlayShow.style.display = 'block';
    discountState.isDiscountAlreadyApplied = false;
    calculateTotal();
    closeModal();
    closeError();
    discountRebate();
    formSubmit();
  });

  clearTr();
  const goods = await loadGoods();
  renderGoods(goods);
  editFunc();

  setupDeleteTrHandler();
};

init();
