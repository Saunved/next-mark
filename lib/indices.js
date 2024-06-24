import blogConfig from "blog.config.mjs";
import path from "path";
import { deepReadDir } from "../helpers/deepReadDir";
import { getFileContents, getMatterData } from "./md";

const shouldFileBeIgnored = (str) => str.includes("_") || str.includes("/_");
const isValidPost = (str) => str.includes(".mdx") || str.includes(".md");


const getFirstImageUrl = (markdown) => {
    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const match = markdown.match(imageRegex);
    if (match) {
        let url = match[1];
        if (!url.startsWith('/')) {
            url = `/${url}`;
        }
        return url;
    }
    return null;
}

export const getAllFileNames = async () => {
    const postsDirectory = path.join(process.cwd(), "content");
    return (await deepReadDir(postsDirectory))
        .flat(Number.POSITIVE_INFINITY)
        .map((name) => name.split("/content/")[1]);
}


// eslint-disable-next-line import/prefer-default-export
export const fetchAllPostsMeta = async (filter) => {
    const postFilenames = (await getAllFileNames())
        .filter((name) => isValidPost(name) && !shouldFileBeIgnored(name))

    return postFilenames.map(filename => {
        const fileContents = getFileContents(filename.split(".md")[0])
        const matterData = getMatterData(fileContents)
        const frontmatter = matterData.data;

        if (!frontmatter.image) {
            frontmatter.image = getFirstImageUrl(fileContents)
        }

        if (!frontmatter.description) {
            frontmatter.description = matterData.excerpt || ""
        }

        if (!frontmatter.credit) {
            frontmatter.credit = ""
        }

        return { ...frontmatter, slug: `/${filename.split(".md")[0]}` };
    })
        .filter(meta => !meta.page)
        .filter((meta) => meta.title)
        .filter(filter || (() => true))
        .sort(
            (meta1, meta2) => new Date(meta2.date) - new Date(meta1.date)
        )
        .map(({ title, slug, author = blogConfig.author, tags = null, image = null, readTime = null, categories = null, description = "", date = null, alt = null }) => ({
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
            slug
        }));
};

export const indexFilters = {
    featured: (meta) => meta?.tags?.includes("featured")
}