import path from "path";
import fs from "fs";
import series from "constants/series";

const shouldFileBeIgnored = (str) => str.includes("_") || str.includes("/_");
const isMdxFile = (str) => str.includes(".mdx");
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
    .filter((name) => isMdxFile(name) && !shouldFileBeIgnored(name))
    .map((name) => name.split("/pages/")[1]);

  const postModules = await Promise.all(
    postFilenames.map(async (p) => import(`../pages/${p}`))
  );

  return postModules
    .filter((post) => post.meta)
    .sort(
      (post1, post2) => new Date(post2.meta.date) - new Date(post1.meta.date)
    )
    .map((article) => ({ ...article.meta, credit: "" }));
};

export const importTechPostsMeta = async () => {
  const allTechPosts = await importAllPostsMeta();
  return allTechPosts.filter((_meta) => _meta?.categories?.includes("tech"));
};

export const importSeriesPostsMeta = async () => {
  const allSeriesPosts = await importAllPostsMeta();
  return allSeriesPosts
    .filter((_meta) => isFirstPostOfSeries(_meta.order))
    .map((_meta) => {
      // eslint-disable-next-line no-underscore-dangle
      const _series = series.find((serie) => serie.seriesId === _meta.seriesId);
      if (_series) {
        return {
          ..._meta,
          title: _series.series,
          description: _series.description,
          slug: `/series/${_series.seriesId}`,
          parts: allSeriesPosts.filter(
            (__meta) => __meta.seriesId === _series.seriesId
          ).length,
        };
      }

      return null;
    });
};

export const importSingleSeriesPostsMeta = async (singleSeries) => {
  const allPostsMeta = await importAllPostsMeta();
  return allPostsMeta.filter((_meta) => _meta.seriesId === singleSeries);
};

export const importSingleCategoryPostsMeta = async (singleCategory) => {
  const allPostsMeta = await importAllPostsMeta();

  return allPostsMeta
    .filter((_meta) => _meta?.categories?.includes(singleCategory))
    .filter((_meta) => !_meta.order || _meta.order === 1);
};
