import path from "path";
import blogConfig from "blog.config.mjs";
import { serialize } from "next-mdx-remote/serialize";
import mdxConfig from "mdx.config.mjs";
import fs from "fs";
import { deepReadDir } from "./deepReadDir";

const shouldFileBeIgnored = (str) => str.includes("_") || str.includes("/_");
const isValidPost = (str) => str.includes(".mdx") || str.includes(".md");

export const getRelatedPosts = (postMeta, allPosts) => {
  if (!postMeta?.tags) {
    return [];
  }

  return allPosts.filter(post => post?.tags && post.tags.some((tag) => postMeta.tags.includes(tag)))
}

export const fetchPost = async (slug, ext) => {
  const postsDirectory = path.join(process.cwd(), 'content');
  const fullPath = path.join(postsDirectory, `${slug}.${ext}`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  try {
    return await serialize(fileContents, {
      mdxOptions: mdxConfig,
      parseFrontmatter: true
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error during MDX serialization", error)
    throw error;
  }
}

export const fetchAllPostsMeta = async () => {
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
    .filter((post) => post.title && !post.page)
    .sort(
      (post1, post2) => new Date(post2.date) - new Date(post1.date)
    )
    .map(({ title, _path, author = blogConfig.author, tags = null, image = null, readTime = null, categories = null, description = null, date = null, alt = null }) => ({
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

const allPosts = await fetchAllPostsMeta();

export const fetchPostsWithTag = async (tag) => allPosts.filter(post => post?.tags && post.tags.includes(tag))
export const fetchTechPostsMeta = () => fetchPostsWithTag("tech");
export const fetchFeaturedPostsMeta = () => fetchPostsWithTag("featured");