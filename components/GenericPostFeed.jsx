import React from "react";
import PropTypes from "prop-types";
import HomeSidebar from "./HomeSidebar";
import PostList from "./PostList";
import { meta } from "../constants/propTypes";

function GenericPostFeed({ title, postsMeta }) {
  return (
    <div className="md:grid grid-cols-12 py-12 gap-12">
      <div className="col-span-8">
        <h2 className="text-xl uppercase mb-4 tracking-wider font-bold">
          {title}
        </h2>
        <section className="md:grid grid-cols-2 gap-4">
          {!postsMeta || !postsMeta.length ? (
            <div>No posts found for this category</div>
          ) : (
            <PostList posts={postsMeta} />
          )}
        </section>
      </div>
      <div className="col-span-4">
        <HomeSidebar />
      </div>
    </div>
  );
}

GenericPostFeed.propTypes = {
  title: PropTypes.string.isRequired,
  postsMeta: PropTypes.arrayOf(meta).isRequired,
};

export default GenericPostFeed;
