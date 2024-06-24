import BlogPost from 'components/BlogPost';
import React from 'react';
import PropTypes from 'prop-types';
import blogConfig from 'blog.config.mjs';
import { fetchRelatedPosts } from "lib/related";
import { getAllFileNames, getAllDirs, fetchAllPostsMeta } from "lib/indices";
import GenericPostFeed from 'components/GenericPostFeed';
import feedTypes from 'constants/feedTypes';
import Link from 'next/link';
import SectionTitle from 'components/SectionTitle';
import { getMdxContent } from '../lib/md';
import { ArrowRight, CaretRight, TagChevron } from 'phosphor-react';

export async function getStaticPaths() {
    const filePaths = await getAllFileNames();
    let paths = filePaths.map((filename) => {
        const slug = filename.replace(/\.md$/, '').split("/");
        return { params: { slug } };
    });

    const dirs = (await getAllDirs()).map(dir => ({ params: { slug: dir.split("/") } }))
    paths = paths.concat(dirs)

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const dirs = (await getAllDirs())
    const slugArray = params.slug;
    const slug = slugArray.join('/');

    if (dirs.includes(slug)) {

        let mdxContent = { post: "", frontmatter: { slug } }
        try {
            mdxContent = await getMdxContent(`${slug}/index`)
            mdxContent.frontmatter.slug = slug;
            // @TODO: Consider moving all index.jsx logic here
        } catch (error) {
            // Do nothing
        }

        const nestedDirs = (await getAllDirs(slug))

        // Very convoluted way of obtaining all posts that are just 1-level nested, refactor if time permits
        const nestedPosts = (await fetchAllPostsMeta((meta) => meta.slug.includes(slug) && !meta.slug.includes('index')))
            .filter((meta) => !nestedDirs.some(dir => meta.slug.includes(dir)))

        const mdxDirs = await Promise.all(nestedDirs.map(async (dir) => {
            try {
                const mdx = await getMdxContent(`${dir}/index`);
                mdx.frontmatter.slug = slug;
                mdx.post = "";

                return { frontmatter: mdx.frontmatter, slug: dir };
            } catch (error) {
                return { frontmatter: {}, slug: dir };
            }
        }));


        return {
            props: {
                post: mdxContent.post,
                frontmatter: mdxContent.frontmatter,
                relatedPosts: [],
                nestedPosts,
                mdxDirs
            }
        }
    }

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

function PostPage({ post, frontmatter, relatedPosts, nestedPosts = [], mdxDirs = [] }) {
    return (
        <>
            {
                !post ? null :
                    <BlogPost relatedPosts={relatedPosts} meta={{ ...frontmatter, author: frontmatter?.author || blogConfig.author }}>
                        {/* eslint-disable-next-line react/no-danger */}
                        <div dangerouslySetInnerHTML={{ __html: post }} />
                    </BlogPost>
            }


            {
                !nestedPosts.length ? null :
                    <section id={frontmatter.slug} className='mb-8'>
                        <GenericPostFeed postsMeta={nestedPosts} title={frontmatter.title || frontmatter.slug} feedDescription={frontmatter.description || ""} feedType={feedTypes.imageList} />
                    </section>
            }

            {
                !mdxDirs.length ? null :
                    <>
                        <SectionTitle>{`Explore in "${frontmatter.title || frontmatter.slug}"`}</SectionTitle>
                        {
                            nestedPosts.length ? null :
                                <p className='italic text-gray-500 -mt-2'>{frontmatter.description}</p>
                        }
                        <div className="grid mt-4">
                            {
                                mdxDirs.map((dir) => (
                                    <Link href={dir.slug} key={dir.slug} className='col-span-4 pb-4 flex items-center justify-between gap-4 border-b dark:border-gray-700 text-xl'>{dir.frontmatter.title || dir.slug} <CaretRight size={24} /> </Link>
                                ))
                            }
                        </div >
                    </>
            }
        </>)
}

PostPage.propTypes = {
    post: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    frontmatter: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    relatedPosts: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
    nestedPosts: PropTypes.array,
    // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
    mdxDirs: PropTypes.array
};

export default PostPage;