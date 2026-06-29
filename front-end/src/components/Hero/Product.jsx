//  title price description category images
import { useEffect, useState } from "react";
import axios from "axios";
import test from "../assets/test.jpg";
import { useNavigate } from "react-router-dom";
import Cutomise from "./Cutomise";

function Product({ user }) {
  const [dresess, setDresess] = useState([]);
  const [getsinglestate, setGetSingleState] = useState(false);
  const [openDress, setOpenDress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDress = async () => {
      const res = await axios.get("http://localhost:3000/dresses", {
        withCredentials: true,
      });

      setDresess(res.data.dresses);
    };
    getDress();
  }, []);

  const navigateToOrderPage = () => {
    navigate(`/order/${openDress?._id}`);
  };

  return (
    <div className="relative">
      <div className="absolute top-10 p-2 text-slate-600 text-xl md:top-14 md:p-5 md:text-3xl ">
        Hii <span className="text-2xl md:text-5xl italic">{user.fullName} </span> Enjoy
        Shopping
      </div>

      <div className=" w-full flex  items-center justify-evenly flex-wrap  p-1 pb-10 md:top-36  md:p-5   absolute top-28 ">
        {dresess.map((dress) => {
          return (
            <div
              key={dress._id}
              className="flex flex-col justify-start items-center bg-red-300 h-[190px] w-36  rounded-lg p-1 text-lg md:h-60 md:w-60 gap-2 m-1"
            >
              <img className="h-28 w-full" src={dress.images[0]}></img>

              <div className="  rounded-md w-full text-center cursor-pointer md:text-xl md:mt-1 flex  justify-between md:p-1 overflow-y-hidden  ">
                <span className="max-w-16 md:max-w-24 whitespace-nowrap overflow-x-scroll scrollbar-none"> {dress?.category}</span>
                <span className="max-w-16 md:max-w-24 whitespace-nowrap overflow-x-scroll scrollbar-none">${dress?.price}</span>
              </div>

              <div
                onClick={() => {
                  setGetSingleState(true);
                  setOpenDress(dress);
                }}
                className="bg-green-100 rounded-md w-full text-center cursor-pointer md:text-xl md:mt-2 md:h-10 overflow-y-auto scrollbar-none  "
              >
                Open
              </div>
            </div>
          );
        })}
      </div>

      {getsinglestate && (
        <div>
          <div className="flex flex-col items-center justify-around h-[350px] w-[280px] md:h-[400px] md:w-[350px] bg-slate-400 fixed top-12 left-1/2 md:top-28  -translate-x-1/2 rounded-lg z-50 p-1">
            <img
              className="h-[210px] w-[260px] md:h-[260px] md:w-[340px] bg-cover  rounded-md"
              src={openDress?.images[0]}
            />

            <div className="flex items-center  gap-8  md:gap-5    ">
              <div className="bg-yellow-100 p-1 rounded-xl   max-w-28 max- overflow-x-scroll whitespace-nowrap scrollbar-none   md:text-xl ">
                {openDress?.category}
              </div>

              <div className="bg-white rounded-md max-w-20 md:max-w-40  md:w-32   text-wrap p-1 overflow-y-auto scrollbar-none text-center md:text-xl">
                {openDress?.title}
              </div>

              <div className="bg-yellow-100 p-1 rounded-xl   max-w-28 max-h-10 overflow-x-auto  scrollbar-none md:text-xl">
                {" "}
                <span >$</span> {openDress?.price}
              </div>
            </div>

            {user.role === "buyer" && (
              <button
                onClick={navigateToOrderPage}
                className="bg-green-100 rounded-lg w-full text-center text-xl md:text-2xl pt-1 h-10 cursor-pointer"
              >
                Order
              </button>
            )}

            <div
              onClick={() => setGetSingleState(false)}
              className="  bg-rose-100 rounded-md p-1  md:mt-1 cursor-pointer "
            >
              Close
            </div>
          </div>
        </div>
      )}

      {user.role === "buyer" && (
        <button
          onClick={() => navigate("/customisorder")}
          className="fixed  top-80 md:top-20  right-2   z-40 bg-orange-400 w-36 h-10 rounded-md border-1   "
        >
          Order Custom Dress
        </button>
      )}
    </div>
  );
}

export default Product;
