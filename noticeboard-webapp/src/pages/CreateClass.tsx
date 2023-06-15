import axios from "axios";
import moment from "moment";
import React, { useState } from "react";

const CreateClass = () => {
  const colors = ["red", "orange", "blue", "pink", "green", "yellow", "aqua"];
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const user = localStorage.getItem("user");
  const createClass = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const color = colors[Math.floor(Math.random() * colors.length)];
    const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const data = {
      title,
      code,
      color,
      date,
    };
    const res = await axios.post("http://localhost:8080/class/addClass", data, {
      headers: {
        authorization: "Bearer " + user,
      },
    });
    console.log(res);
  };
  return (
    <div
      className="flex flex-col justify-center items-center gap-3 mt-10"
      //   style={{ height: "90vh" }}
    >
      <div className=" w-96 flex flex-col gap-3">
        <div className="border-4 p-10 flex items-center justify-center">
          <h2 className="font-bold text-2xl">Create a class</h2>
        </div>
        <div className=" border-2 p-10 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold font-mono">Class Code</h2>
            <input
              onChange={(e) => setCode(e.target.value)}
              className="border-2 p-3"
              placeholder="Class Code"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-bold font-mono">Class Title</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 p-3"
              placeholder="Class Title"
            />
          </div>
          <div>
            <button
              onClick={createClass}
              className="bg-blue-500 p-2 w-24 text-white rounded-3xl hover:bg-white hover:text-black"
            >
              Create
            </button>
          </div>
        </div>
        <div>
          <strong>Create a class</strong>
          <br />
          - Use authorized account
          <br />- Share class code for others to join
        </div>
      </div>
    </div>
  );
};

export default CreateClass;
