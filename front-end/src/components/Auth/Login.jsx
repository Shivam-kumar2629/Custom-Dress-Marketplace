import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://custom-dress-marketplace-backend.onrender.com/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        setUser(res.data.user);
        navigate("/");
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectRegister = () => {
    navigate("/register");
  };

  return (
    <div className="relative">
      <div className="bg-gray-400  h-44 w-60 mt-28   p-2 md:h-64  absolute  left-1/2 -translate-x-1/2 md:w-80">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 m-5 md:gap-5 "
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-slate-200 border-2 outline-none md:p-1 md:text-xl  "
            placeholder="Enter E-mail"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="bg-slate-200 border-2 outline-none md:p-1 md:text-xl "
            placeholder="Password"
          ></input>
          <button type="submit" className="bg-green-200 md:p-1 md:text-xl ">
            Login
          </button>
          <div className="flex items-center gap-2 md:justify-center">
            <span className="text-xs md:text-lg">Don't have account?</span>
            <button
              onClick={redirectRegister}
              className="text-md bg-green-100 rounded-md cursor-pointer md:text-xl md:p-1"
            >
              Sign-up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
