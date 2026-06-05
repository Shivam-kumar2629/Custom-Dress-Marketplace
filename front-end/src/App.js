 import Home from "./components/Hero/Home";
import Navbar from "./components/Header/Navbar";
import Product from "./components/Hero/Product";
import Profile from "./components/Hero/Profile";
import About from "./components/Hero/About";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

import axios from "axios";

import { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getme", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    checkUser();
  }, []);

  if (user) {
    return (
      <>
        <Navbar setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </>
    );
  }
  if (!user) {
    return (
      <>
        <Login setUser={setUser} />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register  />} />
        </Routes>
      </>
    );
  }
}

export default App;
