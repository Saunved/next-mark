import React from "react";
import PropTypes from "prop-types";
import { importAll } from "../helpers/importAll";
import GenericPostFeed from "../components/GenericPostFeed";
import { meta } from "../constants/propTypes";

export async function getStaticProps() {
  const articles = await importAll("");

  const articlesMeta = articles
    .map((article) => (article?.meta ? article.meta : null))
    .filter((_meta) => _meta?.categories?.includes("tech"));

  return {
    props: {
      articles: articlesMeta,
    },
  };
}

export default function Series({ articles }) {
  return <GenericPostFeed postsMeta={articles} title="Tech" />;
}

Series.propTypes = {
  articles: PropTypes.arrayOf(meta).isRequired,
};
