import React from "react";
import PropTypes from "prop-types";
import HomeSidebar from "./HomeSidebar";
import PostList from "./PostList";
import { meta } from "../constants/propTypes";

function GenericPostFeed({ title, postsMeta, cardType = "standalone" }) {
  return (
    <div className="md:grid grid-cols-12 py-12 gap-12">
      <div className="col-span-8">
        <h2 className="text-2xl mb-4 dark:text-gray-200 font-semibold">
          {title}
        </h2>
        <section className="sm:grid grid-cols-2 gap-6 mt-4">
          {!postsMeta || !postsMeta.length ? (
            <div>No posts found for this category</div>
          ) : (
            <PostList posts={postsMeta} cardType={cardType} />
          )}
        </section>
      </div>
      <div className="col-span-4 mt-8">
        <HomeSidebar />
      </div>
    </div>
  );
}

GenericPostFeed.propTypes = {
  title: PropTypes.string.isRequired,
  postsMeta: PropTypes.arrayOf(meta).isRequired,
  cardType: PropTypes.string,
};

GenericPostFeed.defaultProps = {
  cardType: "standalone",
};

export default GenericPostFeed;
