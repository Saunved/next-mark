import path from "path";
import fs from "fs";
import BlogPost from 'components/BlogPost';
import React from 'react';
import PropTypes from 'prop-types';
import blogConfig from 'blog.config.mjs';
import { getMdxContent } from '../lib/md';

export async function getStaticPaths() {
    const contentDirectory = path.join(process.cwd(), 'content');
    const filenames = fs.readdirSync(contentDirectory);
    const paths = filenames.map((filename) => {
        const slug = filename.replace(/\.md$/, '').split('/');
        return { params: { slug } };
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {

    const slugArray = params.slug;
    const slug = slugArray.join('/');
    const { post, frontmatter } = await getMdxContent(slug);

    return {
        props: {
            post,
            frontmatter,
            relatedPosts: []
        },
    };
}

function PostPage({ post, frontmatter, relatedPosts }) {
    // eslint-disable-next-line react/jsx-props-no-spreading, react/prop-types
    return <BlogPost relatedPosts={relatedPosts} meta={{ ...frontmatter, author: frontmatter?.author || blogConfig.author }}>
        <div dangerouslySetInnerHTML={{ __html: post }}>
        </div>
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