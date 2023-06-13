import React from "react";

const JoinClass = () => {
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
            <input className="border-2 p-3" placeholder="Class Code" />
          </div>
          <div>
            <button className="bg-blue-500 p-2 w-24 text-white rounded-3xl hover:bg-white hover:text-black">
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
