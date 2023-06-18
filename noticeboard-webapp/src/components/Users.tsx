import React from "react";

export interface IUser {
  username: string;
}
const Users = ({ username }: IUser) => {
  return (
    <div className="flex gap-5 items-center mt-5">
      <img
        className="w-10 rounded-3xl"
        src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
      />
      <div>
        <h5>{username}</h5>
      </div>
    </div>
  );
};

export default Users;
