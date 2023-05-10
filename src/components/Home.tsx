import React from "react";
import Header from "./Header/Header";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Header isHome={true} />
      <div className="bg-zinc-900 text-white">
        <div>Home</div>
      </div>
    </>
  );
};

export default Home;
