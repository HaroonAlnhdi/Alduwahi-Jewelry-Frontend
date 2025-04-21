// CartService.js

import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/MLineFashion`;

const CartService = {
  // Add product to cart
  addProductToCart: async (productId, quantity,token) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart/add/${productId}`, 
      { quantity },
      { headers: { 'Authorization': `Bearer ${token}` } }

      );
      return response.data;
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
    }
  },

  // View cart
  viewCart: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/shopping-cart/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Create order from cart
  createOrderFromCart: async (userId, address, paymentMethod) => {
    try {
      const response = await axios.post(`${BASE_URL}/shopping-cart/${userId}`, {
        address,
        payment_method: paymentMethod,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order from cart:', error);
      throw error;
    }
  },
};

export default CartService;


