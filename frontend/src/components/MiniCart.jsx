import placeholder from "../assets/placeholder.png";
import { useDispatch, useSelector } from "react-redux";
import { LuMinus, LuPlus } from "react-icons/lu";
import { BsX } from "react-icons/bs";

import { increment, decrement, removeItem } from "../features/cart/cartSlice.js";

const MiniCart = () => {
  const items = useSelector(state => state.cart.items);
  const length = useSelector(state => state.cart.length);
  const dispatch = useDispatch();

  return (
    <div>
      {length === 0 && <h3 className={"text-center text-2xl text-gray-500 font-bold mt-10"}>Shopping cart is<br/>empty</h3>}
      {length > 0 && items.map(item => <div key={item._id} className={"grid grid-cols-4 gap-2 mb-3 bg-base-100 p-2 rounded-md"}>
        <div>
          <img src={placeholder} alt={item.foodName} className={"w-full h-full rounded-md"}/>
        </div>
        <div className={"col-span-3 relative"}>
          <span
            className={"absolute top-0 right-0 cursor-pointer"}
            onClick={() => dispatch(removeItem(item._id))}
          >
            <BsX/>
          </span>
          <h3 className={"font-bold mb-2 -mt-1 pe-2"}>{item.foodName}</h3>
          <div className={"flex justify-between"}>
            <div>
              <button
                className="btn btn-outline btn-xs btn-square"
                onClick={() => dispatch(decrement(item._id))}
              >
                <LuMinus className="w-3.5 h-3.5" />
              </button>

              <span className="px-2">{item.quantity}</span>

              <button
                className="btn btn-outline btn-xs btn-square"
                onClick={() => dispatch(increment(item._id))}
              >
                <LuPlus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>${item.price * item.quantity}</div>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default MiniCart;