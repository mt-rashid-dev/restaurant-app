import { Link } from "react-router-dom";
import { LuUsers } from "react-icons/lu";

const BookTable = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {/* Breadcrumbs - section */}
      <div className={"flex items-center h-20 bg-base-200"}>
        <div className="breadcrumbs text-sm px-8">
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link>Book-Table</Link></li>
          </ul>
        </div>
      </div>

      {/* Opening hours - section */}
      <div className="max-w-md m-auto bg-base-200 mt-8 p-4 rounded-md overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th colSpan={2}>Opening Hours</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Morning</td>
              <td>7:30am - 11:30am</td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Afternoon</td>
              <td>12:30pm - 4:30pm</td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Evening</td>
              <td>5:30pm - 9:30pm</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table booking form - section */}
      <div className={"max-w-md m-auto bg-base-200 mt-8 p-8 rounded-md"}>
        <form className={"space-y-4"} onSubmit={handleSubmit}>
          <div>
            <label className={"label block"}>Select Date</label>
            <input type={"date"} className={"input w-full"}/>
          </div>
          <div>
            <label className={"label block"}>Select Time</label>
            <input type={"time"} className={"input w-full"}/>
          </div>
          <div>
            <label className={"label block"}>Total Guests</label>
            <div className={"relative"}>
              <div className="absolute flex items-center h-full px-3 z-1">
                <LuUsers className={"size-5"}/>
              </div>
              <select className={"select appearance-none w-full pl-10"}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>
          <button className={"btn btn-primary w-full mt-4"}>Book Table</button>
        </form>
      </div>
    </div>
  );
};

export default BookTable;