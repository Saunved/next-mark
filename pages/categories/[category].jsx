import React from "react";
import PropTypes from "prop-types";
import GenericPostFeed from "components/GenericPostFeed";
import { importSingleCategoryPostsMeta } from "helpers/importPostsMeta";
import { capitalize } from "utils/capitalize";
import { meta } from "constants/propTypes";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const articlesMeta = await importSingleCategoryPostsMeta(params.category);

  return {
    props: {
      articles: articlesMeta,
      category: params.category,
    },
  };
}

function PostCategory({ articles, category }) {
  const capitalizedCategory = capitalize(category || "");
  return <GenericPostFeed postsMeta={articles} title={capitalizedCategory} />;
}

PostCategory.propTypes = {
  articles: PropTypes.arrayOf(meta).isRequired,
  category: PropTypes.string.isRequired,
};

export default PostCategory;
