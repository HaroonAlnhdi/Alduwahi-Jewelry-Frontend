import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import "bulma/css/bulma.min.css";
import { useParams } from "react-router-dom";
import { viewCart } from "../../services/viewCartService";
import { removeProudect } from "../../services/viewCartService";
import { Alert } from "react-bootstrap";
import "./ShoppingCart.css";
import { MdOutlineDelete ,MdOutlineFavoriteBorder,MdOutlineShoppingCart } from 'react-icons/md';
import Swal from 'sweetalert2';
import { CreateOrder } from "../../services/orderService";

const ShoppingCart = (user) => {
  const [cart, setCart] = useState(null);
  const { userId } = useParams();
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await viewCart(userId);
        setCart(response);
        setPrice(calculateTotal(response.products));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [user, userId]);

  const formatMoney = (amount) => {
    return parseFloat(amount).toFixed(2);
  };

  const calculateTotal = (products) => {
    if (!products) return "0.00";
    const total = products.reduce((acc, item) => acc + parseFloat(item.total_price), 0);
    return formatMoney(total);
  };

  const handleQuantityChange = (event, productItem) => {
    const newQuantity = parseInt(event.target.value, 10);
    const newTotalPrice = productItem.product_id.price * newQuantity;

    setCart((prevCart) => {
      const updatedProducts = prevCart.products.map((item) =>
        item.product_id._id === productItem.product_id._id
          ? { ...item, quantity: newQuantity, total_price: newTotalPrice }
          : item
      );
      setPrice(calculateTotal(updatedProducts));
      return { ...prevCart, products: updatedProducts };
    });
  };

  const handelRemove = async (event, productId) => {
    event.preventDefault();
    try {
      const response = await removeProudect(productId);
      // console.log("Product cart:", response);

      setCart((prevCart) => {
        const updatedProducts = prevCart.products.filter(
          (productItem) => productItem.product_id._id !== productId
        );
        setPrice(calculateTotal(updatedProducts));
        return { ...prevCart, products: updatedProducts };
      });

    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handelCheckout = async (event) => {
    event.preventDefault();
    try {
      const order = {
        products: cart.products,
        total: price,
      };
      const response = await CreateOrder(userId, order);
      
      Swal.fire({
        title: "Good job!",
        text: "Your order has been placed successfully!",
        icon: "success",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/orders/${userId}`);
        }
      });

    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (!cart)
    return (
      <main
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </main>
    );

  return (
    <section className="cartSh">
      <div className="container">
        <h1 className="title">YOUR CART</h1>
        {cart.products && cart.products.length > 0 ? (
          <div className="row">
            <div className="col-xl-8">
              {cart.products.map((productItem, index) => (
                <div className="card border shadow-none" key={index}>
                  <div className="card-body">
                    <div className="d-flex align-items-start border-bottom pb-3">
                      <div className="me-4">
                        <img
                          src={productItem.product_id.imageP}
                          alt="product image"
                          className="avatar-lg rounded"
                        />
                      </div>
                      <div className="flex-grow-1 align-self-center overflow-hidden">
                        <div>
                          <h5 className="text-truncate font-size-18">
                            <Link to={`/products/${productItem.product_id._id}`} className="text-dark">
                              {productItem.product_id.name}
                            </Link>
                          </h5>
                          <p className="mb-0 mt-1">
                            Color : <span className="fw-medium">Black</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ms-2">
                        <ul className="list-inline mb-0 font-size-16">
                          <li className="list-inline-item">
                            <form onSubmit={(event) => handelRemove(event, productItem.product_id._id)}>
                              <input type="hidden" name="products" />
                              <button type="submit" className="removeBtn">
                                <MdOutlineDelete />
                              </button>
                            </form>
                          </li>
                          <li className="list-inline-item">
                            <a href="#" className="text-muted px-1">
                              <MdOutlineFavoriteBorder />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mt-3">
                          <p className="text-muted mb-2">Price</p>
                          <h5 className="mb-0 mt-2">
                            {formatMoney(productItem.product_id.price)} BD
                          </h5>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="mt-3">
                          <p className="text-muted mb-2">Quantity</p>
                          <div className="d-inline-flex">
                            <select
                              className="form-select form-select-sm w-xl"
                              defaultValue={productItem.quantity}
                              onChange={(event) => handleQuantityChange(event, productItem)}
                            >
                              {[...Array(10).keys()].map((i) => (
                                <option value={i + 1} key={i}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mt-3">
                          <p className="text-muted mb-2">Total</p>
                          <h5>{formatMoney(productItem.total_price)} BD</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="row my-4">
                <div className="col-sm-6">
                  <Link
                    to="/products"
                    className="btn btn-dark text-muted bb"
                  >
                    <i className="mdi mdi-arrow-left me-1 "></i> Continue
                    Shopping
                  </Link>
                </div>
                <div className="col-sm-6">
                  <div className="text-sm-end mt-2 mt-sm-0">
                <form onSubmit={handelCheckout}>
                      <input type="hidden" name="products" value={cart.products} />
                      <button className="btn btn-success">
                        <MdOutlineShoppingCart className="me-1" /> Checkout
                      </button>
                </form>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-xl-4">
              <div className="mt-5 mt-lg-0">
                <div className="card border shadow-none">
                  <div className="card-header bg-transparent border-bottom py-3 px-4">
                    <h5 className="font-size-16 mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body p-4 pt-2">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <tbody>
                          <tr>
                            <td>Sub Total :</td>
                            <td className="text-end">{price} BD</td>
                          </tr>
                          <tr className="bg-light">
                            <th>Total :</th>
                            <td className="text-end">
                              <span className="fw-bold">
                                {price} BD
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <main>
            <div className="text-center">
              <Alert key="danger" variant="danger">
                Your cart is empty.
              </Alert>
            </div>
          </main>
        )}
      </div>
    </section>
  );
};

export default ShoppingCart;