import path from "path";
import blogConfig from "blog.config.mjs";
import { serialize } from "next-mdx-remote/serialize";
import mdxConfig from "mdx.config.mjs";
import fs from "fs";
import { deepReadDir } from "./deepReadDir";
import memoize from "./memoize";

const shouldFileBeIgnored = (str) => str.includes("_") || str.includes("/_");
const isValidPost = (str) => str.includes(".mdx") || str.includes(".md");

export const fetchAllPostsMeta = async (ignorePages = true) => {
  const postsDirectory = path.join(process.cwd(), "content");
  const postFilenames = (await deepReadDir(postsDirectory))
    .flat(Number.POSITIVE_INFINITY)
    .filter((name) => isValidPost(name) && !shouldFileBeIgnored(name))
    .map((name) => name.split("/content/")[1]);

  const postModules = await Promise.all(
    postFilenames.map(async (p) => import(`../content/${p}`))
  );

  return postModules
    .map((post, index) => ({ ...post, _path: `/${postFilenames[index].split('.')[0]}` }))
    .filter((post) => post.title && (ignorePages && !post.page))
    .sort(
      (post1, post2) => new Date(post2.date) - new Date(post1.date)
    )
    .map(({ title, _path, author = blogConfig.author, tags = null, image = null, readTime = null, categories = null, description = "", date = null, alt = null }) => ({
      alt,
      author,
      categories,
      date,
      description,
      image,
      readTime,
      title,
      credit: "",
      tags,
      slug: _path
    }));

};

export const memoizedFetchAllPostsMeta = memoize(fetchAllPostsMeta)
const allPosts = await memoizedFetchAllPostsMeta();

export const fetchPostsWithTag = async (tag) => allPosts.filter(post => post?.tags && post.tags.includes(tag))
export const fetchTechPostsMeta = () => fetchPostsWithTag("tech");
export const fetchFeaturedPostsMeta = () => fetchPostsWithTag("featured");

export const fetchRelatedPosts = (postMeta, slug) => {

  if (!postMeta?.tags) {
    return [];
  }

  return allPosts.filter(
    (post) =>
      post.slug.split("/")[1] !== slug &&
      post.tags &&
      post.tags.some((tag) => postMeta.tags.includes(tag) && tag !== "featured")
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

}

export const fetchPost = async (slug, ext) => {
  const postsDirectory = path.join(process.cwd(), 'content');
  const fullPath = path.join(postsDirectory, `${slug.join("/")}.${ext}`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  try {
    const mdxSource = await serialize(fileContents, {
      mdxOptions: mdxConfig,
      parseFrontmatter: true
    });

    const relatedPosts = fetchRelatedPosts(mdxSource.frontmatter, slug)

    return {
      mdxSource,
      relatedPosts
    }

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error during MDX serialization", error)
    throw error;
  }
}