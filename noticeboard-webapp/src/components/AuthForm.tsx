import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import GoogleLogin from "./GoogleLogin";

const AuthForm = ({ isLogin }: { isLogin?: boolean }) => {
  const [regInput, setRegInput] = useState({
    username: "",
    email: "",
    password: "",
    userType: "User",
    confirmPassword: "",
  });
  const [logInput, setLogInput] = useState({
    username: "",
    password: "",
  });

  const regHandleChange = (e: React.ChangeEvent<HTMLButtonElement> | any) => {
    e.preventDefault();
    setRegInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setRegInput({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "User",
    });
  };

  //To register a user
  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { confirmPassword, ...inputs } = regInput;
    if (inputs.password !== confirmPassword) {
      alert("Incorrect passwords");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/user/register",
        inputs
      );
      console.log(res);
      resetForm();
    } catch (err) {
      console.log(err);
      resetForm();
    }
  };

  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  //For user login
  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/user/login",
        logInput
      );
      setCurrentUser(res.data.others);
      localStorage.setItem("user", res.data.token);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogChange = (e: React.ChangeEvent<HTMLButtonElement> | any) => {
    e.preventDefault();
    setLogInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return !isLogin ? (
    <div className="flex flex-col items-center justify-center gap-16 h-screen bg-gray-50">
      <h1 className=" text-4xl font-bold font-serif">Register your account</h1>
      <div className="flex flex-col gap-6 shadow-2xl p-16 bg-white rounded-2xl">
        <input
          placeholder="Username"
          name="username"
          className="border-b-2 border-gray-300 p-1"
          value={regInput.username}
          onChange={regHandleChange}
        />
        <input
          placeholder="Email"
          name="email"
          className="border-b-2 border-gray-300 p-1"
          value={regInput.email}
          onChange={regHandleChange}
        />
        <input
          placeholder="Password"
          name="password"
          className="border-b-2 border-gray-300 p-1"
          type="password"
          value={regInput.password}
          onChange={regHandleChange}
        />
        <input
          placeholder="Confirm Password"
          className="border-b-2 border-gray-300 p-1"
          type="password"
          value={regInput.confirmPassword}
          name="confirmPassword"
          onChange={regHandleChange}
        />
        <button
          onClick={register}
          className="bg-blue-500 text-white p-1 font-serif text-sm  hover:text-blue-500 hover:bg-white rounded-md "
        >
          Register
        </button>
        <div>
          <small className="font-thin font-serif">
            {/* <Link to={"/gRegister"}>Sign up with google</Link> */}
            <GoogleLogin type="Reg" />
          </small>
        </div>
      </div>
      <h6 className="font-bold text-sm font-serif">
        Already have an account? <Link to={"/login"}>Login</Link>
      </h6>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-16 h-screen bg-gray-50">
      <h1 className=" text-4xl font-bold font-serif">Log In</h1>
      <div className="flex flex-col gap-6 shadow-2xl p-16 bg-white rounded-2xl">
        <input
          placeholder="Username"
          className="border-b-2 border-gray-300 p-1"
          name="username"
          value={logInput.username}
          onChange={handleLogChange}
        />
        <input
          placeholder="Password"
          className="border-b-2 border-gray-300 p-1"
          name="password"
          type="password"
          value={logInput.password}
          onChange={handleLogChange}
        />
        <button
          onClick={login}
          className="bg-blue-500 text-white font-serif p-1 text-sm  hover:text-blue-500 hover:bg-white rounded-md "
        >
          Login
        </button>
        <div>
          <small className="font-thin font-serif">
            <GoogleLogin type="Log" />
          </small>
        </div>
      </div>
      <h6 className="font-bold text-sm font-serif">
        Dont have an account?<Link to={"/register"}>Register</Link>
      </h6>
    </div>
  );
};

export default AuthForm;
