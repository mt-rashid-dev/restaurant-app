import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { LuKeyRound, LuMail, LuUser } from "react-icons/lu";
import { BiEdit } from "react-icons/bi";

const Profile = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div>
      {/* Breadcrumbs - section */}
      <div className={"flex items-center h-20 bg-base-200"}>
        <div className="breadcrumbs text-sm px-8">
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link>Profile</Link></li>
          </ul>
        </div>
      </div>

      {/* Profile info - section */}
      <div className={"max-w-md m-auto p-8 mt-10 bg-base-200 rounded-md"}>
        <div className={"bg-base-100 w-fit m-auto rounded-full p-4"}>
          {!user?.profilePicture && <CiUser className={"size-30"}/>}
        </div>

        {/* First name - section */}
        <div className={"bg-base-100 rounded-md p-4 mt-4"}>
          <h3 className={"font-bold"}>First Name</h3>
          <div className={"relative"}>
            <div className={"absolute flex h-full items-center"}>
              <LuUser/>
            </div>
            <p className={"ps-6"}>{user?.firstName}</p>
          </div>
        </div>

        {/* Last name - section */}
        <div className={"bg-base-100 rounded-md p-4 mt-4"}>
          <h3 className={"font-bold"}>Last Name</h3>
          <div className={"relative"}>
            <div className={"absolute flex h-full items-center"}>
              <LuUser/>
            </div>
            <p className={"ps-6"}>{user?.lastName}</p>
          </div>
        </div>

        {/* Email - section */}
        <div className={"bg-base-100 rounded-md p-4 mt-4"}>
          <h3 className={"font-bold"}>Email</h3>
          <div className={"relative"}>
            <div className={"absolute flex h-full items-center"}>
              <LuMail/>
            </div>
            <p className={"ps-6"}>{user?.email}</p>
          </div>
        </div>

        <button className={"btn btn-info mt-8 w-full"}><BiEdit className={"size-5"}/>Edit Profile</button>
        <button className={"btn btn-secondary mt-4 w-full"}><LuKeyRound/> Change Password</button>
      </div>
    </div>
  );
};

export default Profile;