import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostList from "components/PostList";
import { meta } from "constants/propTypes";
import BreadCrumbs from "components/BreadCrumbs";

function GenericPostFeed({ title, postsMeta, cardType = "standalone" }) {
  const [breadCrumbLinks, setBreadCrumbLinks] = useState([]);

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

  return (
    <div>
      <BreadCrumbs links={breadCrumbLinks} />
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
