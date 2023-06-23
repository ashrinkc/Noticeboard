import React, { useContext, useEffect, useState } from "react";
import NoticeContainer, { IData } from "../components/NoticeContainer";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const user = localStorage.getItem("user");
  const [classData, setClassData] = useState<IData[]>([]);
  useEffect(() => {
    // const getClass = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:8080/class/getClass", {
    //       headers: {
    //         authorization: "Bearer " + user,
    //       },
    //     });
    //     setClassData((prevData) => [...prevData, ...res.data]);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    const getJoinedClass = async () => {
      try {
        const res = await axios.get("http://localhost:8080/class/joinedClass", {
          headers: {
            authorization: "Bearer " + user,
          },
        });
        console.log(res.data);
        setClassData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getJoinedClass();
    // getClass();
  }, []);
  const data = [
    {
      code: "CS60NI",
      title: "ARTIFICIAL INTELLIGENCE",
      date: "2022-02-02",
      name: "Ashrin K.C",
      color: "red",
    },
    {
      code: "CS60NI",
      title: "ARTIFICIAL INTELLIGENCE",
      date: "2022-02-02",
      name: "Ashrin K.C",
      color: "aqua",
    },
    {
      code: "CS60NI",
      title: "ARTIFICIAL INTELLIGENCE",
      date: "2022-02-02",
      name: "Ashrin K.C",
      color: "green",
    },
  ];
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="px-9 py-10 flex flex-wrap gap-10">
      {classData.map((items: IData) => (
        <NoticeContainer
          id={items.id}
          code={items.code}
          username={items.username}
          title={items.title}
          date={items.date}
          color={items.color}
          creatorId={items?.creatorId}
          userId={items?.userId}
        />
      ))}
    </div>
  );
};

export default Home;
