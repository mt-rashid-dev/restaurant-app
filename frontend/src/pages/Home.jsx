import burger from "../assets/burger.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoGiftOutline } from "react-icons/io5";
import { RiTruckLine } from "react-icons/ri";
import { LuClipboardCheck } from "react-icons/lu";
import { MdPayment } from "react-icons/md";

import FoodItemCard from "../components/FoodItemCard.jsx";

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/foods/get-food-items`)
      .then(res => {
        setFoodItems(res.data.foodItems);
      })
      .catch(err => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* Hero - section */}
      <div className="hero bg-base-200 min-h-[350px]">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className={"w-full flex justify-center rounded-lg shadow-2xl md:shadow-none"}>
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

      {/* Why choose us - section */}
      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 mt-3"}>
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

      {/* Explore our menu - section */}
      <h2 className={"text-4xl text-center text-primary mt-10 mb-1"}>Explore Our Menu</h2>
      <p className={"text-center"}>Delicious dishes crafted with fresh ingredients</p>
      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mt-6"}>
        {foodItems.map(item => <FoodItemCard key={item._id} item={item}/>)}
      </div>
    </div>
  );
};

export default Home;