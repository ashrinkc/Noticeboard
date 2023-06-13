import React from "react";

interface IData {
  code: string;
  title: string;
  date: string;
  name: string;
}
const NoticeContainer = ({ code, title, date, name }: IData) => {
  return (
    <div className="flex flex-col w-96 h-64 bg-white ">
      <div className="h-[30%] bg-blue-500 p-2">
        <h1 className="truncate font-bold">
          {code}-{title}
        </h1>
        <h5 className=" font-serif font-semibold text-sm">{date}</h5>
        <h5 className=" font-serif font-semibold text-sm">{name}</h5>
      </div>
      <div className="h-[50%] border-2"></div>
      <div className="h-[20%] border-t-4 border-2 flex items-center justify-end pr-2 ">
        <img
          className="w-5 hover:cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
        />
      </div>
    </div>
  );
};

export default NoticeContainer;
