import path from "path";
import { deepReadDir } from "./deepReadDir";
import blogConfig from "blog.config.mjs";

const shouldFileBeIgnored = (str) => str.includes("_") || str.includes("/_");
const isValidPost = (str) => str.includes(".mdx") || str.includes(".md");

export const getRelatedPosts = (postMeta, allPosts) => {
  if (!postMeta?.tags) {
    return [];
  }

  return allPosts.filter(post => post?.tags && post.tags.some((tag) => postMeta.tags.includes(tag)))
}

export const importAllPostsMeta = async () => {
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

const allPosts = await importAllPostsMeta();

export const importPostsWithTag = async (tag) => allPosts.filter(post => post?.tags && post.tags.includes(tag))

export const importTechPostsMeta = () => importPostsWithTag("tech");
export const importFeaturedPostsMeta = () => importPostsWithTag("featured");