import {getGoodById} from './api.js';
import {editFunc} from './render.js';

export const createRow = async ({id, title, category, units, count, price}) => {
  const trElement = document.createElement('tr');
  trElement.classList.add('product-tr');
  const buttonImg = 'button-img';

  const good = await getGoodById(id);

  const invalidImage = 'image/notimage.jpg';
  const hasValidImage = good?.image && good.image !== invalidImage;

  let finalPrice = price;
  if (good && good.discount) {
    const discountAmount = (price * good.discount) / 100;
    finalPrice = price - discountAmount;
  }

  const total = finalPrice * count;

  trElement.innerHTML = `
  <tr>
  <td class="thead-crm__item">${id}</td>
  <td class="thead-crm__item">${title}</td>
  <td class="thead-crm__item">${category}</td>
  <td class="thead-crm__item thead-crm__item_pieces thead-crm__item_centr">${units}</td>
  <td class="thead-crm__item thead-crm__item_centr">${count}</td>
  <td class="thead-crm__item thead-crm__item_centr">$${price}</td>
  <td class="thead-crm__item thead-crm__item_centr">$${Math.round(total)}</td>
<td class="thead-crm__item">
  <div class="set-buttons-wrap">
    <button class="${buttonImg} button-icons">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.7778 2.22222H2.2222C1.92751 2.22222 1.64489 2.33928 1.43652 2.54766C1.22815 2.75603 1.11108 3.03865 1.11108 3.33333V16.6667C1.11108 16.9614 1.22815 17.244 1.43652 17.4523C1.64489 17.6607 1.92751 17.7778 2.2222 17.7778H17.7778C18.0724 17.7778 18.3551 17.6607 18.5634 17.4523C18.7718 17.244 18.8889 16.9614 18.8889 16.6667V3.33333C18.8889 3.03865 18.7718 2.75603 18.5634 2.54766C18.3551 2.33928 18.0724 2.22222 17.7778 2.22222ZM2.2222 16.6667V3.33333H17.7778V16.6667H2.2222Z"
          fill="#6E6893"
        />
        <path
          d="M4.95561 7.77778C5.28524 7.77778 5.60748 7.68003 5.88156 7.49689C6.15564 7.31376 6.36926 7.05346 6.49541 6.74892C6.62155 6.44437 6.65456 6.10926 6.59025 5.78596C6.52594 5.46266 6.36721 5.16569 6.13412 4.9326C5.90103 4.69951 5.60406 4.54078 5.28076 4.47647C4.95746 4.41216 4.62235 4.44516 4.3178 4.57131C4.01326 4.69746 3.75296 4.91108 3.56982 5.18516C3.38669 5.45924 3.28894 5.78147 3.28894 6.11111C3.28894 6.55314 3.46454 6.97706 3.7771 7.28962C4.08966 7.60218 4.51358 7.77778 4.95561 7.77778ZM4.95561 5.22222C5.13165 5.22112 5.30405 5.27232 5.45095 5.36932C5.59786 5.46632 5.71265 5.60476 5.78078 5.76708C5.84891 5.9294 5.86731 6.1083 5.83364 6.28109C5.79998 6.45389 5.71576 6.61279 5.59167 6.73766C5.46758 6.86253 5.30921 6.94774 5.13663 6.98249C4.96405 7.01724 4.78504 6.99997 4.6223 6.93285C4.45955 6.86574 4.32039 6.75182 4.22247 6.60552C4.12455 6.45923 4.07228 6.28715 4.07227 6.11111C4.07373 5.87729 4.16726 5.65345 4.33261 5.48811C4.49795 5.32277 4.72178 5.22923 4.95561 5.22778V5.22222Z"
          fill="#6E6893"
        />
        <path
          d="M12.6556 8.53889L9.65561 11.5389L7.43338 9.31666C7.32929 9.21319 7.18849 9.15511 7.04172 9.15511C6.89495 9.15511 6.75414 9.21319 6.65005 9.31666L3.28894 12.7222V14.2944L7.06116 10.5222L8.88894 12.3222L6.80561 14.4056H8.33338L13.0278 9.71111L16.6667 13.3333V11.7667L13.4389 8.53889C13.3349 8.43541 13.194 8.37733 13.0473 8.37733C12.9005 8.37733 12.7597 8.43541 12.6556 8.53889Z"
          fill="#6E6893"
        />
      </svg>
    </button>
    <button class="button-edit button-icons">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_10_14)">
          <path
            d="M15.5629 4.86078L17.6394 6.93629L15.5629 4.86078ZM16.8982 3.03233L11.2834 8.64709C10.9933 8.9368 10.7955 9.30591 10.7148 9.70789L10.1962 12.304L12.7923 11.7844C13.1942 11.704 13.5629 11.5069 13.8531 11.2167L19.4678 5.60196C19.6366 5.43324 19.7704 5.23293 19.8617 5.01248C19.953 4.79204 20 4.55576 20 4.31715C20 4.07853 19.953 3.84226 19.8617 3.62181C19.7704 3.40136 19.6366 3.20105 19.4678 3.03233C19.2991 2.86361 19.0988 2.72977 18.8784 2.63845C18.6579 2.54714 18.4216 2.50014 18.183 2.50014C17.9444 2.50014 17.7081 2.54714 17.4877 2.63845C17.2672 2.72977 17.0669 2.86361 16.8982 3.03233V3.03233Z"
            stroke="#6E6893"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.0394 14.2648V17.206C18.0394 17.726 17.8328 18.2248 17.4651 18.5925C17.0974 18.9602 16.5986 19.1668 16.0786 19.1668H5.29418C4.77414 19.1668 4.2754 18.9602 3.90768 18.5925C3.53996 18.2248 3.33337 17.726 3.33337 17.206V6.42157C3.33337 5.90154 3.53996 5.4028 3.90768 5.03508C4.2754 4.66735 4.77414 4.46077 5.29418 4.46077H8.23538"
            stroke="#6E6893"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath>
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
    <button class="button-basket button-icons">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.03125 3.59375H6.875C6.96094 3.59375 7.03125 3.52344 7.03125 3.4375V3.59375H12.9688V3.4375C12.9688 3.52344 13.0391 3.59375 13.125 3.59375H12.9688V5H14.375V3.4375C14.375 2.74805 13.8145 2.1875 13.125 2.1875H6.875C6.18555 2.1875 5.625 2.74805 5.625 3.4375V5H7.03125V3.59375ZM16.875 5H3.125C2.7793 5 2.5 5.2793 2.5 5.625V6.25C2.5 6.33594 2.57031 6.40625 2.65625 6.40625H3.83594L4.31836 16.6211C4.34961 17.2871 4.90039 17.8125 5.56641 17.8125H14.4336C15.1016 17.8125 15.6504 17.2891 15.6816 16.6211L16.1641 6.40625H17.3438C17.4297 6.40625 17.5 6.33594 17.5 6.25V5.625C17.5 5.2793 17.2207 5 16.875 5ZM14.2832 16.4062H5.7168L5.24414 6.40625H14.7559L14.2832 16.4062Z"
          fill="#6E6893"
        />
      </svg>
    </button>
  </div>
</td>
</tr>`;

  const button = trElement.querySelector(`.${buttonImg}`);

  if (!hasValidImage) {
    button.classList.remove(buttonImg);
    button.classList.add('not-img');
    button.disabled = true;
    button.innerHTML = `
        <svg class="button-icons" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M18.75 2.13375L17.8663 1.25L1.25 17.8663L2.13375 18.75L3.38375 17.5H16.25C16.5814 17.4995 16.899 17.3676 17.1333 17.1333C17.3676 16.899 17.4995 16.5814 17.5 16.25V3.38375L18.75 2.13375ZM16.25 16.25H4.63375L9.50437 11.3794L10.9913 12.8663C11.2257 13.1006 11.5435 13.2322 11.875 13.2322C12.2065 13.2322 12.5243 13.1006 12.7587 12.8663L13.75 11.875L16.25 14.3731V16.25ZM16.25 12.605L14.6337 10.9888C14.3993 10.7544 14.0815 10.6228 13.75 10.6228C13.4185 10.6228 13.1007 10.7544 12.8663 10.9888L11.875 11.98L10.3894 10.4944L16.25 4.63375V12.605Z" fill="#6E6893"/>
          <path d="M3.75 13.75V11.875L6.875 8.75187L7.73313 9.61062L8.61812 8.72563L7.75875 7.86625C7.52434 7.63191 7.20646 7.50027 6.875 7.50027C6.54354 7.50027 6.22566 7.63191 5.99125 7.86625L3.75 10.1075V3.75H13.75V2.5H3.75C3.41858 2.50033 3.10083 2.63213 2.86648 2.86648C2.63213 3.10083 2.50033 3.41858 2.5 3.75V13.75H3.75Z" fill="#6E6893"/>
        </svg>
      `;
  } else {
    button.addEventListener('click', async () => {
      const good = await getGoodById(id);
      button.setAttribute(
        'data-pic',
        `https://excited-evanescent-macaroni.glitch.me/${good.image}`
      );
      const url = button.getAttribute('data-pic');

      const width = 600;
      const height = 600;

      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      const left = Math.round(screenWidth / 2 - width / 2);
      const top = Math.round(screenHeight / 2 - height / 2);

      window.open(url, '', `width=${width},height=${height},top=${top},left=${left}`);
    });
  }

  // button.addEventListener('click', async () => {
  //   const good = await getGoodById(id);
  //   button.setAttribute('data-pic', `https://excited-evanescent-macaroni.glitch.me/${good.image}`);
  //   const url = button.getAttribute('data-pic');

  //   const width = 600;
  //   const height = 600;

  //   const screenWidth = window.screen.width;
  //   const screenHeight = window.screen.height;

  //   const left = Math.round(screenWidth / 2 - width / 2);
  //   const top = Math.round(screenHeight / 2 - height / 2);

  //   window.open(url, '', `width=${width},height=${height},top=${top},left=${left}`);
  // });

  setTimeout(() => {
    editFunc();
  }, 1);

  return trElement;
};
