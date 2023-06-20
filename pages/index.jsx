import React from "react";
import PropTypes from "prop-types";
import { importAllPostsMeta, importSeriesPostsMeta, importTechPostsMeta } from "helpers/importPostsMeta";
import GenericPostFeed from "components/GenericPostFeed";

export async function getStaticProps() {
  const posts = await importAllPostsMeta();
  const seriesMeta = await importSeriesPostsMeta();
  const techMeta = await importTechPostsMeta();

  const isTechPost = (categories) => categories?.includes("tech");
  const isSeriesPost = (slug) => slug?.includes("series");

  const storiesMeta = posts
    .filter(
      (_meta) => !isTechPost(_meta?.categories) && !isSeriesPost(_meta?.slug)
    )

  return {
    props: {
      stories: storiesMeta,
      series: seriesMeta,
      tech: techMeta
    },
  };
}

export default function Home({ stories, series, tech }) {
  return (<div className="grid gap-12">
    <section id="stories">
      <GenericPostFeed postsMeta={stories} title="All stories" />
    </section>
    <section id="series">
      <GenericPostFeed postsMeta={series} title="All series" cardType="collection" />
    </section>
    <section id="tech" className="mb-12">
      <GenericPostFeed postsMeta={tech} title="All tech posts" />
    </section>
  </div>
  )
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  stories: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  series: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tech: PropTypes.array.isRequired
};
