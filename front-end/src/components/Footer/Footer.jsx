import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Footer({ user }) {
  const navigate = useNavigate();
  const navigateToOrderComponent = () => {
    navigate("/myorder");
  };
  const navigateToSellerOrderComponent=()=>{
    navigate("/sellerorder");
  }
  return (
    <>
      {user.role === "buyer" && (
        <div className="relative">
          <div className="h-10 w-full bg-red-100    fixed bottom-0 z-50 flex items-center justify-center text-xl">
            <button
              onClick={navigateToOrderComponent}
              className="flex items-center cursor-pointer"
            >
              {" "}
              <IoCart className="size-10" />
              <span>My-Orders</span>
            </button>
          </div>
        </div>
      )}
      {
        user.role=== "seller"&&(
          <div className="relative">
          <div className="h-10 w-full bg-red-100    fixed bottom-0 z-50 flex items-center justify-center text-xl">
            <button
              onClick={navigateToSellerOrderComponent}
              className="flex items-center cursor-pointer"
            >
              {" "}
              <IoCart className="size-10" />
              <span>See your orders</span>
            </button>
          </div>
        </div>
        )
      }
    </>
  );
}

export default Footer;
