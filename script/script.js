import {checkboxDiscount} from './modules/identifier.js';
import {closeModal, formSubmit, clearTr, discountRebate, closeError} from './modules/control.js';
import {renderGoods, calculateTotal} from './modules/render.js';
import './modules/api.js';
import {loadGoods} from './modules/api.js';

{
  const init = async () => {
    closeModal();
    closeError();
    clearTr();
    const goods = await loadGoods();
    renderGoods(goods);
    discountRebate();
    formSubmit();
    calculateTotal();
  };

  window.crmInit = init();
}
