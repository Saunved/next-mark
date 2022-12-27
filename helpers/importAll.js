import path from "path";
import fs from "fs";

// eslint-disable-next-line import/prefer-default-export
export const importAll = async (dir) => {
  const postsDirectory = path.join(process.cwd(), `./pages/${dir}`);
  const postFilenames = fs
    .readdirSync(postsDirectory)
    .filter((name) => name.includes(".mdx"));

  const postModules = await Promise.all(
    postFilenames.map(async (p) => import(`../pages/${p}`))
  );

  return postModules;
};
