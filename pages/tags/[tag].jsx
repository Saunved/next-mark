import React from "react";
import PropTypes from "prop-types";
import { importAllPostsMeta, importPostsWithTag } from "helpers/importPostsMeta";
import GenericPostFeed from "components/GenericPostFeed";
import feedTypes from "constants/feedTypes";
import { getAllTags } from "helpers/tags";
import blogConfig from "blog.config.mjs";

export async function getStaticPaths() {
    const allPostsMeta = await importAllPostsMeta();
    const availableTags = await getAllTags(allPostsMeta);
    const paths = availableTags.map((tag) => `/tags/${tag}`);
    return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
    const { tag } = params;
    const posts = ((await importPostsWithTag(tag)).sort((a, b) => new Date(a.date) - new Date(b.date))) || [];

    return {
        props: {
            posts,
            tagMeta: blogConfig.tags[tag] || { title: `${tag} posts`, description: "" }
        },
    };
}

export default function Home({ posts = [], tagMeta }) {

    return (<div className="grid gap-12">

        <section id="tech">
            <GenericPostFeed postsMeta={posts} title={`${tagMeta.title}`} feedType={feedTypes.simpleList} feedDescription={tagMeta.description} />
        </section>

    </div>
    )
}

Home.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    posts: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    tagMeta: PropTypes.object.isRequired
};
