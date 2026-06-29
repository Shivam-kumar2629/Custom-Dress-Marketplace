import Home from "./components/Hero/Home";
import Navbar from "./components/Header/Navbar";
import Product from "./components/Hero/Product";
import Profile from "./components/Hero/Profile";
import About from "./components/Hero/About";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Footer from "./components/Footer/Footer";
import Order from "./components/Hero/Order";
import Myorder from "./components/Hero/Myorder";
import Cutomise from "./components/Hero/Cutomise";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SellerOrder from "./components/Hero/SellerOrder";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          "https://custom-dress-marketplace-backend.onrender.com/getme",
          {
            withCredentials: true,
          },
        );
        setUser(res.data.user);
      } catch (error) {
        console.log("getme failed error:", error.response?.status, error);

        if (error.response?.status === 401) {
          try {
            await axios.get(
              "https://custom-dress-marketplace-backend.onrender.com/refreshToken",
              {
                withCredentials: true,
              },
            );
          } catch (error) {
            console.log(
              "error while generating new accessToken:",
              error.response?.status,
              error,
            );
          }
          try {
            const res = await axios.get(
              "https://custom-dress-marketplace-backend.onrender.com/getme",
              {
                withCredentials: true,
              },
            );
            setUser(res.data.user);
          } catch (error) {
            console.log(
              "error while second getme:",
              error.response?.status,
              error,
            );
          }
        }
      }
    };

    checkUser();
  }, []);

  if (user) {
    return (
      <>
        <Navbar setUser={setUser} />

        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/products" element={<Product user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/customisorder" element={<Cutomise />} />
          <Route path="/sellerorder" element={<SellerOrder />} />
        </Routes>
        <Footer user={user} />
      </>
    );
  }
  if (!user) {
    return (
      <>
        <Login setUser={setUser} />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
    );
  }
}

export default App;
