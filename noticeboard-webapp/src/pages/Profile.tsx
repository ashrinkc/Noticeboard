import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem("user", "");
    setCurrentUser(null);
    navigate("/");
  };
  const handleImageUpload = () => {
    inputFileRef.current?.click();
  };

  const user = localStorage.getItem("user");
  const changePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        alert("Incorrect passwords");
        return;
      }
      const res = await axios.put(
        "http://localhost:8080/user/update",
        {
          newPassword,
          oldPassword,
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

  const [profilePic, setProfilePic] = useState<File | Blob | null | any>(null);

  useEffect(() => {
    if (profilePic) {
      sendImageToBackend(profilePic);
    }
  }, [profilePic]);

  const sendImageToBackend = async (profilePic: string) => {
    try {
      console.log(profilePic);
      const res = await axios.post(
        `http://localhost:8080/user/img`,
        {
          profilePic,
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

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiletoBase(file);
    }
  };

  const setFiletoBase = (file: File | Blob | null | any) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
    }
  };
  const upload = async () => {
    console.log(profilePic);
    try {
      if (profilePic) {
        setFiletoBase(profilePic);
        console.log(profilePic);
        const res = await axios.post(
          "http://localhost:8080/user/img",
          { profilePic },
          {
            headers: {
              authorization: "Bearer " + user,
            },
          }
        );
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="py-10 flex flex-col justify-center items-center">
      <h2 className=" font-semibold font-serif text-3xl self-center">
        PROFILE
      </h2>
      <div className=" my-5 shadow-2xl p-10 flex  gap-7 ">
        <div>
          <img
            className=" h-64 cursor-pointer"
            src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
            onClick={handleImageUpload}
          />
          <input
            onChange={onImageChange}
            ref={inputFileRef}
            style={{ display: "none" }}
            type="file"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h1 className=" font-semibold font-serif text-2xl">
              Username: {currentUser?.username}
            </h1>
            <h1 className=" font-semibold font-serif text-xl">
              Email: {currentUser?.email}
            </h1>
            <h1 className=" font-semibold font-serif text-xl">
              UserType: {currentUser?.userType}
            </h1>
            <h1 className=" font-semibold font-serif text-xl">
              Password:{" "}
              <a
                className="text-blue-500 underline cursor-pointer"
                onClick={handleOpen}
              >
                *****
              </a>
            </h1>
          </div>
          <div>
            <button
              onClick={logout}
              className="p-2 font-serif bg-blue-500 text-white rounded-sm hover:bg-white hover:text-black"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col justify-center items-center gap-5">
            <h2 className="font-semibold font-serif text-xl">
              Change Password
            </h2>
            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border-2 p-2 w-full"
              placeholder="Old password"
            />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-2 p-2 w-full"
              placeholder="New password"
            />
            <input
              className="border-2 p-2 w-full"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={changePassword}
              className="p-2 w-full font-serif bg-blue-500 text-white rounded-sm hover:bg-white hover:text-black"
            >
              Confirm
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
