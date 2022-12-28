import React from "react";
import PropTypes from "prop-types";
import GenericPostFeed from "../../components/GenericPostFeed";
import { importAll } from "../../helpers/importAll";
import { capitalize } from "../../utils/capitalize";
import { meta } from "../../constants/propTypes";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const articles = await importAll("");

  const articlesMeta = articles
    .map((article) => (article?.meta ? article.meta : null))
    .filter((_meta) => _meta?.categories?.includes(params.category))
    .filter((_meta) => !_meta.order || _meta.order === 1);

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
