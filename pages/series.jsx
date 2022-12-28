import React from "react";
import PropTypes from "prop-types";
import { importAll } from "../helpers/importAll";
import series from "../constants/series";
import GenericPostFeed from "../components/GenericPostFeed";
import { meta } from "../constants/propTypes";

export async function getStaticProps() {
  const articles = await importAll("");

  const isFirstPostOfSeries = (order) => order === 1;

  const articlesMeta = articles
    .map((article) => (article?.meta ? article.meta : null))
    .filter((_meta) => isFirstPostOfSeries(_meta.order))
    .map((_meta) => {
      // eslint-disable-next-line no-underscore-dangle
      const _series = series.find((serie) => serie.seriesId === _meta.seriesId);
      if (_series) {
        return {
          ..._meta,
          title: _series.series,
          description: _series.description,
          slug: `/series/${_series.seriesId}`,
          parts: articles.filter(
            (article) => article?.meta.seriesId === _series.seriesId
          ).length,
        };
      }

      return null;
    })
    .filter((_meta) => _meta);

  return {
    props: {
      articles: articlesMeta,
    },
  };
}

export default function Series({ articles }) {
  return (
    <GenericPostFeed
      postsMeta={articles}
      title="Series"
      cardType="collection"
    />
  );
}

Series.propTypes = {
  articles: PropTypes.arrayOf(meta).isRequired,
};
