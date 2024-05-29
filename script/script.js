import {product} from './modules/data.js';
import {checkboxDiscount} from './modules/identifier.js';
import {closeModal, formSubmit, clearTr, discountRebate} from './modules/control.js';
import {renderGoods, calculateTotal} from './modules/render.js';

{
  const init = () => {
    closeModal();
    clearTr();
    renderGoods(product);
    discountRebate();
    formSubmit();
    calculateTotal();
  };

  window.crmInit = init();
}
