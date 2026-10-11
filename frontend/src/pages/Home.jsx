import burger from "../assets/burger.png";

const Home = () => {
  return (
    <div>
      {/* Hero section */}
      <div className="hero bg-base-200 min-h-[350px]">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className={"w-full flex justify-center rounded-lg shadow-2xl"}>
            <img
              alt="Tailwind CSS hero component"
              src={burger}
              className="w-100 h-100"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold">Delicious & Spicy!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary me-2">Order Now</button>
            <button className={"btn btn-secondary"}>Book Table</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;