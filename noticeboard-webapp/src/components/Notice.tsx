import React from "react";

export interface INotice {
  username: string;
  date: string;
  notice: string;
}
const Notice = ({ username, date, notice }: INotice) => {
  return (
    <div className="flex flex-col gap-4 shadow-2xl p-5 border border-gray-400 rounded-xl">
      <div className="flex gap-5">
        <img
          className="w-7 rounded-3xl"
          src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
        />
        <div>
          <h5>{username}</h5>
          <h6>{date}</h6>
        </div>
      </div>
      <div>{notice}</div>
      <div className="flex justify-end">
        {" "}
        <img
          className="w-5 hover:cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
        />
      </div>
    </div>
  );
};

export default Notice;
