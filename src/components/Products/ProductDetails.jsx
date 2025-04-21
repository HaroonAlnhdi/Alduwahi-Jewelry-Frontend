import { useState, useEffect } from "react";
import { useParams ,Link,useNavigate} from "react-router-dom";
import "./ProductDetails.css";
import * as productService from "../../services/productService";
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import CartService from '../../services/CartService';
import Alert from 'react-bootstrap/Alert';
import {addFavorite} from '../../services/favoritesService';

const ProductDetails = ({ user }) => {
  const navigate = useNavigate();
  const { prodId } = useParams();
  const [products, setProducts] = useState();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showDanger, setShowDanger] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    async function getProduct() {
      const productData = await productService.show(prodId);
      setProducts(productData);
    }

    getProduct();
  }, [prodId]);

  const handleFavorites  = async  () => {
    await addFavorite(prodId, user._id);
    // console.log('Product added to favorites:', prodId);
    // console.log('User:', user._id);
    setShowFavorites(true);
  };

  const handleAddToCart = async (event) => {
    event.preventDefault();
    try {
      if (!user) {

        setShowDanger(true);
        setShowSuccess(false);
        return;
      }
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('Token is missing');
        return;
      }
      const response = await CartService.addProductToCart(prodId, 1,token); 

      setShowSuccess(true);
      setShowDanger(false);


    } catch (error) {
      console.error('Error adding product to cart:', error);
    }

}

  if (!products) {
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
    <div className="container">
      <div className="product-content product-wrap clearfix product-deatil">
        <div className="row">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <Carousel className="h">
              <Carousel.Item interval={2000}>
                <img
                  src={products.imageP}
                  className="d-block w-100"
                  alt="ProudectPrimary"
                />
                <Carousel.Caption>
                  <h3>.</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  src={products.imageS}
                  className="d-block w-100"
                  alt="ProudectSecondary"
                />
                <Carousel.Caption>
                  <h3>..</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <img
                  src={products.imageT}
                  className="d-block w-100"
                  alt="ProudectTertiary"
                />
                <Carousel.Caption>
                  <h3>.</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={5000}>
                <img
                  src={products.imageF}
                  className="d-block w-100"
                  alt="Fourth"
                />
                <Carousel.Caption>
                  <h3>.</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
            <h2 className="name">
              {products.name}
              <small>
                Product by <a href="#">Adeline</a>
              </small>
              {[...Array(4)].map((_, i) => (
                <i key={i} className="fa fa-star fa-2x text-primary"></i>
              ))}
              <i className="fa fa-star fa-2x text-muted"></i>
              <span className="fa fa-2x">
                <h5>({products.rating}) Votes</h5>
              </span>
              <a href="#">109 customer reviews</a>
            </h2>
            <hr />
            <h3 className="price-container">
              {products.price} BD
              <small> *includes tax</small>
            </h3>
            <div className="certified">
              <ul>
                <li>
                  <a href="#">
                    Delivery time<span>7 Working Days</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Certified<span>Quality Assured</span>
                  </a>
                </li>
              </ul>
            </div>
            <hr />
            <div className="description description-tabs">
              <ul id="myTab" className="nav nav-pills">
                <li className="active">
                  <a
                    href="#more-information"
                    data-toggle="tab"
                    className="no-margin"
                  >
                    Product Description
                  </a>
                </li>
              </ul>
              <p>{products.description}</p>
              <div id="myTabContent" className="tab-content">
                <div>
                  <dt>Category</dt>
                  <dd>{products.category}</dd>
                  <dt>Stock</dt>
                  <dd>{products.stock}</dd>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-6">
                <form onSubmit={handleAddToCart}>
                  <input type="hidden" name="products" value={products.id} />
                  <button type="submit" className="btn btn-success btn-lg">
                    Add to cart (${products.price})
                  </button>
                </form>
              </div>
              
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="btn-group pull-right">
                  <button className="btn btn-dark btn-default mr-5" onClick={handleFavorites}>
                    <i className="fa fa-star"></i> Add to wishlist
                  </button>
                  <Link to="/contactUs" className="btn btn-dark btn-default">
                    <i className="fa fa-envelope"></i> Contact Us
                  </Link>
                </div>
              </div>

              <div className="col-sm-12 col-md-6 col-lg-12 mt-5">
              <Alert
                  show={showSuccess}
                  variant="success"
                  onClose={() => setShowSuccess(false)}
                  dismissible
                >
                  <Alert.Heading>Product added to cart!</Alert.Heading>
                  <p>Your product has been successfully added to the cart.</p>
                </Alert>

                <Alert
                  show={showDanger}
                  variant="danger"
                  onClose={() => setShowDanger(false)}
                  dismissible
                >
                  <Alert.Heading>Please sign in</Alert.Heading>
                  <p>Please sign in to add product to cart.</p>
                  <Link to="/signin" className="btn btn-dark">Signin </Link>

                </Alert>
                <Alert
                  show={showFavorites}
                  variant="success"
                  onClose={() => setShowFavorites(false)}
                  dismissible
                >
                  <Alert.Heading>Product added to favorites!</Alert.Heading>
                  <p>Your product has been successfully added to the favorites.</p>
                </Alert>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;