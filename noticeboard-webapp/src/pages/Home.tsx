import React from "react";
import NoticeContainer from "../components/NoticeContainer";

const Home = () => {
  const data = [
    {
      code: "CS60NI",
      title: "ARTIFICIAL INTELLIGENCE",
      date: "2022-02-02",
      name: "Ashrin K.C",
    },
    {
      code: "CS60NI",
      title: "ARTIFICIAL INTELLIGENCE",
      date: "2022-02-02",
      name: "Ashrin K.C",
    },
  ];
  return (
    <div className="px-9 py-10 flex flex-wrap gap-10">
      {data.map((items) => (
        <NoticeContainer
          code={items.code}
          name={items.name}
          title={items.title}
          date={items.date}
        />
      ))}
    </div>
  );
};

export default Home;
