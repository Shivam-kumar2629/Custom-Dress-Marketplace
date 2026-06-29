import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://custom-dress-marketplace-backend.onrender.com/register",
        {
          fullName,
          email,
          password,
          role,
        },
      );

      console.log(res.data);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const redirectLogin = () => {
    navigate("/login");
  };

  return (
    <div className="h-ful w-full relative">
      <div className="text-slate-800 text-center text-md mt-5 md:text-3xl ">
        <span className="text-xl md:text-5xl md:gap-4 ">Welcome</span> to{" "}
        <span className="text-xl md:text-5xl">C</span>ustom-
        <span className="text-xl md:text-5xl">D</span>ress-
        <span className="text-xl md:text-5xl">M</span>arket
        <span className="text-xl md:text-5xl">P</span>lace
      </div>

      <div className="bg-slate-300 h-64 w-60 p-5  flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2 top-14 md:w-96 md:h-80  md:absolute md:top-16  ">
        <input
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
          className="outline-none p-1 md:w-80 md:h-10 md:text-xl"
          placeholder="Enter Full-Name"
        ></input>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none p-1 md:w-80 md:h-10 md:text-xl"
          placeholder="Enter E-mail"
          type="email"
        ></input>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none p-1 md:w-80 md:h-10 md:text-xl"
          placeholder="password"
          type="password"
        ></input>
        <select
          value={role}
          onChange={(e) => setrole(e.target.value)}
          className="outline-none md:w-80 md:h-10 md:text-lg"
        >
          <option>Select Role</option>
          <option>buyer</option>
          <option>seller</option>
        </select>
        <button
          type="submit"
          className="outline-none bg-blue-300 rounded-md p-2 md:w-80 md:h-12 md:text-xl"
          onClick={handleSubmit}
        >
          Register
        </button>
        <div className="flex items-center md:justify-center gap-2">
          <span className="text-xs md:text-lg">Already have an account?</span>
          <button
            onClick={redirectLogin}
            className="text-lg bg-blue-200 rounded-md  md:text-xl"
          >
            Log-in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
