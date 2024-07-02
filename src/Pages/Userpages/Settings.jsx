

import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdLockOutline } from "react-icons/md";

import profile from "../../assets/user-128.svg";

const Settings = () => {
  const [user, setUser] = useState({
    name: '',
    phone: '',
    userrole: '',
    email: '',
    avatar: '',
    currentpassword: '',
    newpassword1: '',
    newpassword2: ''
  });

  const getUser = async () => {
    const response = await fetch("https://busy-az-api-b6d690c9bf5a.herokuapp.com/api/user", {
      method: "GET",
      credentials: "include"
    });

    const data = await response.json();

    setUser(data.user);
    console.log(data);
  }

  const updateProfile = async () => {
    const formData = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      currentpassword: document.getElementById('currentpassword').value,
      newpassword1: document.getElementById('newpassword1').value,
      newpassword2: document.getElementById('newpassword2').value,
    };

    const res = await fetch("https://busy-az-api-b6d690c9bf5a.herokuapp.com/api/user/update", {
      method: 'PUT',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (res.ok) {
      alert('Profil başarıyla güncellendi');
    } else {
      alert('Güncelleme sırasında bir hata oluştu');
      console.log(data);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className="flex justify-center w-full">
      <div className="w-11/12">
        <h1 className="py-10 text-2xl font-normal">Profil</h1>
        <div className="w-full shadow-custom mb-10">
          <div className="border-b border-gray-300 min-h-10 p-6">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <CgProfile />
              <h1>Mənim hesabım</h1>
            </div>
          </div>
          <div className="sm:p-10 py-10 gap-5 w-full flex flex-col xl:flex-row">
            <div className="w-2/12 pl-6">
              <img
                className=" sm:block hidden min-w-40 bg-slate-200 rounded-sm"
                src={user.avatar ? user.avatar : profile}
                alt=""
              />
            </div>
            <div className="flex w-10/12 flex-col">
              <div className="w-full flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 sm:px-6 pl-3">
                  <h5 className="py-3">Ad-soyad</h5>
                  <input
                    className="border p-2 rounded-sm w-full"
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    id="name"
                  />
                </div>
                <div className="w-full sm:w-1/2 sm:px-6 pl-3">
                  <h5 className="py-3">Mobil telefon</h5>
                  <input
                    className="border p-2 rounded-sm w-full"
                    type="text"
                    name="phone"
                    defaultValue={user.phone}
                    id="phone"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 sm:px-6 pl-3">
                  <h5 className="py-3">hesabın növü</h5>
                  <div className="bg-green-600 flex items-center justify-center cursor-pointer text-white p-2 rounded-sm w-full">
                    {user.userrole}
                  </div>
                </div>
                <div className="w-full sm:w-1/2 sm:px-6 pl-3">
                  <h5 className="py-3">E-poçt ünvanı</h5>
                  <input
                    className="border p-2 rounded-sm w-full"
                    type="text"
                    name="email"
                    defaultValue={user.email}
                    id="email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full shadow-custom">
          <div className="border-b border-gray-300 min-h-10 p-6">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <MdLockOutline />
              <h1>Təhlükəsizlik</h1>
            </div>
          </div>
          <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-6">
            <div className="px-6">
              <h5 className="py-3">indiki parol</h5>
              <input 
                name="currentpassword" 
                className="border p-2 rounded-sm w-full" 
                type="password" 
                id="currentpassword"
              />
            </div>
            <div className="px-6">
              <h5 className="py-3">yeni parol</h5>
              <input 
                name="newpassword1" 
                className="border p-2 rounded-sm w-full" 
                type="password" 
                id="newpassword1"
              />
            </div>
            <div className="px-6">
              <h5 className="py-3">yeni parolu təkrarla</h5>
              <input 
                name="newpassword2" 
                className="border p-2 rounded-sm w-full" 
                type="password" 
                id="newpassword2"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center h-36">
          <button 
            className="w-36 h-12 rounded-md text-white bg-blue-500"
            onClick={updateProfile}
          >
            Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
