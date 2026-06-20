import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Myorder() {
  const navigate = useNavigate();

  const [noorder, setNoOrder] = useState(false);
  const [fetchingorderstate, setFetchingOrderState] = useState(true);
  const [ordersWithDress, setOrdersWithDress] = useState([]);

  useEffect(() => {
    const myOrder = async () => {
      const res = await axios.get(`http://localhost:3000/order/my-orders`, {
        withCredentials: true,
      });
      console.log(res.data)
      const finalData = [];

      for (let order of res.data.orders) {
        try {
          const dressData = await axios.get(
            `http://localhost:3000/dresses/${order.dressId}`,
            { withCredentials: true },
          );

          finalData.push({
            order,
            dress: dressData.data.dress,
          });
        } catch (error) {
          finalData.push({
            order,
            dress: null,
          });
        }
      }
      finalData.length === 0 ? setNoOrder(true) : setOrdersWithDress(finalData);
      setFetchingOrderState(false);
    };
    myOrder();
  }, []);

  return (
    <div className="mt-[40px] md:mt-[60px] pb-10 p-1 flex flex-col items-start justify-evenly gap-4">
      {fetchingorderstate && (
        <div className="md:text-3xl">Fetching Orders....</div>
      )}

      {noorder ? (
        <div className="mt-5 text-xl p-2">
          <span className="px-2">No Order Yet...</span>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-100 px-2 rounded-md cursor-pointer "
          >
            Go to Product page
          </button>
        </div>
      ) : (
        ordersWithDress.map((item) => {
          return (
            <div
              key={item._id}
              className="h-20 md:h-32 bg-blue-100  w-full flex items-center justify-evenly md:justify-around"
            >
              <img
                className="h-20 md:h-32 w-20 md:w-32"
                src={
                  item.dress ? (
                    item.dress.images[0]
                  ) : (
                    <div>Dress Removed By Seller</div>
                  )
                }
              />

              <div className="max-w-20 md:max-w-32 pl-1 overflow-x-scroll scrollbar-none md:text-3xl">
                {item.dress ? (
                  <div>{item.dress.title}</div>
                ) : (
                  <div>Dress Removed By Seller</div>
                )}
              </div>

              <div className="flex flex-col items-end justify-evenly md:gap-10">
                <button className="bg-orange-100 p-1 rounded-md md:text-xl max-h-16 max-w-30">
                  pay now: $
                  {item.dress ? <div>{item.dress.price}</div> : <div>Null</div>}
                </button>
                <div className="text-sm md:text-lg">
                  <span>Order Placed :</span>
                  {item ? (
                    new Date(item?.order?.createdAt).toLocaleDateString("en-In")
                  ) : (
                    <div>item removed</div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Myorder;
