import React from "react";
import PropTypes from "prop-types";
import { importAllPostsMeta } from "helpers/importPostsMeta";
import GenericPostFeed from "components/GenericPostFeed";

export async function getStaticProps() {
  const articles = await importAllPostsMeta();

  const isTechPost = (categories) => categories?.includes("tech");

  const articlesMeta = articles.filter(
    (_meta) => !isTechPost(_meta?.categories)
  );

  return {
    props: {
      articles: articlesMeta,
    },
  };
}

export default function Home({ articles }) {
  return <GenericPostFeed postsMeta={articles} title="Latest posts" />;
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
};
