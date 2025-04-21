const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;


const showFavorites = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/favorites/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.json();
    }
    catch (error) {
      console.log(error);
      
    }
  };



const addFavorite = async (productId , userId) => {
    try {
      const res = await fetch(`${BASE_URL}/favorites/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteFavorite = async (userId,productId) => {
    try {
      const res = await fetch(`${BASE_URL}/favorites/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId }),
      });
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  export { addFavorite, deleteFavorite,showFavorites  };
