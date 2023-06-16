import axios from "axios";
import React, { useState } from "react";

const JoinClass = () => {
  const [code, setCode] = useState("");
  const user = localStorage.getItem("user");
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(code);
    try {
      const res = await axios.post(
        "http://localhost:8080/class/joinClass",
        {
          code,
        },
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
    <div
      className="flex flex-col justify-center items-center gap-3 mt-10"
      //   style={{ height: "90vh" }}
    >
      <div className=" w-96 flex flex-col gap-3">
        <div className="border-4 p-10 flex items-center justify-center">
          <h2 className="font-bold text-2xl">Join a class</h2>
        </div>
        <div className=" border-2 p-10 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold font-mono">Class Code</h2>
            <input
              onChange={(e) => setCode(e.target.value)}
              value={code}
              className="border-2 p-3"
              placeholder="Class Code"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 p-2 w-24 text-white rounded-3xl hover:bg-white hover:text-black"
            >
              Join
            </button>
          </div>
        </div>
        <div>
          <strong>Join a class</strong>
          <br />
          - Use authorized account
          <br />- Ask for the class code to join
        </div>
      </div>
    </div>
  );
};

export default JoinClass;
