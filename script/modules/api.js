export const loadGoods = async (page = 1) => {
  try {
    const url = `https://excited-evanescent-macaroni.glitch.me/api/goods?page=${page}`;

    const result = await fetch(url);
    const response = await result.json();
    let allGoods = response.goods;

    if (response.goods.length > 0) {
      const nextPageGoods = await loadGoods(page + 1);
      allGoods = [...allGoods, ...nextPageGoods];
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
    loadGoods(data);
    const goods = await loadGoods();

    return data.id;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteGood = async (id) => {
  try {
    const response = await fetch(`https://excited-evanescent-macaroni.glitch.me/api/goods/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const goods = await loadGoods();

    return id;
  } catch (error) {
    console.error('Error:', error);
  }
};
