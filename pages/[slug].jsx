import { fetchAllPostsMeta, fetchPost } from 'helpers/posts';
import BlogPost from 'components/BlogPost';
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import PropTypes from 'prop-types';
import { CH } from "@code-hike/mdx/components"
import blogConfig from 'blog.config.mjs';

const components = { CH };

export async function getStaticPaths() {
    const allPosts = await fetchAllPostsMeta();
    const paths = allPosts.map((post) => ({
        // eslint-disable-next-line no-underscore-dangle
        params: { slug: post.slug },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {

    try {
        const mdxSource = await fetchPost(params.slug, "md");

        return {
            props: {
                mdxSource,
            },
        };
    } catch (error) {
        console.error("Error during MDX serialization", error)
        throw error;
    }
}

function PostPage({ mdxSource }) {
    // eslint-disable-next-line react/jsx-props-no-spreading, react/prop-types
    return <BlogPost meta={{ ...mdxSource.frontmatter, author: mdxSource?.frontMatter?.author || blogConfig.author }}><MDXRemote {...mdxSource} components={components} /></BlogPost>
}

PostPage.propTypes = {
    mdxSource: PropTypes.shape({
        compiledSource: PropTypes.string.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        scope: PropTypes.object,
        // eslint-disable-next-line react/forbid-prop-types
        frontmatter: PropTypes.object,
    }).isRequired,
};

export default PostPage;