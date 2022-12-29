import React from "react";
import PropTypes from "prop-types";
import { importAll } from "../helpers/importAll";
import GenericPostFeed from "../components/GenericPostFeed";

export async function getStaticProps() {
  const articles = await importAll();

  const isFirstPostOfSeries = (order) => order === 1;
  const isStandalonePost = (order) => !order;
  const isTechPost = (categories) => categories?.includes("tech");

  const articlesMeta = articles
    .map((article) => (article?.meta ? article.meta : null))
    .filter((_meta) => !isTechPost(_meta?.categories))
    .filter(
      (_meta) =>
        isStandalonePost(_meta.order) || isFirstPostOfSeries(_meta.order)
    )
    .map((_meta) => ({ ..._meta, credit: "" }));

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
