/* eslint-disable no-param-reassign */
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import fs from 'fs';
import path from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeRaw from 'rehype-raw';
import remarkPrism from 'remark-prism';
import remarkWikiLink from "remark-wiki-link";
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';
import remarkCaptions from "remark-captions"
import rehypeExternalLinks from 'rehype-external-links';

export const getFirstImageUrl = (markdown) => {
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

// eslint-disable-next-line import/prefer-default-export
export const processMDX = async (content) => {
    const file = await unified()
        .use(remarkParse)
        .use(remarkCaptions)
        .use(remarkFrontmatter)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" })
        .use(rehypeRaw)
        .use(rehypeStringify)
        .use(remarkWikiLink, { aliasDivider: "|", pageResolver: (name) => [name.toLowerCase()], hrefTemplate: (permalink) => permalink })
        .use(remarkPrism)
        .process(content)

    return String(file);
}

export const getMatterData = (fileContents) => matter(fileContents, {
    excerpt: (file) => {
        const lines = file.content.split('\n');
        let excerpt = '';

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            // Check if the line starts with an alphanumeric character
            if (/^[A-Za-z0-9]/.test(line)) {
                excerpt = line;
                break;
            }
        }

        // eslint-disable-next-line no-param-reassign
        file.excerpt = excerpt;
    }
})

export const getFileContents = (fileName) => {
    const contentDirectory = path.join(process.cwd(), 'content');
    const fullPath = path.join(contentDirectory, `${fileName}.md`);
    return fs.readFileSync(fullPath, 'utf8');
}

export const getEnhancedFrontmatter = (frontmatter, excerpt, fileContents, slug) => {
    if (typeof frontmatter.image !== "string") {
        frontmatter.image = getFirstImageUrl(fileContents)
    }

    if (typeof frontmatter.description !== "string") {
        frontmatter.description = excerpt || ""
    }

    if (!frontmatter.credit) {
        frontmatter.credit = ""
    }

    if (!frontmatter.slug) {
        frontmatter.slug = `/${slug?.split("/index")[0]?.split("index")[0]}`;
    }

    return frontmatter;
}

export const getMdxContent = async (fileName) => {
    const fileContents = getFileContents(fileName);
    const post = await processMDX(fileContents);


    const matterData = getMatterData(fileContents)
    const frontmatter = getEnhancedFrontmatter(matterData.data, matterData.excerpt, fileContents, fileName)

    return { post, frontmatter };
}
