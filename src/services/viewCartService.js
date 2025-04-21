
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/MLineFashion/shopping-cart`;

const viewCart = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


const removeProudect = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export { viewCart , removeProudect};