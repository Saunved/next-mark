import { importAllPostsMeta } from 'helpers/importPostsMeta';
import BlogPost from 'components/BlogPost';
import React from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote';
import PropTypes from 'prop-types';
import { CH } from "@code-hike/mdx/components"
import mdxOptions from '../mdx.options.mjs';

const components = { CH };

export async function getStaticPaths() {
    const allPosts = await importAllPostsMeta();
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

    const postsDirectory = path.join(process.cwd(), 'content');
    const fullPath = path.join(postsDirectory, `${params.slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    try {
        const mdxSource = await serialize(fileContents, {
            mdxOptions,
            parseFrontmatter: true
        });

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
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <BlogPost meta={mdxSource.frontmatter}><MDXRemote {...mdxSource} components={components} /></BlogPost>
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