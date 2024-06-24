import BlogPost from 'components/BlogPost';
import React from 'react';
import PropTypes from 'prop-types';
import blogConfig from 'blog.config.mjs';
import { fetchRelatedPosts } from "lib/related";
import { getAllFileNames } from "lib/indices";
import { getMdxContent } from '../lib/md';

export async function getStaticPaths() {
    const filePaths = await getAllFileNames();
    const paths = filePaths.map((filename) => {
        const slug = filename.replace(/\.md$/, '').split("/");
        return { params: { slug } };
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {

    const slugArray = params.slug;
    const slug = slugArray.join('/');
    const { post, frontmatter } = await getMdxContent(slug);
    const relatedPosts = await fetchRelatedPosts(frontmatter);

    return {
        props: {
            post,
            frontmatter,
            relatedPosts
        },
    };
}

function PostPage({ post, frontmatter, relatedPosts }) {
    // eslint-disable-next-line react/jsx-props-no-spreading, react/prop-types
    return <BlogPost relatedPosts={relatedPosts} meta={{ ...frontmatter, author: frontmatter?.author || blogConfig.author }}>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: post }} />
    </BlogPost>
}

PostPage.propTypes = {
    post: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    frontmatter: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    relatedPosts: PropTypes.array.isRequired
};

export default PostPage;