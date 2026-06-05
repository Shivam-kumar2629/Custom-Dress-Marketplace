import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getme", {
          withCredentials: true,
        });
        console.log(res.data);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="bg-slate-200 p-2">
      <div className="flex items-center justify-between text-start  text-2xl text-slate-700  md:text-3xl">
        {user?.fullName}
        <div className=" text-xl text-center bg-zinc-400 rounded-xl p-1 md:text-2xl">
          {user?.role}
        </div>
      </div>

      <div className="text-slate-600 text-sm md:text-xl">
        E-mail :- <span className="text-slate-600">{user?.email}</span>
      </div>

      <div className="flex justify-between items-center md:justify-around ">
        <div className="bg-green-100 text-slate-700 border-2  border-slate-700 rounded-lg mt-2 md:h-10 md:w-36 md:text-center md:text-2xl cursor-pointer">
          Requests
        </div>
        <div className="bg-red-100 rounded-lg border-2  border-slate-700 text-slate-700 mt-2 md:h-10 md:w-36 md:text-center md:text-2xl cursor-pointer ">
          Proposals
        </div>
      </div>
    </div>
  );
}

export default Profile;
