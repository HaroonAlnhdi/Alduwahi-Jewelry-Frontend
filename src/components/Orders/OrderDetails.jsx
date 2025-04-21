import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as orderService from "../../services/orderService";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orders, setOrders] = useState();

  useEffect(() => {
    async function getOrder() {
      const orderData = await orderService.show(orderId);
      setOrders(orderData);
    }

    getOrder();
  }, [orderId]);

  if (!orders) {
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
    <>
      <div>
        <h1>Order Status: {orders.order_status}</h1>
        <h3>Order Date: {orders.order_date}</h3>
        <h3>Order Method: {orders.payment_method}</h3>
        <h3>Order Cost: {orders.total_cost}</h3>
      </div>
    </>
  );
};

export default OrderDetails;
