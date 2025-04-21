import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as productService from "../../services/productService";
import "./Products.css";
import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";
import { BsBootstrap } from "react-icons/bs";

const Product = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchAllProducts = async () => {
      const productData = await productService.index();
      setProducts(productData);
    };

    fetchAllProducts();
  }, [user]);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  // Filter products based on the selected category
  const filteredProducts = category === "All" ? products : products.filter(prod => prod.category === category);

  if (!products || products.length === 0) {
    return (
      <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </main>
    );
  }

  return (
    <section className="hero-section">
      <div className="container bootdey prodectss">
        <div className="col-md-3">
          <section className="panel">
            <div className="panel-body">
              <input
                type="text"
                placeholder="Keyword Search"
                className="form-control"
              />
            </div>
          </section>
          <section className="panel">
            <header className="panel-heading mt-2">Category</header>
            <div className="panel-body">
              <ul className="nav prod-cat catagoryList">
                <li>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="All"
                      checked={category === "All"}
                      onChange={() => handleCategoryChange("All")}
                    />
                    All
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="bags"
                      checked={category === "bags"}
                      onChange={() => handleCategoryChange("bags")}
                    />
                    Bags
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="shoes"
                      checked={category === "shoes"}
                      onChange={() => handleCategoryChange("shoes")}
                    />
                    Shoes
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="watches"
                      checked={category === "watches"}
                      onChange={() => handleCategoryChange("watches")}
                    />
                    Watches
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="Abayas"
                      checked={category === "Abayas"}
                      onChange={() => handleCategoryChange("Abayas")}
                    />
                    Abayas
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="man"
                      checked={category === "man"}
                      onChange={() => handleCategoryChange("man")}
                    />
                    man
                  </label>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="col-md-9">
          <div className="row product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <div className="col-md-4 mt-5" key={prod._id}>
                  <Card style={{ width: "18rem" }} className="h-100">
                    <Card.Img variant="top" src={prod.imageP} alt={prod.name} />
                    <Card.Body>
                      <Card.Title className="text-align-center">{prod.name}</Card.Title>
                      <Card.Text>
                        <span className="WidthText">Price :</span> {prod.price} BD
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link to={`/products/${prod._id}`} className="adtocart">
                        <i className="fa fa-shopping-cart"></i>
                      </Link>
                    </Card.Footer>
                  </Card>
                </div>
              ))
            ) : (
              <div height="100vh"><p>No products available.</p></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
