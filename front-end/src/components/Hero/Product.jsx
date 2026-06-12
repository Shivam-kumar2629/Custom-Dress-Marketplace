//  title price description category images
import { useEffect, useState } from "react";
import axios from "axios";
import test from "../assets/test.jpg";

function Product() {
  const [dresess, setDresess] = useState([]);
  const [getsinglestate, setGetSingleState] = useState(false);

  useEffect(() => {
    const getDress = async () => {
      const res = await axios.get("http://localhost:3000/dresses", {
        withCredentials: true,
      });

      setDresess(res.data.dresses);
      console.log(res.data.dresses);
    };
    getDress();
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-10 p-2 text-slate-600 text-xl md:top-14 md:p-5 md:text-3xl ">
        Hii <span className="text-2xl md:text-5xl italic"> Shivam </span> Enjoy
        Shopping
      </div>

      <div className=" w-full flex  items-center justify-evenly flex-wrap      p-1 md:top-36   md:p-5   absolute top-28 ">
        {dresess.map((dress) => {
          return (
            
              <div key={dress._id} className="flex flex-col justify-start items-center bg-red-300 h-46 w-36  rounded-lg p-1 text-lg md:h-60 md:w-60 gap-2">
                <img src={test}></img>
                <div className="  rounded-md w-full text-center cursor-pointer md:text-xl md:mt-1 flex  justify-between md:p-1 overflow-y-hidden  ">
                  <span> cateogory</span>
                  <span>$1000</span>
                </div>
                <div
                  onClick={() => setGetSingleState(true)}
                  className="bg-green-100 rounded-md w-full text-center cursor-pointer md:text-xl md:mt-2 md:h-10 overflow-y-auto  "
                >
                  Open
                </div>
              </div>
            
          );
        })}
      </div>

      {getsinglestate && (
        <div>
          <div className="flex flex-col items-center justify-around h-[350px] w-[280px] md:h-[400px] md:w-[350px] bg-slate-400 absolute top-12 left-1/2 md:top-28  -translate-x-1/2 rounded-lg z-30 p-1">
            <img
              className="h-[210px] w-[260px] md:h-[260px] md:w-[340px] bg-cover  rounded-md"
              src={test}
            />

            <div className="flex items-center  gap-28 md:gap-40    ">
              <div className="bg-yellow-100 p-1 rounded-xl text-wrap break-all max-w-28 max-h-10 overflow-y-auto md:text-xl ">
                category{" "}
              </div>
              <div className="bg-yellow-100 p-1 rounded-xl text-wrap break-all max-w-28 max-h-10 overflow-y-auto  md:text-xl">
                {" "}
                <span>$</span>29999
              </div>
            </div>

            <div className="bg-green-100 rounded-lg w-full text-center text-xl md:text-2xl pt-1 h-10 cursor-pointer">
              order
            </div>

            <div
              onClick={() => setGetSingleState(false)}
              className="  bg-rose-100 rounded-md p-1  md:mt-1 cursor-pointer "
            >
              Close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
