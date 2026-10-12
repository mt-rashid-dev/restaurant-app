import burger from "../assets/burger.png";
import { IoGiftOutline } from "react-icons/io5";
import { RiTruckLine } from "react-icons/ri";
import { LuClipboardCheck } from "react-icons/lu";
import { MdPayment } from "react-icons/md";

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

      {/* Why choose us section */}
      <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mt-3"}>
        <p className={"flex bg-base-200 rounded-md"}>
          <span className={"w-[50px] h-[50px] flex justify-center items-center bg-accent rounded-md text-white text-2xl"}>
            <IoGiftOutline/>
          </span>
          <span className={"flex items-center"}>
            <span className={"ms-3 text-xl"}>Easy Ordering</span>
          </span>
        </p>
        <p className={"flex bg-base-200 rounded-md"}>
          <span className={"w-[50px] h-[50px] flex justify-center items-center bg-accent rounded-md text-white text-2xl"}>
            <RiTruckLine/>
          </span>
          <span className={"flex items-center"}>
            <span className={"ms-3 text-xl"}>Fast Shipping</span>
          </span>
        </p>
        <p className={"flex bg-base-200 rounded-md"}>
          <span className={"w-[50px] h-[50px] flex justify-center items-center bg-accent rounded-md text-white text-2xl"}>
            <LuClipboardCheck/>
          </span>
          <span className={"flex items-center"}>
            <span className={"ms-3 text-xl"}>Easy Booking</span>
          </span>
        </p>
        <p className={"flex bg-base-200 rounded-md"}>
          <span className={"w-[50px] h-[50px] flex justify-center items-center bg-accent rounded-md text-white text-2xl"}>
            <MdPayment/>
          </span>
          <span className={"flex items-center"}>
            <span className={"ms-3 text-xl"}>Secure Payment</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;