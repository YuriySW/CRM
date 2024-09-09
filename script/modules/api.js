import {overlayShow} from './modal.js';

export const loadGoods = async (page = 1) => {
  try {
    const url = `https://excited-evanescent-macaroni.glitch.me/api/goods?page=${page}`;

    const result = await fetch(url);
    const response = await result.json();
    let allGoods = response.goods;

    if (response.goods.length > 0) {
      const nextPageGoods = await loadGoods(page + 1);
      allGoods.push(...nextPageGoods);
    }

    return allGoods;
  } catch (error) {
    throw error;
  }
};

export const addGood = async (newGood) => {
  try {
    const response = await fetch('https://excited-evanescent-macaroni.glitch.me/api/goods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGood),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data.id;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteGood = async (id) => {
  try {
    const url = `https://excited-evanescent-macaroni.glitch.me/api/goods/${id}`;
    console.log('URL для удаления:', url);

    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return id;
  } catch (error) {
    throw error;
  }
};

export const updateGood = async (id, updatedGood) => {
  try {
    const response = await fetch(`https://excited-evanescent-macaroni.glitch.me/api/goods/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGood),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getGoodById = async (id) => {
  try {
    const url = `https://excited-evanescent-macaroni.glitch.me/api/goods/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const good = await response.json();
    return good;
  } catch (error) {
    console.error('Error:', error);
  }
};
