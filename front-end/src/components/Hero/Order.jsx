import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Order() {
  const [singledress, setSingleDress] = useState(null);
  const [orderstatus, setOrderStatus] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const singleDress = async () => {
      const res = await axios.get(
        `https://custom-dress-marketplace-backend.onrender.com/dresses/${id}`,
        {
          withCredentials: true,
        },
      );
      setSingleDress(res.data.dress);
    };
    singleDress();
  }, []);

  const orderPlaced = async () => {
    const res = await axios.post(
      `https://custom-dress-marketplace-backend.onrender.com/order/${id}`,
      {},
      {
        withCredentials: true,
      },
    );
    console.log(res.data);
    setOrderStatus(true);
    setSingleDress(null);

    navigate("/myorder", { replace: true });
  };

  return (
    <div className="mt-10 md:mt-[70px]">
      <div className="h-full w-full bg-cyan-100 flex flex-col">
        <div className="bg-blue-50 h-24 md:h-44 w-full flex items-center justify-evenly md:justify-around">
          <img
            className="h-20 w-20 md:h-40 md:w-40 bg-cover rounded-md"
            src={singledress?.images[0]}
          />

          <div className="text-xl md:text-3xl text-gray-600 overflow-hidden max-w-32 max-h-10    overflow-x-scroll scrollbar-none  ">
            {singledress?.title}
          </div>

          <div className="flex flex-col items-center justify-evenly md:gap-5 ">
            <span className="text-xl bg-yellow-50 m-1 rounded-md p-1 md:text-3xl  ">
              {singledress?.category}
            </span>
            <span className="text-xl bg-yellow-50 m-1 rounded-md p-1 text-green-400 md:text-3xl ">
              ${singledress?.price}
            </span>
          </div>
        </div>

        <button
          onClick={orderPlaced}
          className="bg-blue-100 text-xl p-2 cursor-pointer md:text-4xl "
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default Order;
