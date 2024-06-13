import path from "path";
import fs from "fs";
import series from "constants/series";

const shouldFileBeIgnored = (str) => str.includes("_") || str.includes("/_");
const isValidPost = (str) => str.includes(".mdx") || str.includes(".md");
const isFirstPostOfSeries = (order) => order === 1;

// https://stackoverflow.com/a/71166133
const deepReadDir = async (dirPath) =>
  Promise.all(
    fs.readdirSync(dirPath, { withFileTypes: true }).map(async (dirent) => {
      const innerPath = path.join(dirPath, dirent.name);
      return dirent.isDirectory() ? deepReadDir(innerPath) : innerPath;
    })
  );

export const importAllPostsMeta = async () => {
  const postsDirectory = path.join(process.cwd(), "pages");
  const postFilenames = (await deepReadDir(postsDirectory))
    .flat(Number.POSITIVE_INFINITY)
    .filter((name) => isValidPost(name) && !shouldFileBeIgnored(name))
    .map((name) => name.split("/pages/")[1]);

  const postModules = await Promise.all(
    postFilenames.map(async (p) => import(`../pages/${p}`))
  );

  return postModules
    .map((post, index) => ({ ...post, _path: `/${postFilenames[index].split('.')[0]}` }))
    .filter((post) => post.title && !post.page)
    .sort(
      (post1, post2) => new Date(post2.date) - new Date(post1.date)
    )
    .map(({ author, title, _path, tags = null, image = null, readTime = null, categories = null, description = null, date = null, alt = null }) => ({
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

export const importTechPostsMeta = async () => {
  const allTechPosts = (await importAllPostsMeta()).filter(post => post.slug.includes("/tech/"));
  return allTechPosts;
};

export const importSeriesPostsMeta = async () => {
  const allSeriesPosts = (await importAllPostsMeta()).filter(post => post.slug.includes("/series/"));

  return allSeriesPosts
    .filter((post) => isFirstPostOfSeries(post.order))
    .map((post) => {
      const seriesId = post.slug.split("/")[2];
      // eslint-disable-next-line no-underscore-dangle
      const _series = series.find((serie) => serie.seriesId === seriesId);
      if (!_series) {
        return null;
      }

      return {
        ...post,
        title: _series.series,
        description: _series.description,
        slug: `/series/${_series.seriesId}`,
        parts: allSeriesPosts.filter(
          (_post) => _post.seriesId === _series.seriesId
        ).length,
      };
    });
};

export const importSingleSeriesPostsMeta = async (singleSeries) => {
  const allPostsMeta = await importAllPostsMeta();
  return allPostsMeta.filter((_meta) => _meta.seriesId === singleSeries).sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const importSingleCategoryPostsMeta = async (singleCategory) => {
  const allPostsMeta = await importAllPostsMeta();

  return allPostsMeta
    .filter((_meta) => _meta?.categories?.includes(singleCategory))
    .filter((_meta) => !_meta.order || _meta.order === 1);
};
