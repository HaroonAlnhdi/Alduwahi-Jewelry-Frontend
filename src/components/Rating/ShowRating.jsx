import { useState } from "react";
import { useParams } from "react-router-dom";

import { FaStar } from "react-icons/fa";

import * as productService from "../../services/productService";

const ShowRating = ({ avgRate }) => {
  const [rating, setRating] = useState(avgRate);
  const [hover, setHover] = useState();
  const [products, setProducts] = useState();

  const { prodId } = useParams();

  useEffect(() => {
    async function getProduct() {
      const prodData = await productService.show(prodId);
      setProducts(prodData);
    }

    getProduct();
  }, [prodId]);

  return (
    <div className="ratingStars">
      {[...Array(5)].map((star, idx) => {
        const currentRating = idx + 1;
        return (
          <label>
            <FaStar
              size={25}
              className="star"
              color={currentRating <= rating ? "#FFC107" : "#E4E5E9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default ShowRating;

// --------------------------------
// Put in the product.id .. this is the avg rating

// const [res, setres] = useState();
// <ShowRating
//   avgRate={
//     res.rating.reduce(
//       (accumulator, currentObject) => accumulator + currentObject.rate,
//       0
//     ) / res.rating.length
//   }
// />;
