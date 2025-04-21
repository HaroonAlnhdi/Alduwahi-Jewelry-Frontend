const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const index = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/profile/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (userId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/profile/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, update };
