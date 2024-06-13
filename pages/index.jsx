import React from "react";
import PropTypes from "prop-types";
import { importAllPostsMeta } from "helpers/importPostsMeta";
import GenericPostFeed from "components/GenericPostFeed";

export async function getStaticProps() {
  const posts = await importAllPostsMeta();

  return {
    props: {
      posts
    },
  };
}

export default function Home({ posts }) {
  return (<div className="grid gap-12">
    <section id="stories">
      <GenericPostFeed postsMeta={posts} title="All posts" />
    </section>
  </div>
  )
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array.isRequired,
};
