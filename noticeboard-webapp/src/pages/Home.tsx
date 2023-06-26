import React, { useContext, useEffect, useState } from "react";
import NoticeContainer, { IData } from "../components/NoticeContainer";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Pagination from "../components/Pagination";

const Home = () => {
  const user = localStorage.getItem("user");
  const [classData, setClassData] = useState<IData[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  useEffect(() => {
    const getJoinedClass = async () => {
      try {
        const res = await axios.get("http://localhost:8080/class/joinedClass", {
          headers: {
            authorization: "Bearer " + user,
          },
        });
        console.log(res.data);
        setClassData(res.data);
        setTotalPosts(res.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    getJoinedClass();
  }, []);
  const { currentUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = classData.slice(firstPostIndex, lastPostIndex);
  return (
    <div
      className="flex flex-col p-10"
      // style={{ height: "90vh" }}
    >
      <div className=" flex flex-wrap gap-12 mb-4">
        {currentPosts.map((items: IData) => (
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
      <div className="border-2 p-3 w-[97%]">
        <Pagination
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Home;
