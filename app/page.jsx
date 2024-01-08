import Feed from "@components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Open AI Blog</span>
        <p className="desc text-center">
          ChatGPT is an open-source AI blogging tool for modern world to
          discover, create and share creative ideas
        </p>
      </h1>
      <Feed />
    </section>
  );
};

export default Home;
