import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export interface INotice {
  username: string;
  date: string;
  notice: string;
  id: number;
  creatorId: number;
  noticeId: number;
}
const Notice = ({
  username,
  date,
  notice,
  id,
  creatorId,
  noticeId,
}: INotice) => {
  const { currentUser } = useContext(AuthContext);
  const user = localStorage.getItem("user");
  const deleteNotice = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:8080/notice/delete/${noticeId}`,
        {
          headers: {
            authorization: "Bearer " + user,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-4 shadow-2xl p-5 border border-gray-400 rounded-xl">
      <div className="flex gap-5">
        <img
          className="w-7 rounded-3xl"
          src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
        />
        <div>
          <h5>{username}</h5>
          <h6>{date.slice(0, 10)}</h6>
        </div>
      </div>
      <div>{notice}</div>
      <div className="flex justify-end">
        {" "}
        {(id === currentUser?.id || currentUser?.id === creatorId) && (
          <img
            className="w-5 hover:cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
            onClick={deleteNotice}
          />
        )}
      </div>
    </div>
  );
};

export default Notice;
