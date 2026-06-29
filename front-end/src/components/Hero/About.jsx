 function About() {
  return (
    <div className="mt-12 md:mt-16 px-3 pb-16">

      <div className="bg-purple-100 rounded-lg p-5 shadow">
        <h1 className="text-3xl font-bold text-center">
          About Us
        </h1>

        <p className="mt-4 text-gray-700 text-center">
          Welcome to our E-Commerce platform! We provide a place where buyers
          can purchase ready-made products and also request custom-made designs
          from trusted sellers.
        </p>

        <p className="mt-4 text-gray-700 text-center">
          Our goal is to make online shopping simple, secure, and affordable
          while giving sellers an opportunity to showcase their products and
          creativity.
        </p>
      </div>

      <div className="mt-8 bg-blue-100 rounded-lg p-5 shadow">
        <h2 className="text-2xl font-semibold text-center">
          Our Mission
        </h2>

        <p className="mt-3 text-center text-gray-700">
          To connect buyers and sellers through a reliable marketplace where
          everyone can shop with confidence and even create custom orders based
          on their own ideas.
        </p>
      </div>

      <div className="mt-8 bg-green-100 rounded-lg p-5 shadow">
        <h2 className="text-2xl font-semibold text-center">
          Why Choose Us?
        </h2>

        <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
          <li>✔ Easy to use platform</li>
          <li>✔ Secure ordering process</li>
          <li>✔ Trusted buyers and sellers</li>
          <li>✔ Custom order feature</li>
          <li>✔ Fast and responsive support</li>
        </ul>
      </div>

      <div className="mt-8 bg-pink-100 rounded-lg p-5 shadow text-center">
        <h2 className="text-2xl font-semibold">
          Thank You ❤️
        </h2>

        <p className="mt-3 text-gray-700">
          Thank you for choosing our platform. We hope you enjoy shopping with
          us and find exactly what you're looking for.
        </p>
      </div>

    </div>
  );
}

export default About;