import React from "react";
import PropTypes from "prop-types";
import PostPreview from "./PostPreview";

function PostList({ posts }) {
  return (
    <>
      {posts.map((article) => (
        <PostPreview
          className="col-span-1"
          postMeta={article}
          key={article.slug}
        />
      ))}
    </>
  );
}

export default PostList;

PostList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array.isRequired,
};
