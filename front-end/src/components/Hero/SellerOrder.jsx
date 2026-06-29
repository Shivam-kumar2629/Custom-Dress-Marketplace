import { useEffect, useState } from "react";
import axios from "axios";

function SellerOrder() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(
        "https://custom-dress-marketplace-backend.onrender.com/order/seller-orders",
        {
          withCredentials: true,
        },
      );

      setOrders(res.data.orders);
    };
    fetchOrders();
  }, []);
  return (
    <div className="mt-10 md:mt-20 relative flex flex-col overflow-y-scroll scrollbar-none gap-2 mb-14 p-1">
      {orders.map((order) => {
        return (
          <div key={order._id} className="bg-orange-200 ">
            <div className="w-full   overflow-x-scroll scrollbar-none">
              Details:{order?.message}{" "}
            </div>
            <br />
            <div>
              Order Date: -
              {new Date(order?.createdAt).toLocaleString("en-In")}{" "}
            </div>
            <div>Order Price: -{order?.price} </div>
            <div>Order Type: -{order?.orderType} </div>
            <div>Status: -{order?.status} </div>
          </div>
        );
      })}
    </div>
  );
}

export default SellerOrder;
