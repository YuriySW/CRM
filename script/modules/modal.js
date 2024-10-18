import loadStyle from './loadStyle.js';

export let formModal,
  checkboxDiscount,
  discount,
  totalAmount,
  overlay,
  overlayShow,
  overlayCloseBtn,
  productAddTable,
  amountMoneyAddFrom,
  overlayError,
  overlayErrorShow,
  popup,
  formInputPrice,
  preview,
  file,
  popupTitle;

const showModal = async () => {
  await loadStyle('css/index.css');

  const modal = `
    <div class="overlay overlay_show">
      <div class="overlay-error overlay-error-show">
        <button class="popup-close popup-close-error" type="button">
          <img class="popup-close-img-error" src="img/icons/close.svg" alt="" />
        </button>
        <img class="error-img" src="img/icons/error.svg" alt="" />
        <p class="text-error">Что-то пошло не так</p>
      </div>
      <div class="popup popup_crm">
        <button class="popup-close" type="button">
          <img class="popup-close-img" src="img/icons/close.svg" alt="" />
        </button>
        <h2 class="popup__title popup__title_modal">Добавить товар</h2>
        <div class="popup__line"></div>
        <form
          class="popup__form form"
          action="https://jsonplaceholder.typicode.com/posts"
          method="POST"
        >
          <fieldset class="form__fieldset">
            <div class="form__item-name">
              <label class="form__label" for="name">Наименования</label>
              <input class="form__input" type="text" name="name" id="name" required />
              <label class="form__label" for="category">Категория</label>
              <input class="form__input" type="text" name="category" id="category" required />
              <label class="form__label" for="units">Единицы измерения</label>
              <input class="form__input" type="text" name="units" id="units" required />
              <label class="form__label" for="discount">Дисконт</label>
              <div class="form__optional-input">
                <input
                  class="checkbox form__checkbox"
                  type="checkbox"
                  aria-label="Добавить скидку"
                  required
                />
                <input
                  class="form__input discount"
                  type="text"
                  name="discount"
                  id="discount"
                  required
                  disabled
                />
              </div>
            </div>
            <div class="form__item">
              <label class="form__label" for="description">Описание</label>
              <textarea
                class="form__input"
                name="description"
                id="description"
                rows="5"
                required
              ></textarea>
              <label class="form__label" for="count">Колличество</label>
              <input class="form__input" type="number" name="count" id="count" required />
              <label class="form__label" for="price">Цена</label>
              <input
                class="form__input form__input_price"
                type="number"
                name="price"
                id="price"
                required
              />
              <label class="form__add-img" for="file">Добавить изображение</label>
              <input id="file" type="file" name="file" style="display: none" />
              
            </div>
              <div class="wrapper-preview">
          <img class="preview">
          </div>
          </fieldset>
          <button class="form__submit form__submit_add-from" type="submit">Добавить товар</button>
        
          <p class="total-amount">
            Итоговая стоимость:
            <span class="amount-money amount-money_add-from">$ 900</span>
          </p>
        </form>
      </div>
    </div>`;

  const popupContainer = document.querySelector('.popup.container');
  popupContainer.insertAdjacentHTML('afterend', modal);

  formModal = document.querySelector('.popup__form');
  checkboxDiscount = document.querySelector('.form__checkbox');
  checkboxDiscount.removeAttribute('required');
  discount = document.querySelector('.discount');
  discount.removeAttribute('required');
  totalAmount = document.querySelector('.amount-money');
  overlay = document.querySelector('.overlay');
  overlayShow = document.querySelector('.overlay_show');
  overlayCloseBtn = document.querySelector('.popup-close');
  productAddTable = document.querySelector('.form__submit_add-from');
  amountMoneyAddFrom = document.querySelector('.amount-money_add-from');
  overlayError = document.querySelector('.overlay-error');
  overlayErrorShow = document.querySelector('.overlay-error-show');
  popup = document.querySelector('.popup');
  popupTitle = document.querySelector('.popup__title_modal');
  formInputPrice = document.querySelector('.form__input_price');

  // preview = document.querySelector('.preview');
  // const formAddImgButton = document.querySelector('.form__add-img');
  // file = document.querySelector('#file');
  // preview.style.marginBottom = '20px';

  // file.addEventListener('change', () => {
  //   const maxFileSize = 1048576; // 1MB в байтах
  //   const fileInput = document.querySelector('#file');
  //   const preview = document.querySelector('.preview');

  //   if (fileInput.files.length > 0) {
  //     const file = fileInput.files[0];

  //     if (file.size > maxFileSize) {
  //       alert('Файл слишком большой. Максимальный размер файла: 1MB.');
  //       fileInput.value = ''; // Очищаем выбранный файл
  //       preview.style.display = 'none'; // Скрываем превью
  //     } else {
  //       const src = URL.createObjectURL(file);
  //       preview.src = src;
  //       formAddImgButton.style.marginBottom = '10px';
  //       preview.style.display = 'block'; // Показываем превью
  //       // Устанавливаем стили для изменения грид-сетки
  //       const parent = preview.parentElement;
  //       parent.style.gridColumn = 'span 2'; // Занять 2 колонки
  //       parent.style.gridRow = 'span 1'; // Занять 1 строку, можно изменить, если нужно больше

  //       // Дополнительные стили для изображения
  //       preview.style.width = '100%'; // Изображение займет 100% ширины родителя
  //       preview.style.height = 'auto'; // Высота будет авто, чтобы сохранить пропорции
  //       preview.style.objectFit = 'contain'; // Масштабируем изображение, сохраняя пропорции
  //       preview.style.margin = '0 auto'; // Центрируем изображение
  //       preview.style.display = 'block';
  //     }
  //   }
  // });
};

export {showModal};
