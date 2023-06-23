import React from "react";
import { Link, useNavigate } from "react-router-dom";

export interface IData {
  id: number;
  code: string;
  title: string;
  date: string;
  username: string;
  color: string;
  creatorId?: number;
  userId?: number;
}

const NoticeContainer = ({
  id,
  code,
  title,
  date,
  username,
  color,
  creatorId,
  userId,
}: IData) => {
  const noticeClass = {
    id,
    code,
    title,
    date,
    username,
    color,
  };
  const navigate = useNavigate();
  return (
    <Link to={`/n/${id}`} state={noticeClass}>
      <div className="flex flex-col w-96 h-64 bg-white ">
        <div className={`h-[30%] p-2`} style={{ backgroundColor: `${color}` }}>
          <h1 className="truncate font-bold">
            {code}-{title.toUpperCase()}
          </h1>
          <h5 className=" font-serif font-semibold text-sm">
            {date.slice(0, 10)}
          </h5>
          <h5 className=" font-serif font-semibold text-sm">
            {username.toUpperCase()}
          </h5>
        </div>
        <div className="h-[50%] border-2"></div>
        <div className="h-[20%] border-t-4 border-2 flex items-center justify-end pr-2 ">
          {creatorId ? (
            <img
              className="w-5 hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
            />
          ) : (
            <img
              className="w-5 hover:cursor-pointer"
              src="data:image/png;base64,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"
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default NoticeContainer;
