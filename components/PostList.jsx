import React from "react";
import PropTypes from "prop-types";
import PostPreview from "components/PostPreview";

function PostList({ posts, cardType }) {
  return (
    <>
      {posts.map((article) => (
        <PostPreview
          className="col-span-1"
          postMeta={article}
          key={article.slug}
          cardType={cardType}
        />
      ))}
    </>
  );
}

export default PostList;

PostList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array.isRequired,
  cardType: PropTypes.string.isRequired,
};
