import Home from "./components/Hero/Home";
import Navbar from "./components/Header/Navbar";
import Product from "./components/Hero/Product"
import Profile from "./components/Hero/Profile";
import About from "./components/Hero/About"

import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route  path="/" element={<Home/>}  />
        <Route  path="/product" element={<Product/>}  />
        <Route  path="/profile" element={<Profile/>}  />
        <Route  path="/about" element={<About/>}  />
      </Routes>
    </div>
  );
}

export default App; 
