import { useState } from "react";
import { useParams } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import "./Rating.css";

import * as productService from "../../services/productService";

const Rating = () => {
  const [rating, setRating] = useState();
  const [hover, setHover] = useState();
  const [formData, setformData] = useState({
    rating: "",
  });
  const [products, setProducts] = useState([]);

  const { prodId } = useParams();

  const fetchAllprod = async () => {
    const prodData = await productService.index();

    setProducts(prodData);
  };

  const handleAddRating = async (prodId, formData) => {
    const rate = await productService.AddRating(prodId, formData);
    fetchAllprod();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating >= 0) {
      handleAddRating(prodId, formData);
    }

    // setRating(null);
  };

  const handleChange = (e) => {
    setformData({ [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="ratingStars">
        {[...Array(5)].map((star, idx) => {
          const currentRating = idx + 1;
          return (
            <label key={idx}>
              <input
                name="rate"
                type="radio"
                value={currentRating}
                onClick={() => setRating(currentRating)}
                onChange={handleChange}
              ></input>
              <FaStar
                size={25}
                className="star"
                color={
                  currentRating <= (hover || rating) ? "#FFC107" : "#E4E5E9"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <button type="submit">rate</button>
    </form>
  );
};

export default Rating;
