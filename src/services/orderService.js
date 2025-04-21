const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/MLineFashion`;



// ------------------------FOR USER ORDERS-----------------------------------------------------------------------

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (resId) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/${resId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const CreateOrder = async (userId, order) => {
  try {
    const res = await fetch(`${BASE_URL}/shopping-cart/order/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, show , CreateOrder};
