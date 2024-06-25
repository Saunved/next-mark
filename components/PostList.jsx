import React from "react";
import PropTypes from "prop-types";
import PostPreviewCard from "components/PostPreviewCard";
import PostPreviewListItem from "components/PostPreviewListItem";
import feedTypes from "constants/feedTypes";
import PostPreviewSimpleListItem from "./PostPreviewSimpleListItem";
import SideImagePreview from "./SideImagePreview";

function PostList({ posts, cardType, feedType }) {

  switch (feedType) {
    case feedTypes.imageList:
      return (
        <section className="sm:grid grid-cols-1 gap-2 mt-2">
          {posts.map((article) => (
            <SideImagePreview key={article.slug}
              className="col-span-1"
              postMeta={article}
              cardType={cardType}
              feedType={feedType}
            />
          ))}
        </section>
      )
    case feedTypes.simpleList:
      return (
        <section className="sm:grid grid-cols-1 gap-2 mt-2">
          <ul className="list-disc px-8">
            {posts.map((article) => (
              <li className="list-item" key={article.slug}>
                <PostPreviewSimpleListItem
                  className="col-span-1"
                  postMeta={article}
                  key={article.slug}
                  cardType={cardType}
                  feedType={feedType}
                />
              </li>
            ))}
          </ul>
        </section>
      )
    case feedTypes.listWithDescription:
      return (
        <section className="sm:grid grid-cols-1 gap-2 mt-2">
          {posts.map((article) => (
            <PostPreviewListItem
              className="col-span-1"
              postMeta={article}
              key={article.slug}
              cardType={cardType}
              feedType={feedType}
            />
          ))}
        </section>
      )
    case feedTypes.imageGrid:
      return (
        <section className="sm:grid grid-cols-2 gap-6 mt-2">
          {posts.map((article) => (
            <PostPreviewCard
              className="col-span-1"
              postMeta={article}
              key={article.slug}
              cardType={cardType}
              feedType={feedType}
            />
          ))}
        </section>
      )
    default:
      break;
  }
}

export default PostList;

PostList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array.isRequired,
  cardType: PropTypes.string.isRequired,
  feedType: PropTypes.string.isRequired
};
