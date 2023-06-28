import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

interface GResponse {
  clientid: string;
  client_id: string;
  credential: string;
  select_by: string;
}

interface IUser {
  email: string;
  name: string;
  given_name: string;
}

const GoogleLogin = ({ type }: { type: "Log" | "Reg" }) => {
  const [showGlogin, setShowGlogin] = useState<boolean>(true);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  async function handleCallbackResponse(response: GResponse) {
    const user: IUser = jwt_decode(response.credential);
    console.log(user);
    const data = {
      email: user.email,
      username: user.name,
      password: user.given_name,
      userType: "User",
    };
    try {
      if (type === "Reg") {
        const res = await axios.post(
          "http://localhost:8080/user/register",
          data
        );
        console.log(res.data);
      }
      if (type === "Log") {
        const { userType, email, ...val } = data;
        const res = await axios.post("http://localhost:8080/user/login", val);
        console.log(res.data);
        setCurrentUser(res.data.others);
        localStorage.setItem("user", res.data.token);

        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (showGlogin) {
      /* Global Google */
      window.google.accounts.id.initialize({
        client_id:
          "1030143982163-elutq796kn42i5aqvdphku47kkk5nbvp.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, [showGlogin]);

  if (showGlogin) {
    return (
      <div>
        <div id="signInDiv"></div>
      </div>
    );
  }
};

export default GoogleLogin;
