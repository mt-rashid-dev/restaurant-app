import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import FoodItemCard from "../components/FoodItemCard.jsx";

const OrderNow = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideDropdown, setHideDropdown] = useState(false);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/foods/get-food-items?page=${page}&limit=${limit}`);
  }, []);

  const fetchData = (url) => {
    axios.get(url, { withCredentials: true })
      .then(res => {
        setFoodItems(res.data.foodItems);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const previousPage = (value) => {
    if (value > 1) {
      setPage(value - 1);
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/foods/get-food-items?page=${value-1}&limit=${limit}`);
    }
  };

  const nextPage = (value) => {
    if (value < totalPages) {
      setPage(value + 1);
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/foods/get-food-items?page=${value+1}&limit=${limit}`);
    }
  };

  const changeLimit = (value) => {
    setLimit(value);
    setHideDropdown(true);
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/foods/get-food-items?page=${page}&limit=${value}`);
  };

  return (
    <div>
      {/* Breadcrumbs - section */}
      <div className={"flex items-center h-20 bg-base-200"}>
        <div className="breadcrumbs text-sm px-8">
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link>Order-Now</Link></li>
          </ul>
        </div>
      </div>

      {/* Food item - section */}
      {(isLoading && foodItems.length === 0) && <div className={"flex justify-center mt-8"}>
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>}
      {(!isLoading && foodItems.length > 0) && <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mt-6"}>
        {foodItems.map(item => <FoodItemCard key={item._id} item={item}/>)}
      </div>}
      {(!isLoading && foodItems.length === 0) && <p className={"text-center font-bold mt-8 text-gray-500 text-xl"}>No food items found.</p>}

      {/* Pagination - section */}
      {foodItems.length > 0 && <div className={"flex justify-between items-center px-4 mt-4"}>
        <div>
          <button
            className={"btn btn-sm btn-outline btn-square"}
            onClick={() => previousPage(page)}
          >
            <BsChevronLeft/>
          </button>
          <span className={"px-2"}>{page}/{totalPages}</span>
          <button
            className={"btn btn-sm btn-outline btn-square"}
            onClick={() => nextPage(page)}
          >
            <BsChevronRight/>
          </button>
        </div>
        <div className={hideDropdown? "dropdown dropdown-bottom dropdown-end dropdown-close" : "dropdown dropdown-bottom dropdown-end"}>
          <div
            tabIndex={0}
            role="button"
            className="btn m-1"
            onClick={() => setHideDropdown(false)}
          >
            Show {limit} items
          </div>
          <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-34 p-2 shadow-sm">
            <li><a onClick={() => changeLimit(12)}>12 items</a></li>
            <li><a onClick={() => changeLimit(24)}>24 items</a></li>
            <li><a onClick={() => changeLimit(36)}>36 items</a></li>
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default OrderNow;