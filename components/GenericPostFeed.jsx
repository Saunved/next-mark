import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostList from "components/PostList";
import { meta } from "constants/propTypes";
import BreadCrumbs from "components/BreadCrumbs";

function GenericPostFeed({ title, postsMeta, cardType = "standalone" }) {
  const POSTS_TO_LOAD = 4;
  const [breadCrumbLinks, setBreadCrumbLinks] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [postsToShow, setPostsToShow] = useState(4);
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    setVisiblePosts(postsMeta.slice(0, postsToShow));

    if (postsToShow >= postsMeta.length) {
      setShowLoadMore(false)
    } else {
      setShowLoadMore(true);
    }

  }, [postsMeta, postsToShow])

  useEffect(() => {
    const getBreadCrumbLinks = () => {
      if (document.location.pathname === "/") {
        return [];
      }

      const postIsFromSeries = document.location.pathname.includes("/series/");

      const links = [
        {
          href: "/",
          title: "Home",
        },
      ];

      if (postIsFromSeries) {
        links.push({
          href: "/series",
          title: "Series",
        });
      }

      links.push({
        href: document.location.href,
        title,
        disabled: true,
      });

      return links;
    };

    setBreadCrumbLinks(getBreadCrumbLinks());
  }, [title]);

  const onClickLoadMore = () => {
    setPostsToShow(postsToShow + POSTS_TO_LOAD)
  }

  return (
    <div>
      <BreadCrumbs links={breadCrumbLinks} />
      <h2 className="text-3xl mb-4 dark:text-gray-200 font-semibold">
        {title}
      </h2>
      <section className="sm:grid grid-cols-2 gap-6 mt-4">
        {!postsMeta || !postsMeta.length ? (
          <div>No posts found for this category</div>
        ) : (
          <PostList posts={visiblePosts} cardType={cardType} />
        )}
      </section>
      {
        !showLoadMore ? null : (<div className="text-center mt-4">
          <button type="button" onClick={onClickLoadMore} className="dark:bg-gray-700 dark:text-gray-200 rounded-md px-4 py-2 text-md border border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-50">
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
};

GenericPostFeed.defaultProps = {
  cardType: "standalone",
};

export default GenericPostFeed;
