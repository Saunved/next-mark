import path from "path";
import fs from "fs";

const doesStringStartWithUnderscore = (str) => str[0] === "_";
const isMdxFile = (str) => str.includes(".mdx");

// eslint-disable-next-line import/prefer-default-export
export const importAll = async () => {
  const postsDirectory = path.join(process.cwd(), "pages");
  const postFilenames = fs
    .readdirSync(postsDirectory)
    .filter((name) => isMdxFile(name) && !doesStringStartWithUnderscore(name));

  const postModules = await Promise.all(
    postFilenames.map(async (p) => import(`../pages/${p}`))
  );

  return postModules;
};
