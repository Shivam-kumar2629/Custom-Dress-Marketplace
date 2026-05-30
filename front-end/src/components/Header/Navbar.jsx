import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const togglemenu = () => {
    if (isMenuOpen === false) {
      setisMenuOpen(true);
    } else {
      setisMenuOpen(false);
    }
  };
  return (
    <>
      <div className="h-10 w-full gap-2 bg-purple-200 flex items-center relative">
        <button onClick={togglemenu} className="text-3xl">
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
        <input
          type="text"
          className="p-1 rounded-md flex-1 outline-none"
          placeholder="search here"
        ></input>
        <button className="text-3xl mr-1">
          <MdAccountCircle />
        </button>

        {isMenuOpen && (
          <div className=" bg-purple-100 h-48 w-36 absolute top-10 border-1 rounded-r-lg border-purple-300 flex flex-col items-start justify-start gap-2 p-2">
            <Link className="block p-3">Home</Link>
            <Link className="block p-3">Products</Link>
            <Link className="block p-3">About-us</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
