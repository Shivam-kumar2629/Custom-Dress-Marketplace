import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cutomise() {
  const navigate = useNavigate();
  const [request, setRequest] = useState(false);
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    if (!budget || !description || !deadline) {
      return alert("ALL INPUT FIELD MUST BE FILLED");
    }

    const formData = new FormData();

    formData.append("budget", budget);
    formData.append("description", description);
    formData.append("deadline", deadline);

    const submitFormDate = async () => {
      const res = await axios.post(
        "https://custom-dress-marketplace-backend.onrender.com/request",
        {
          budget,
          description,
          deadline,
        },
        {
          withCredentials: true,
        },
      );
      setRequest(true);

      setBudget("");
      setDescription("");
      setDeadline("");

      
    };

    submitFormDate();
  };

  return (
    <div className="mt-10 relative">
      {!request && (
        <form
          onSubmit={formSubmit}
          className="flex flex-col items-center justify-evenly bg-violet-50 p-1 absolute left-1/2 -translate-x-1/2 top-10 md:h-80 md:w-80  "
        >
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className=" border-2 border-black-50 w-60 h-10 text-center m-2 outline-none"
            placeholder="Enter Budget Here"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="border-2 border-black-50 w-60 h-10 text-center m-2  text-wrap break-words px-1 outline-none "
            placeholder="Enter Description Here"
          />

          <div className="flex flex-col items-center justify-evenly">
            <span className="text-slate-500">Enter deadline below:</span>

            <input
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border-2 border-black-50 w-60 h-10 text-center m-2 outline-none"
              type="date"
              placeholder="Enter Deadline Here"
            />
          </div>

          <button type="submit" className="bg-green-200 p-4 rounded-lg text-lg">
            Send Request
          </button>
        </form>
      )}

      {request && (
        <div className="bg-blue-100 absolute top-5 px-2 w-full rounded-md left-1/2 -translate-x-1/2 z-50">
          <div className="mb-5 md:mb-10 md:text-3xl">
            Request Sent SuccessFully...
          </div>
          <div className="flex items-center justify-evenly">
            <button
              onClick={() => navigate("/products")}
              className="m-1 ml-2 cursor-pointer bg-yellow-50 rounded md p-1 md:p-6 md:text-2xl"
            >
              Explore more Dresess
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cutomise;
