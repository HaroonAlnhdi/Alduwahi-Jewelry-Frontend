import React, { useState, useEffect } from "react";
import axios from "axios";
import { showFavorites  , deleteFavorite } from "../../services/favoritesService";
import { useParams, useNavigate } from "react-router-dom";
import "./Favorites.css";
import { MdOutlineDelete ,MdOutlineShoppingCart } from "react-icons/md";

const Favorites = (user) => {
  const [favorites, setFavorites] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getFavorites() {
      if (userId) {
        const favoritesData = await showFavorites(userId);
        setFavorites(favoritesData.favorites || []);
      }
    }

    getFavorites();
  }, [user]);

  const handleDeleteFavorite = async (event, productId) => {
    event.preventDefault();
    try {
      await deleteFavorite(userId, productId); 
      setFavorites(favorites.filter((favorite) => favorite._id !== productId));
      window.location.reload(); // Reload the page after deleting the product
      
    } catch (error) {
      console.log(error);
    }
  };
  

  
    

  return (
    <section className="favsection">
      <div>
        <h1 className="titels">Favorites</h1>
        {favorites.length > 0 ? (
          <div className="container">
            {favorites.map((favorite) => (
              <div key={favorite._id} className="card">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="table-responsive px-3">
                            <table className="table  align-middle table-nowrap ll">
                              <tbody>
                                {favorite.products.map((product) => (
                                  <tr key={product._id}>
                                    <td>
                                      <div className=" avatar-lg me-4">
                                        <img
                                          src={product.product_id.imageP}
                                          className="img-fluid rounded"
                                          alt={product.product_id.name}
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                          }}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div>
                                        <h5 className="font-size-18">
                                          <a href="#" className="text-dark">
                                            {product.product_id.name}
                                          </a>
                                        </h5>
                                        <p className="text-muted mb-0 mt-2 pt-2">
                                          {product.product_id.description}
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      <ul className="list-unstyled ps-0 mb-0">
                                        <li>
                                          <p className="text-muted mb-1 text-truncate">
                                            <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                            Price: ${product.product_id.price}
                                          </p>
                                        </li>
                                        <li>
                                          <p className="text-muted mb-1 text-truncate">
                                            <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                            Category:{" "}
                                            {product.product_id.category}
                                          </p>
                                        </li>
                                        <li>
                                          <p className="text-muted mb-0 text-truncate">
                                            <i className="mdi mdi-circle-medium align-middle text-primary me-1"></i>{" "}
                                            Stock: {product.product_id.stock}
                                          </p>
                                        </li>
                                      </ul>
                                    </td>


                                    <td>
                                    <a href="#" className="text-muted px-1">
                                     <MdOutlineShoppingCart />
                                    </a>
                                    </td>


                                    <td>
                                      <form
                                        onSubmit={(event) =>
                                          handleDeleteFavorite(
                                            event,
                                            product.product_id._id
                                          )
                                        }
                                      >
                                        <input type="hidden" name="products" />
                                        <button
                                          type="submit"
                                          className="removeBtn"
                                        >
                                          <MdOutlineDelete />
                                        </button>
                                      </form>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No favorites available.</p>
        )}
      </div>
    </section>
  );
};

export default Favorites;
