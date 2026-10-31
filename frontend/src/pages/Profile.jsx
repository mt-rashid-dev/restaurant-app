import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CiUser } from "react-icons/ci";
import { LuEye, LuEyeOff, LuKeyRound, LuLock, LuMail, LuUser } from "react-icons/lu";
import { BiEdit } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { FaRegFileImage } from "react-icons/fa";

import { setUser } from "../features/auth/authSlice.js";

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const theme = useSelector(state => state.theme.value);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editError, setEditError] = useState(<span>&nbsp;</span>);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeError, setChangeError] = useState(<span>&nbsp;</span>);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const changePicture = (e) => {
    if (e.target.files.length > 0) {
      setSelectedPicture(e.target.files[0]);
      setPicturePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setEditError(<span>&nbsp;</span>);
    const formData = new FormData();

    formData.append("selectedPicture", selectedPicture);
    formData.append("firstName", firstName || user?.firstName);
    formData.append("lastName", lastName || user?.lastName);
    formData.append("email", email || user?.email);

    axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/edit-profile`, formData, { withCredentials: true })
      .then(res => {
        dispatch(setUser(res.data.user));
        setIsEditing(false);
        setShowEditProfile(false);
        toast.success(res.data.message, { autoClose: 3000, theme: theme })
      })
      .catch(err => {
        setIsEditing(false);
        setEditError(err);
      });
  };

  const togglePassword = () => {
    if(showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  if (!user) {
    return <Navigate to={"/"}/>;
  }

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
          {user?.profilePicture && <img src={import.meta.env.VITE_API_BASE_URL+"/"+user.profilePicture} alt={user?.firstName+" "+user?.lastName} className={"size-30"}/>}
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

        <button
          className={"btn btn-info mt-8 w-full"}
          onClick={() => setShowEditProfile(true)}
        >
          <BiEdit className={"size-5"}/>Edit Profile
        </button>
        <button
          className={"btn btn-secondary mt-4 w-full"}
          onClick={() => setChangePassword(true)}
        >
          <LuKeyRound/> Change Password
        </button>
      </div>

      {/* Edit profile modal - section */}
      {showEditProfile && <div
        className={"fixed w-[100vw] h-[100vh] bg-gray-950/50 z-100 top-0 left-0"}
      >
        <div className={"flex justify-center items-center w-full h-full"}>
          <div className={"bg-base-100 sm:w-[300px] md:w-[500px] p-8 rounded-md"}>
            {/* Modal header - section */}
            <div className={"flex justify-between items-center"}>
              <h3 className={"font-bold text-xl flex items-center"}><BiEdit className={"size-5 inline-block"}/>&nbsp;Edit Profile</h3>
              <button
                className={"btn btn-sm btn-square"}
                onClick={() => setShowEditProfile(false)}
              >
                <RiCloseLine className={"size-6"}/>
              </button>
            </div>

            {/* Edit profile form - section */}
            <form encType={"multipart/form-data"} onSubmit={handleEdit}>
              <div className={"bg-base-200 w-fit m-auto rounded-full p-4"}>
                {(!picturePreview && !user.profilePicture) && <CiUser className={"size-30"}/>}
                {(!picturePreview && user?.profilePicture) && <img src={import.meta.env.VITE_API_BASE_URL+"/"+user?.profilePicture} alt="" className={"size-30"}/>}
                {picturePreview && <img src={picturePreview} alt="" className={"size-30"}/>}
              </div>

              <div className={"mt-3"}>
                <div className="relative">
                  <div className="absolute flex items-center h-full px-3 z-1">
                    <FaRegFileImage className={"size-5"}/>
                  </div>
                  <input
                    type="file"
                    className={theme === "light" ? "border-1 border-black w-full ps-10 py-2 rounded-md" : "border-1 border-light w-full ps-10 py-2 rounded-md"}
                    accept="image/*"
                    onChange={changePicture}
                  />
                </div>
              </div>

              {/* Edit first name - section */}
              <div className={"mt-3"}>
                <label className={"ps-1 text-lg"}>First Name</label>
                <div className="relative">
                  <div className="absolute flex items-center h-full px-3 z-1">
                    <LuUser className={"size-5"}/>
                  </div>
                  <input
                    type="text"
                    className={theme === "light" ? "border-1 border-black w-full ps-10 py-2 rounded-md" : "border-1 border-light w-full ps-10 py-2 rounded-md"}
                    placeholder={user?.firstName}
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              {/* Edit last name - section */}
              <div className={"mt-3"}>
                <label className={"ps-1 text-lg"}>Last Name</label>
                <div className="relative">
                  <div className="absolute flex items-center h-full px-3 z-1">
                    <LuUser className={"size-5"}/>
                  </div>
                  <input
                    type="text"
                    className={theme === "light" ? "border-1 border-black w-full ps-10 py-2 rounded-md" : "border-1 border-light w-full ps-10 py-2 rounded-md"}
                    placeholder={user?.lastName}
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Edit email - section */}
              <div className={"mt-3"}>
                <label className={"ps-1 text-lg"}>Email</label>
                <div className="relative">
                  <div className="absolute flex items-center h-full px-3 z-1">
                    <LuMail className={"size-5"}/>
                  </div>
                  <input
                    type="text"
                    className={theme === "light" ? "border-1 border-black w-full ps-10 py-2 rounded-md" : "border-1 border-light w-full ps-10 py-2 rounded-md"}
                    placeholder={user?.email}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {editError && <p className={"text-red-500 my-2"}>{editError}</p>}

              <button
                className={"btn btn-info w-full"}
                disabled={isEditing}
              >
                {isEditing? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>}

      {/* Change password modal - section */}
      {changePassword && <div
        className={"fixed w-[100vw] h-[100vh] bg-gray-950/50 z-100 top-0 left-0"}
      >
        <div className={"flex justify-center items-center w-full h-full"}>
          <div className={"bg-base-100 sm:w-[300px] md:w-[500px] p-8 rounded-md"}>
            {/* Modal header - section */}
            <div className={"flex justify-between items-center"}>
              <h3 className={"font-bold text-xl flex items-center"}><LuKeyRound className={"size-5 inline-block"}/>&nbsp;Change Password</h3>
              <button
                className={"btn btn-sm btn-square"}
                onClick={() => setChangePassword(false)}
              >
                <RiCloseLine className={"size-6"}/>
              </button>
            </div>

            {/* Change password form - section */}
            <form onSubmit={handleChange}>
              {/* Current password input - section */}
              <div className={"mt-3"}>
                <label className={"ps-1 text-lg"}>Current Password</label>
                <div className="relative">
                  <div className="absolute flex items-center h-full px-3 z-1">
                    <LuLock className={"size-5"}/>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={theme === "light" ? "border-1 border-black w-full px-10 py-2 rounded-md" : "border-1 border-light w-full px-10 py-2 rounded-md"}
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                  />
                  <div
                    className="absolute top-0 right-0 flex items-center h-full px-3 cursor-pointer z-1"
                    onClick={togglePassword}
                  >
                    {showPassword ? <LuEyeOff className="size-5"/> : <LuEye className="size-5"/>}
                  </div>
                </div>
              </div>

              {/* New password input - section */}
              <div className={"mt-3"}>
                <label className={"ps-1 text-lg"}>New Password</label>
                <div className="relative">
                  <div className="absolute flex items-center h-full px-3 z-1">
                    <LuLock className={"size-5"}/>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={theme === "light" ? "border-1 border-black w-full px-10 py-2 rounded-md" : "border-1 border-light w-full px-10 py-2 rounded-md"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                  <div
                    className="absolute top-0 right-0 flex items-center h-full px-3 cursor-pointer z-1"
                    onClick={togglePassword}
                  >
                    {showPassword ? <LuEyeOff className="size-5"/> : <LuEye className="size-5"/>}
                  </div>
                </div>
              </div>

              {/* Confirm new password input - section */}
              <div className={"mt-3"}>
                <label className={"ps-1 text-lg"}>Confirm New Password</label>
                <div className="relative">
                  <div className="absolute flex items-center h-full px-3 z-1">
                    <LuLock className={"size-5"}/>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={theme === "light" ? "border-1 border-black w-full px-10 py-2 rounded-md" : "border-1 border-light w-full px-10 py-2 rounded-md"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div
                    className="absolute top-0 right-0 flex items-center h-full px-3 cursor-pointer z-1"
                    onClick={togglePassword}
                  >
                    {showPassword ? <LuEyeOff className="size-5"/> : <LuEye className="size-5"/>}
                  </div>
                </div>
              </div>

              {changeError && <p className={"text-red-500 my-2"}>{changeError}</p>}

              <button
                className={"btn btn-secondary w-full"}
                disabled={isEditing}
              >
                {isEditing? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Profile;