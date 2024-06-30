import React from "react";
import Sidebarelement from "./Sidebarelement";
import { IoPeopleSharp, IoPower } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate()

  const handleLogout = async () => {
    const response = await fetch("https://busy-az-api-9c92d29fca5a.herokuapp.com/api/user/logout", {
      method: "GET",
      credentials: "include"
    });

    const data = await response.json();
    console.log(data);
    navigate("/")
  };

  return (
    <div className="md:w-72 w-20 h-full bg-slate-200 ">
      <div className="py-4">
        <h1 className="text-blue-600 font-bold text-xl md:ml-8 ml-2 mb-2 ">Profil</h1>
        <Sidebarelement
          icon={<IoPeopleSharp size={16} />}
          text="Şəxsi məlumatlar"
          to="/dashboard/freelancer/profile"
        />
      </div>
      <div className="py-4">
        <h1 className="text-blue-600 font-bold text-xl md:ml-8 ml-2 mb-2">Hesab</h1>
        <Sidebarelement
          icon={<FaRegStar size={16} />}
          text="Gözaltılar"
          to="bookmarks"
        />
        <Sidebarelement
          icon={<RiUserSettingsLine size={16} />}
          text="Profil ayarları"
          to="settings"
        />
        <Sidebarelement
          icon={<IoPower size={16} />}
          text="Çıxış"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Sidebar;
