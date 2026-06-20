import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Navbar({setUser}) {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const navigate = useNavigate();
  const togglemenu = () => {
    if (isMenuOpen === false) {
      setisMenuOpen(true);
    } else {
      setisMenuOpen(false);
    }
  };

  const menuFalse = () => {
    setisMenuOpen(false);
  };

  const logOut = async () => {
    const res = await axios.post("http://localhost:3000/logOut");
    console.log(res.data);
    if (res.status === 200) {
      setUser(null)
      navigate("/login");
    }
  };
  return (
    <div  >
      <div className="h-10 w-full gap-1 bg-purple-200 flex items-center   md:h-14 justify-between text-xl fixed top-0 left-0   z-50 ">
        <button onClick={togglemenu} className="text-3xl ml-2 md:hidden">
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
        <Link onClick={menuFalse} to="/" className="hidden p-3 md:block">
          Home
        </Link>
        <Link
          onClick={menuFalse}
          to="/Products"
          className="hidden p-3 md:block"
        >
          Products
        </Link>
        <Link onClick={menuFalse} to="/about" className="hidden p-3 md:block">
          About-us
        </Link>

        <input
          type="text"
          className="p-1 rounded-md flex-1 min-w-0 outline-none md:flex-none w-80 "
          placeholder="search here"
        ></input>

        <button className="text-3xl mr-1 md:text-4xl  ">
          <IoSearch />
        </button>

        <button className="block text-3xl ml-3 md:text-4xl mr-5">
          <Link onClick={menuFalse} to="/profile">
            <MdAccountCircle />
          </Link>
        </button>
        <button
          onClick={logOut}
          className="hidden md:block text-3xl ml-3 md:text-4xl mr-5"
        >
          <IoLogOut />
        </button>

        {isMenuOpen && (
          <div className=" bg-purple-100 h-56 w-36 absolute top-10 left-0 border-1 rounded-r-lg border-purple-300 flex flex-col items-start justify-start gap-2 p-2 md:hidden z-50 ">
            <Link onClick={menuFalse} to="/" className="block p-3">
              Home
            </Link>
            <Link onClick={menuFalse} to="/Products" className="block p-3">
              Products
            </Link>
            <Link onClick={menuFalse} to="/about" className="block p-3">
              About-us
            </Link>
            <button
              onClick={logOut}
              className=" block text-3xl ml-10 md:text-4xl mr-5 md:hidden"
            >
              <IoLogOut />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
