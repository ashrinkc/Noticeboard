import React, { useEffect, useState } from "react";
import Notice, { INotice } from "../components/Notice";
import Users, { IUser } from "../components/Users";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const Notices = () => {
  const data = [
    {
      username: "Ash",
      date: "2022-12-12",
      notice:
        "Dear Students If you require your coursework to be reviewed by me (Sarun Dahal) and require feedbacks, I will be available in the college tomorrow, between 8 A.M and 10:00 A.M. Kindly get your coursework reviewed in person at that time.It is highly encouraged that the students get their reports reviewed in person as we have felt that it is rather impossible to review each report through email, as it does not equate the same as an in-person review. We are simply  unable to provide proper feedback as an in-person review due to obvious  barriers in communication. Hope to see you all tomorrow!Thank you!",
    },
    {
      username: "Jack",
      date: "2022-12-12",
      notice:
        "Dear Students If you require your coursework to be reviewed by me (Sarun Dahal) and require feedbacks, I will be available in the college tomorrow, between 8 A.M and 10:00 A.M. Kindly get your coursework reviewed in person at that time.It is highly encouraged that the students get their reports reviewed in person as we have felt that it is rather impossible to review each report through email, as it does not equate the same as an in-person review. We are simply  unable to provide proper feedback as an in-person review due to obvious  barriers in communication. Hope to see you all tomorrow!Thank you!",
    },
    {
      username: "John",
      date: "2022-12-12",
      notice:
        "Dear Students If you require your coursework to be reviewed by me (Sarun Dahal) and require feedbacks, I will be available in the college tomorrow, between 8 A.M and 10:00 A.M. Kindly get your coursework reviewed in person at that time.It is highly encouraged that the students get their reports reviewed in person as we have felt that it is rather impossible to review each report through email, as it does not equate the same as an in-person review. We are simply  unable to provide proper feedback as an in-person review due to obvious  barriers in communication. Hope to see you all tomorrow!Thank you!",
    },
  ];
  //   const users = [
  //     {
  //       username: "Ash",
  //     },
  //     {
  //       username: "Jack",
  //     },
  //     {
  //       username: "John",
  //     },
  //   ];
  const [notice, setNotice] = useState("");
  const user = localStorage.getItem("user");
  const location = useLocation();
  const state = useLocation().state;
  const classId = location.pathname.split("/")[2];
  const createNotice = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      const data = {
        notice,
        classId,
        date,
      };
      const res = await axios.post(
        "http://localhost:8080/notice/addNotice",
        data,
        {
          headers: {
            authorization: "Bearer " + user,
          },
        }
      );
      console.log(res.data);
      setNotice("");
    } catch (err) {
      console.log(err);
    }
  };
  const [getNotice, setGetNotice] = useState([]);
  useEffect(() => {
    const getNotice = async () => {
      const res = await axios.get(
        `http://localhost:8080/notice/getNotice/${classId}`
      );
      setGetNotice(res.data);
    };
    getNotice();
  }, [notice]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(
        `http://localhost:8080/class/classUser/${classId}`
      );
      setUsers(res.data);
    };
    getUsers();
  });
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div
        className="p-10 md:h-[40vh] text-white w-[80%] flex flex-col gap-5 justify-end rounded-xl"
        style={{ backgroundColor: `${state.color}` }}
      >
        <h1 className=" font-bold text-4xl">
          {" "}
          {state.code} | {state.title}
        </h1>
        <h3 className="font-semibold text-xl">{state.date.slice(0, 10)}</h3>
      </div>
      <div className="w-[80%] flex justify-between gap-6 mt-5">
        <div className="w-[20%] shadow-2xl p-5 border border-gray-400 rounded-xl">
          <h3>Users:</h3>
          <div>
            {users.map((item: IUser) => (
              <Users username={item.username} />
            ))}
          </div>
        </div>
        <div className="w-[80%] flex flex-col gap-10">
          <div className="flex gap-3 w-[100%] shadow-2xl p-5 border border-gray-400 rounded-xl">
            <img
              className="w-10 rounded-3xl"
              src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
            />
            <input
              className="flex-grow border-none outline-none"
              placeholder="Write an announcement"
              onChange={(e) => setNotice(e.target.value)}
              value={notice}
            />
            <button
              onClick={createNotice}
              className="text-blue-700 font-semibold"
            >
              POST
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {getNotice.map((item: INotice) => (
              <Notice
                username={item.username}
                notice={item.notice}
                date={item.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notices;
