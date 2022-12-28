import React from "react";
import PropTypes from "prop-types";
import GenericPostFeed from "../../components/GenericPostFeed";
import { importAll } from "../../helpers/importAll";
import { meta } from "../../constants/propTypes";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const articles = await importAll();

  const articlesMeta = articles
    .map((article) => (article?.meta ? article.meta : null))
    .filter((_meta) => _meta.seriesId === params.series);

  return {
    props: {
      articles: articlesMeta,
      series:
        articlesMeta && articlesMeta.length
          ? articlesMeta[0].series
          : params.series,
    },
  };
}

function PostSeries({ articles, series }) {
  return <GenericPostFeed postsMeta={articles} title={series} />;
}

PostSeries.propTypes = {
  articles: PropTypes.arrayOf(meta).isRequired,
  series: PropTypes.string.isRequired,
};

export default PostSeries;
