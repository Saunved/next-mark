import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostList from "components/PostList";
import { meta } from "constants/propTypes";
import feedTypes from "constants/feedTypes";

function GenericPostFeed({ title, postsMeta, cardType = "standalone", feedType }) {
  const POSTS_TO_LOAD = 4;
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [postsToShow, setPostsToShow] = useState(10);
  const [visiblePosts, setVisiblePosts] = useState(postsMeta.slice(0, postsToShow));

  useEffect(() => {
    setVisiblePosts(postsMeta.slice(0, postsToShow));

    if (postsToShow >= postsMeta.length) {
      setShowLoadMore(false)
    } else {
      setShowLoadMore(true);
    }

  }, [postsMeta, postsToShow])

  const onClickLoadMore = () => {
    setPostsToShow(postsToShow + POSTS_TO_LOAD)
  }

  return (
    <div>
      <h2 className="text-lg mb-4 uppercase tracking-widest font-semibold dark:text-gray-400 text-gray-600">
        {title}
      </h2>
      <div>
        {!postsMeta || !postsMeta.length ? (
          <div>No posts found for this category</div>
        ) : (
          <PostList posts={visiblePosts} cardType={cardType} feedType={feedType} />
        )}
      </div>
      {
        !showLoadMore ? null : (<div className="text-center mt-4">
          <button type="button" onClick={onClickLoadMore} className="dark:bg-gray-700 dark:text-gray-200 rounded-md px-4 py-2 text-md border border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-50 cursor:pointer">
            Load more
          </button>
        </div>)
      }

    </div>
  );
}

GenericPostFeed.propTypes = {
  title: PropTypes.string.isRequired,
  postsMeta: PropTypes.arrayOf(meta).isRequired,
  cardType: PropTypes.string,
  feedType: PropTypes.string
};

GenericPostFeed.defaultProps = {
  cardType: "standalone",
  feedType: feedTypes.listWithDescription
};

export default GenericPostFeed;
