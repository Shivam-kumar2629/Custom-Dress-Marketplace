import axios from "axios";
import { useEffect, useState } from "react";
import test from "../assets/test.jpg";
import { FaRegWindowClose } from "react-icons/fa";

function Profile({ user }) {
  const [dressdata, setDressData] = useState([]);
  const [formState, setformState] = useState(false);
  const [getsinglestate, setGetSingleState] = useState(false);
  const [opensingledressone, setOpenSingleDressOne] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [requestbox, setRequestBox] = useState(false);
  const [fetchedrequests, setFetchedRequests] = useState([]);
  const [proposalformstate, setProposalFormState] = useState(false);

  useEffect(() => {
    const fetchDress = async () => {
      if (user.role !== "seller") return;

      try {
        const res = await axios.get("http://localhost:3000/getmydress", {
          withCredentials: true,
        });

        setDressData(res.data.dresess);
      } catch (error) {
        console.log("dressfetching error:", error.response?.status, error);
      }
    };
    fetchDress();
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !category || !description || images.length === 0) {
      return alert("Please fill all fields ");
    }
    const data = new FormData();
    data.append("title", title);
    data.append("price", price);
    data.append("category", category);
    data.append("description", description);

    images.forEach((image) => {
      data.append("dressImage", image);
    });

    const submitFormData = async () => {
      const res = await axios.post("http://localhost:3000/dresses", data, {
        withCredentials: true,
      });

      setDressData((prev) => [...prev, res.data.dress]);
    };

    submitFormData();
    setTitle("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImages([]);

    setformState(false);
  };

  const openSingleDress = async (id) => {
    setGetSingleState(true);
    const res = await axios.get(`http://localhost:3000/dresses/${id}`, {
      withCredentials: true,
    });
    setOpenSingleDressOne(res.data.dress);
  };

  const deleteSingleDress = async (id) => {
    await axios.delete(`http://localhost:3000/dresses/${id}`, {
      withCredentials: true,
    });
    setDressData((prev) => prev.filter((dress) => dress._id !== id));
  };

  const fetchRequest = async () => {
    setRequestBox(true);
    if (user.role === "buyer") {
      const res = await axios.get("http://localhost:3000/request", {
        withCredentials: true,
      });
      setFetchedRequests(res.data.request);
    }

    if (user.role === "seller") {
      const res = await axios.get("http://localhost:3000/seller/request", {
        withCredentials: true,
      });
      console.log(res.data);
      setFetchedRequests(res.data.requests);
    }
  };
 
  const proposalSend=async (e)=>{
    e.preventDefault();
    const formdata=new FormData();

  }
  if (!user) {
    return (
      <div className="mt-10">
        <h1>loading....</h1>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="bg-slate-200 fixed w-full z-10 p-2 mt-10 md:mt-14 ">
        <div className="flex items-center justify-between text-start  text-2xl text-slate-700  md:text-3xl">
          {user.fullName}
          <div className=" text-xl text-center bg-zinc-400 rounded-xl p-1 md:text-2xl">
            {user.role}
          </div>
        </div>

        <div className="text-slate-600 text-sm md:text-xl">
          E-mail :- <span className="text-slate-600">{user.email}</span>
        </div>

        <div className="flex justify-between items-center pt-2 md:pt-4 md:justify-around ">
          <button
            onClick={fetchRequest}
            className="bg-green-100 text-slate-700 border-2  border-slate-700 rounded-lg mt-2 md:h-10 md:w-36 md:text-center md:text-2xl cursor-pointer"
          >
            Requests
          </button>

          {user.role === "seller" && (
            <div
              onClick={() => setformState(true)}
              className="bg-green-200 text-slate-700 pl-1 pr-1  border-2  border-slate-700 rounded-lg mt-2 md:h-10 md:w-44 md:text-center md:text-2xl cursor-pointer"
            >
              Add-Dress
            </div>
          )}

          <div className="bg-red-100 rounded-lg border-2  border-slate-700 text-slate-700 mt-2 md:h-10 md:w-36 md:text-center md:text-2xl cursor-pointer ">
            Proposals
          </div>
        </div>
      </div>

      {formState && (
        <form
          onSubmit={formSubmit}
          className="flex flex-col bg-blue-100 items-center gap-2 p-2 z-10 absolute top-12 w-full md:w-96 md:h-96 md:justify-evenly md:left-1/2 md:-ml-36 md:top-28"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-56 md:w-80 md:p-1 md:text-xl"
            placeholder="Enter The Title"
          ></input>

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-56 md:w-80 md:p-1 md:text-xl"
            placeholder="Enter The Price"
          ></input>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-56 md:w-80 md:p-1 md:text-xl "
          >
            <option value="">Select The Category</option>
            <option>Casual</option>
            <option>Party wear</option>
            <option>Bridal</option>
          </select>

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-56 md:w-80 md:p-1 md:text-xl"
            type="text"
            placeholder="Type Description of dress"
          ></input>

          <input
            onChange={(e) => {
              setImages([...e.target.files]);
            }}
            className="h-10 w-25 ml-16 md:w-80 md:p-1 md:text-xl"
            type="file"
            multiple
          ></input>

          <button
            className="bg-green-300 rounded-md p-4 md:w-80 md:p-1 md:text-xl"
            type="submit"
          >
            Add-Dress
          </button>

          <button
            type="button"
            onClick={() => {
              setformState(false);
              setTitle("");
              setPrice("");
              setCategory("");
              setDescription("");
              setImages([]);
            }}
            className="bg-red-400 rounded-md p-2 md:w-80 md:p-1 md:text-xl"
          >
            Close
          </button>
        </form>
      )}

      {user.role === "seller" && (
        <div className="bg-red-200 h-full w-full pt-40 md:pt-56 p-1 flex flex-wrap justify-evenly items-center gap-1 md:gap-6">
          {dressdata.map((dress) => {
            // console.log(dressdata);

            return (
              <div
                key={dress._id}
                className="h-36 w-36 md:h-56 md:w-56 rounded-xl bg-slate-500 flex flex-col justify-evenly p-1"
              >
                <img
                  className="rounded-xl h-20 md:h-32 bg-cover"
                  src={dress.images[0]}
                />

                <button
                  onClick={() => {
                    openSingleDress(dress._id);
                  }}
                  className="bg-green-200 rounded-md p-1 cursor-pointer md:p-1 md:text-xl"
                >
                  Open
                </button>

                <button
                  onClick={() => deleteSingleDress(dress._id)}
                  className="bg-red-400 rounded-md cursor-pointer md:p-1 md:text-xl "
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}

      {getsinglestate && (
        <div>
          <div className="flex flex-col items-center justify-around h-[350px] w-[280px] md:h-[400px] md:w-[380px] bg-slate-400 absolute top-12 left-1/2 md:top-24  -translate-x-1/2 rounded-lg z-30 p-1 ">
            <img
              className="h-[210px] w-[260px] md:h-[260px] md:w-[340px] bg-cover  rounded-md"
              src={opensingledressone?.images?.[0]}
            />

            <div className="flex items-center  gap-8  md:gap-5    ">
              <div className="bg-yellow-100 p-1 rounded-xl text-wrap break-all max-w-28 max-h-10 overflow-y-auto md:text-xl md:w-28 text-center ">
                {opensingledressone?.category}
              </div>

              <div className="bg-white rounded-md max-w-20 md:max-w-40  md:w-32   text-wrap p-1 overflow-y-auto scrollbar-hide text-center md:text-xl">
                {opensingledressone?.title}{" "}
              </div>

              <div className="bg-yellow-100 p-1 rounded-xl text-wrap break-all max-w-28 max-h-10 overflow-y-auto md:w-24  md:text-xl text-center">
                {" "}
                <span>$</span>
                {opensingledressone?.price}
              </div>
            </div>

            <div className="bg-green-100 rounded-lg w-full text-center text-xl md:text-2xl pt-1 h-10 cursor-pointer">
              Edit
            </div>

            <div
              onClick={() => setGetSingleState(false)}
              className="  bg-rose-100 rounded-md p-1  md:mt-1 cursor-pointer "
            >
              Close
            </div>
          </div>
        </div>
      )}

      {requestbox && user.role === "buyer" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
          <div className="bg-slate-400  h-56 w-60 md:h-80 md:w-80 mt-32  rounded-md p-1 overflow-y-scroll scrollbar-none  ">
            {fetchedrequests.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex flex-col bg-red-300 p-1 mt-1"
                >
                  <div className="flex justify-around">
                    <div className="w-16 md:w-24 overflow-x-scroll scrollbar-none md:text-lg">
                      {item?.budget}
                    </div>
                    <div className="text-green-200 md:text-lg">
                      {item?.status}
                    </div>
                    <div>
                      {new Date(item?.deadline).toLocaleDateString("en-In")}
                    </div>
                  </div>
                  <div className="overflow-x-scroll whitespace-nowrap scrollbar-none md:text-lg">
                    {item?.description}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setRequestBox(false)}
            className="bg-red-200 px-2 rounded-md md:px-10 md:text-xl"
          >
            close
          </button>
        </div>
      )}

      {requestbox && user.role === "seller" && (
        <div className="absolute top-28 md:top-32 left-1/2 -translate-x-1/2 flex flex-col items-center z-40">
          <div className="bg-slate-400  h-56 w-60 md:h-80 md:w-80   rounded-md p-1 overflow-y-scroll scrollbar-none  ">
            {fetchedrequests.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex flex-col bg-red-300 p-1 mt-1"
                >
                  <div className="flex justify-around">
                    <div className="w-16 md:w-24 overflow-x-scroll scrollbar-none md:text-lg">
                      {item?.budget}
                    </div>

                    <div>
                      Deadline:
                      {new Date(item?.deadline).toLocaleDateString("en-In")}
                    </div>
                  </div>
                  <div className="overflow-x-scroll whitespace-nowrap scrollbar-none md:text-lg">
                    {item?.description}
                  </div>
                  <div className="flex justify-center mt-1">
                    <button
                      onClick={() => {
                        setProposalFormState(true);
                        setRequestBox(false);
                      }}
                      className="bg-white rounded-md p-1 cursor-pointer"
                    >
                      Send proposal
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setRequestBox(false)}
            className="bg-red-200 px-2 rounded-md md:px-10 md:text-xl"
          >
            close
          </button>
        </div>
      )}

      {proposalformstate && (
        <div className="   z-50 h-[250px] w-60 md:h-96 md:w-80 bg-blue-300 absolute flex flex-col items-center top-28   left-1/2 -translate-x-1/2 ">
          <form className="h-full  bg-blue-400 w-full flex flex-col gap-2 items-center justify-evenly p-1 ">
            <input   
              className="w-full md:h-10"
              type="text"
              placeholder="Enter final amount"
            />
            <input   
              className="w-full md:h-10"
              type="text"
              placeholder="Enter your final deadline"
            />
            <input    className="w-full md:h-10" type="text" placeholder="Enter message" />
            <button onClick={proposalSend} className="bg-green-300 p-2 rounded-md md:p-2 md:text-xl">
              Send proposal
            </button>
          </form>
          <button
            onClick={() => setProposalFormState(false)}
            className="bg-red-300 rounded-md p-1 md:p-2 md:text-xl"
          >
            close
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
