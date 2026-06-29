import { useNavigate } from "react-router-dom";

function Home({user}) {
  const navigate=useNavigate();
  const categories = ["Men", "Women", "Kids", "Custom"];

  return (
    <div className="mt-12 md:mt-16 pb-16">
     
      <div className="bg-purple-300 rounded-lg p-5 mx-2 shadow">
        <h1 className="text-3xl font-bold">Welcome to Cutomise Dress Store</h1>

        <p className="mt-2 text-gray-700">
          Shop the latest fashion at the best prices.
        </p>

        <button onClick={()=>navigate("/products")} className="mt-4 bg-black text-white px-5 py-2 rounded-md">
          Shop Now
        </button>
      </div>

    
      <div className="mt-8 px-2">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div
              key={cat}
              className="bg-blue-100 h-24 rounded-lg flex items-center justify-center text-lg font-semibold shadow"
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

    
       

    
      <div className="mt-8 mx-2 bg-pink-100 rounded-lg p-5 shadow">
        <h2 className="text-xl font-semibold">Need a Custom Dress?</h2>

        <p className="mt-2 text-gray-700">
          Send your design request and receive proposals from different sellers.
        </p>

      { (user.role==="buyer") && <button onClick={()=>navigate("/customisorder")} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
          Create Request
        </button>}
      </div>

     
      <div className="mt-8 px-2">
        <h2 className="text-xl font-semibold mb-3">Why Choose Us?</h2>

        <div className="space-y-2">
          <div className="bg-green-100 p-3 rounded">✔ Trusted Sellers</div>

          <div className="bg-green-100 p-3 rounded">✔ Fast Delivery</div>

          <div className="bg-green-100 p-3 rounded">✔ Secure Payments</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
