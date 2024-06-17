import React from "react";
import PropTypes from "prop-types";
import { importAllPostsMeta, importPostsWithTag } from "helpers/importPostsMeta";
import GenericPostFeed from "components/GenericPostFeed";
import feedTypes from "constants/feedTypes";
import { getAllTags } from "helpers/tags";

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
            tag
        },
    };
}

export default function Home({ posts = [], tag }) {
    return (<div className="grid gap-12">

        <section id="tech">
            <GenericPostFeed postsMeta={posts} title={`${tag} posts`} feedType={feedTypes.simpleList} />
        </section>

    </div>
    )
}

Home.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    posts: PropTypes.array.isRequired,
    tag: PropTypes.string.isRequired
};
