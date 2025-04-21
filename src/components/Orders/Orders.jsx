import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as productService from "../../services/productService";
import * as orderService from "../../services/orderService";
import "./Orders.css";
const Order = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const userId = user._id;
  useEffect(() => {
    const fetchAllProducts = async () => {
      const productData = await productService.index();
      setProducts(productData);
    };
    if (user) fetchAllProducts();
  }, [user]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      const orderData = await orderService.show(userId);
      setOrders(orderData);
    };
    if (user) fetchAllOrders();
  }, [user]);

  if (!orders.length) {
    return (
      <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </main>
    );
  }
  if (!orders.length === 0) {
    return (
      <main className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          No Orders Found
        </button>
      </main>
    );
  }

  return (
    <section className="Orders"> 
    <div className="container-fluid">
      <div className="container">
        {orders.map((order) => (
          <div className="row" key={order._id}>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="mb-3 d-flex justify-content-between">
                    <div>
                      <span className="me-3">{new Date(order.order_date).toLocaleDateString()}</span>
                      <span className="me-3">#{order._id}</span>
                      <span className="badge rounded-pill bg-info">{order.order_status.toUpperCase()}</span>
                    </div>

                  </div>
                  <table className="table table-borderless">
                    <tbody>
                      {order.products.map((product) => (
                        <tr key={product.product_id._id}>
                          <td>
                            <div className="d-flex mb-2">
                              <div className="flex-shrink-0">
                                <img
                                  src={product.product_id.imageP }
                                  alt={product.product_id.name}
                                  width="35"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="flex-lg-grow-1 ms-3">
                                <h6 className="small mb-0">
                                  <Link to={`/products/${product.product_id}`} className="text-reset">
                                    {product.product_id.name}
                                  </Link>
                                </h6>
                                <span className="small">{product.name}</span>
                              </div>
                            </div>
                          </td>
                          <td>{product.quantity}</td>
                          <td className="text-end">${product.total_price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="pric">
                      <tr>
                        <td colSpan="2" className="pric">Subtotal</td>
                        <td className="text-end">${order.total_Cost.toFixed(2)}</td>
                      </tr>
                      <tr className="fw-bold">
                        <td colSpan="2">TOTAL</td>
                        <td className="text-end pric">${(order.total_Cost + 20).toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <h3 className="h6">Payment Method</h3>
                      <p>
                        {order.payment_method || "Visa"} <br />
                        Total: ${(order.total_Cost + 20).toFixed(2)}{" "}
                        <span className="badge bg-success rounded-pill">PAID</span>
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <h3 className="h6">Billing Address</h3>
                      <address>
                        <h6>Haroon Alnahdi</h6><br />
                        Kingdom Of Bahrain, Manama<br />
                        Manama Cinter,103<br />
                        <abbr title="Phone">P:</abbr> (+973) 3344-5566
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="h6">Shipping Information</h3>
                  <h5>FedEx</h5>
                  <span>
                    <a href="#" className="text-decoration-underline" target="_blank">
                      FF1234567890
                    </a>{" "}
                    <i className="bi bi-box-arrow-up-right"></i>
                  </span>
                  <hr />
                  <h3 className="h6">Shipping Address</h3>
                  <address>
                        <h5>Haroon Alnahdi</h5><br />
                        Kingdom Of Bahrain, Manama<br />
                        Manama Cinter,103<br />
                        <abbr title="Phone">P:</abbr> (+973) 3344-5566
                      </address>
                </div>
              </div>
            </div>

            
          </div>
        ))}
        <hr />
      </div>
    </div>
    </section>
  );
};

export default Order;
