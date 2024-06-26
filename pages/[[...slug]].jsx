import BlogPost from 'components/BlogPost';
import React from 'react';
import PropTypes from 'prop-types';
import { fetchRelatedPosts } from "lib/related";
import { getAllFileNames, getAllDirs, fetchAllPostsMeta } from "lib/indices.mjs";
import GenericPostFeed from 'components/GenericPostFeed';
import feedTypes from 'constants/feedTypes';
import Link from 'next/link';
import SectionTitle from 'components/SectionTitle';
import { getMdxContent } from '../lib/md.mjs';

export async function getStaticPaths() {
    const filePaths = await getAllFileNames();
    let paths = filePaths.map((filename) => {
        const slug = filename.replace(/\.md$/, '').split("/");
        return { params: { slug } };
    });

    const dirs = (await getAllDirs()).map(dir => ({ params: { slug: dir.split("/") } }))
    paths = paths.concat(dirs).concat({ params: { slug: [] } }) // The empty array is added to catch the home page.

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const dirs = (await getAllDirs()).concat("")
    const slugArray = params.slug;

    // For the homepage, "" is necessary
    const slug = slugArray?.join('/') || "";

    if (dirs.includes(slug)) {

        let mdxContent = { post: "", frontmatter: { slug } }
        try {
            mdxContent = await getMdxContent(`${slug}/index`)
            mdxContent.frontmatter.slug = slug;

            if (!mdxContent.frontmatter.explorer) {
                mdxContent.frontmatter.explorer = {}
            }

            if (!mdxContent.frontmatter.feed) {
                mdxContent.frontmatter.feed = {}
            }

            if (mdxContent.frontmatter?.explorer?.enabled === undefined) {
                mdxContent.frontmatter.explorer.enabled = true;
            }

            if (mdxContent.frontmatter?.feed?.enabled === undefined) {
                mdxContent.frontmatter.feed.enabled = true;
            }

        } catch (error) {
            // Do nothing
        }

        const countSlashes = (str) => (str.match(/\//g) || []).length

        const nestedDirs = (await getAllDirs(slug)).filter((dir) => !slug ? countSlashes(slug) === countSlashes(dir) : dir)
            .filter(dir => !dir.includes("assets"))

        // This filter is quite convoluted, but it works for now, so not changing it
        // If the index page has a tag filter, respect it
        // Otherwise, apply a default filter
        // Always ignore "index" pages
        const nestedPosts = (await fetchAllPostsMeta((meta) => !meta.slug.includes('index') && (mdxContent?.frontmatter?.feed?.filter ? meta?.tags?.includes(mdxContent?.frontmatter?.feed?.filter) : (meta.slug.includes(slug) && !nestedDirs.some(dir => meta.slug.includes(dir))))))


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
                mdxDirs,
                isIndex: true
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

function PostPage({ post, frontmatter, relatedPosts, nestedPosts = [], mdxDirs = [], isIndex = false }) {

    return (
        <>
            {
                !post ? null :
                    <BlogPost relatedPosts={relatedPosts} meta={{ ...frontmatter, author: frontmatter?.author }} isIndex={isIndex}>
                        {/* eslint-disable-next-line react/no-danger */}
                        <div dangerouslySetInnerHTML={{ __html: post }} />
                    </BlogPost>
            }

            {
                !nestedPosts.length || !frontmatter.feed.enabled ? null :
                    <section id={frontmatter.slug} className='mb-8'>
                        <GenericPostFeed postsMeta={nestedPosts} title={frontmatter?.feed?.title || frontmatter.title || frontmatter.slug} feedDescription={frontmatter?.feed?.description ?? frontmatter.description} feedType={feedTypes.imageList} />
                    </section>
            }

            {
                !mdxDirs.length || !frontmatter.explorer.enabled ? null :
                    <div className='mb-12'>
                        <SectionTitle>{frontmatter?.explorer?.title ?? "Explore more"}</SectionTitle>
                        <p className='italic text-gray-500 -mt-2'>{frontmatter.explorer.description ?? ""}</p>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            {
                                mdxDirs.map((dir) => (
                                    <Link href={dir.slug} key={dir.slug} className='col-span-1 dark:hover:bg-gray-600 hover:bg-gray-200 dark:border-gray-600 border-gray-300 border p-4 rounded-lg shadow'>
                                        <p className='text-xl'>{dir.frontmatter.title || dir.slug}</p>
                                        <p className='text-sm'>{dir.frontmatter.description}</p>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
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
    mdxDirs: PropTypes.array,
    // eslint-disable-next-line react/require-default-props
    isIndex: PropTypes.bool
};

export default PostPage;