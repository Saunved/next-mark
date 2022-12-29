import React from "react";
import PropTypes from "prop-types";
import { importTechPostsMeta } from "helpers/importPostsMeta";
import GenericPostFeed from "components/GenericPostFeed";
import { meta } from "constants/propTypes";

export async function getStaticProps() {
  const articlesMeta = await importTechPostsMeta();

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
