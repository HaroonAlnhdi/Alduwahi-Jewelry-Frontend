const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/MLineFashion`;

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (resId) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${resId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const AddRating = async (resId, ratingFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${resId}/rating`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};






export { index, show, AddRating, };
