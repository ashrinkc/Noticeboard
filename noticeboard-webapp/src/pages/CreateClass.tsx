import React from "react";

const CreateClass = () => {
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
            <input className="border-2 p-3" placeholder="Class Code" />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-bold font-mono">Class Title</h2>
            <input className="border-2 p-3" placeholder="Class Title" />
          </div>
          <div>
            <button className="bg-blue-500 p-2 w-24 text-white rounded-3xl hover:bg-white hover:text-black">
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
