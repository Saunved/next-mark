import React from "react";
import PropTypes from "prop-types";
import { fetchFeaturedPostsMeta } from "helpers/posts";
import GenericPostFeed from "components/GenericPostFeed";
import feedTypes from "constants/feedTypes";
import Link from "next/link";
import SectionTitle from "components/SectionTitle";

export async function getStaticProps() {
  const featuredPosts = await fetchFeaturedPostsMeta();

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
      <SectionTitle>All series</SectionTitle>
      <div className="grid gap-2">
        <Link href="/tags/other-access">Other Access</Link>
        <Link href="/tags/seychelles">Adventures in Seychelles</Link>
      </div>
    </section>
  </div>
  )
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  featuredPosts: PropTypes.array.isRequired,
};
