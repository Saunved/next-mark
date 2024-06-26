import path from "path";
import fs from "fs";
import { deepReadDir } from "../helpers/deepReadDir.mjs";
// eslint-disable-next-line
import { getEnhancedFrontmatter, getFileContents, getMatterData } from "./md.mjs";

const shouldFileBeIgnored = (str) => str.includes("_") || str.includes("/_");
const isValidPost = (str) => str.includes(".mdx") || str.includes(".md");

export const getAllFileNames = async (dir = "content") => {
    const postsDirectory = path.join(process.cwd(), dir);
    return (await deepReadDir(postsDirectory))
        .flat(Number.POSITIVE_INFINITY)
        .filter(name => !name.includes("assets"))
        .map((name) => name.split(`/${dir}/`)[1]);
}

export const getAllDirs = async (filePath = "", dir = "content") => {
    const dirs = [];
    const postsDirectory = path.join(process.cwd(), dir, filePath);

    const collectDirs = async (dirPath) => {
        const dirents = fs.readdirSync(dirPath, { withFileTypes: true });
        // eslint-disable-next-line consistent-return
        const promises = dirents.map(async (dirent) => {
            const innerPath = path.join(dirPath, dirent.name);
            if (dirent.isDirectory()) {
                dirs.push(innerPath);
                return collectDirs(innerPath);
            }
        });
        await Promise.all(promises);
    };

    await collectDirs(postsDirectory);
    return dirs.map((name) => name.split(`/${dir}/`)[1]);
};

// eslint-disable-next-line import/prefer-default-export
export const fetchAllPostsMeta = async (filter, ignorePages = true) => {
    const postFilenames = (await getAllFileNames())
        .filter((name) => isValidPost(name) && !shouldFileBeIgnored(name))

    return postFilenames.map(filename => {
        const fileContents = getFileContents(filename.split(".md")[0])
        const matterData = getMatterData(fileContents)
        const frontmatter = getEnhancedFrontmatter(matterData.data, matterData.excerpt, fileContents);

        return { ...frontmatter, slug: `/${filename.split(".md")[0]}` };
    })
        .filter(meta => ignorePages ? !meta.page : true)
        .filter((meta) => meta.title)
        .filter(filter || (() => true))
        .sort(
            (meta1, meta2) => new Date(meta2.date) - new Date(meta1.date)
        )
        .map(({ title, slug, author = "", tags = null, image = null, readTime = null, categories = null, description = "", date = null, alt = null, alias = "", aliases = [] }) => ({
            alt,
            author,
            categories,
            date,
            description,
            readTime,
            title,
            image,
            credit: "",
            tags,
            slug,
            alias,
            aliases
        }));
};

export const indexFilters = {
    featured: (meta) => meta?.tags?.includes("featured")
}