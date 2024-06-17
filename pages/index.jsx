import React from "react";
import PropTypes from "prop-types";
import { importFeaturedPostsMeta } from "helpers/importPostsMeta";
import GenericPostFeed from "components/GenericPostFeed";
import feedTypes from "constants/feedTypes";
import Link from "next/link";

export async function getStaticProps() {
  const featuredPosts = await importFeaturedPostsMeta();

  return {
    props: {
      featuredPosts
    },
  };
}

export default function Home({ featuredPosts }) {
  return (<div className="grid gap-12">
    <section id="featured">
      <GenericPostFeed postsMeta={featuredPosts} title="Featured posts" feedType={feedTypes.imageGrid} />
    </section>

    <section>
      <h2 className="text-xl">Series</h2>
      <Link href="/tags/other-access">Other Access</Link>
    </section>

  </div>
  )
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  featuredPosts: PropTypes.array.isRequired,
};
