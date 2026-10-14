import placeholder from "../assets/placeholder.png";
import { useDispatch } from "react-redux";

import { addToCart } from "../features/cart/cartSlice.js";

const FoodItemCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="card bg-base-200 shadow-sm m-auto">
      <figure className={"h-[200px]"}>
        <img
          src={placeholder}
          alt={item.productName}/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.foodName}</h2>
        <p>${item.price}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => dispatch(addToCart(item))}
          >Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;