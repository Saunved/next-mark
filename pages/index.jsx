import React from "react";
import PropTypes from "prop-types";
import { fetchAllPostsMeta, indexFilters } from "lib/indices";
import GenericPostFeed from "components/GenericPostFeed";
import feedTypes from "constants/feedTypes";
import Link from "next/link";
import SectionTitle from "components/SectionTitle";
import { getMdxContent } from "lib/md";

export async function getStaticProps() {
  const featuredPosts = await fetchAllPostsMeta(indexFilters.featured);
  const { post } = await getMdxContent("index");

  return {
    props: {
      post,
      featuredPosts
    },
  };
}

export default function Home({ featuredPosts, post = "" }) {
  return (<div className="grid gap-8">
    {
      !post ? null :
        <section className="prose prose-neutral dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: post }} />
        </section>
    }

    {
      !featuredPosts.length ? null :
        <section id="featured">
          <GenericPostFeed postsMeta={featuredPosts} title="Featured posts" feedType={feedTypes.imageList} />
        </section>
    }

    <section>
      <SectionTitle>Explore more</SectionTitle>
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
  // eslint-disable-next-line react/require-default-props
  post: PropTypes.string
};
