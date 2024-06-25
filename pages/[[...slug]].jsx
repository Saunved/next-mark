import BlogPost from 'components/BlogPost';
import React from 'react';
import PropTypes from 'prop-types';
import { fetchRelatedPosts } from "lib/related";
import { getAllFileNames, getAllDirs, fetchAllPostsMeta } from "lib/indices";
import GenericPostFeed from 'components/GenericPostFeed';
import feedTypes from 'constants/feedTypes';
import Link from 'next/link';
import SectionTitle from 'components/SectionTitle';
import { CaretRight } from 'phosphor-react';
import { getMdxContent } from '../lib/md';

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
        const nestedPosts = (await fetchAllPostsMeta((meta) => !meta.slug.includes('index') && (mdxContent?.frontmatter.filter ? meta?.tags?.includes(mdxContent?.frontmatter.filter) : (meta.slug.includes(slug) && !nestedDirs.some(dir => meta.slug.includes(dir))))))


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
                !post || isIndex ? null :
                    <BlogPost relatedPosts={relatedPosts} meta={{ ...frontmatter, author: frontmatter?.author }} isIndex={isIndex}>
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
                        <SectionTitle>Explore further</SectionTitle>
                        {
                            nestedPosts.length ? null :
                                <p className='italic text-gray-500 -mt-2'>{frontmatter.description}</p>
                        }
                        <div className="grid mt-4">
                            {
                                mdxDirs.map((dir) => (
                                    <Link href={dir.slug} key={dir.slug} className='col-span-4 py-3 flex items-center justify-between gap-4 border-b dark:border-gray-700 text-xl'>{dir.frontmatter.title || dir.slug} <CaretRight size={24} /> </Link>
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
    mdxDirs: PropTypes.array,
    // eslint-disable-next-line react/require-default-props
    isIndex: PropTypes.bool
};

export default PostPage;