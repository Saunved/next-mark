import { remarkCodeHike, } from '@code-hike/mdx';
import theme from "shiki/themes/dracula-soft.json" assert {type: "json"};
import remarkWikiLink from 'remark-wiki-link';
import { remarkMdxNext } from 'remark-mdx-next';
import remarkFrontmatter from 'remark-frontmatter';

export default {
    remarkPlugins: [
        remarkFrontmatter,
        remarkMdxNext,
        [remarkWikiLink, { aliasDivider: "|", pageResolver: (name) => [name.toLowerCase()], hrefTemplate: (permalink) => permalink }],
        // This auto-import false is really important, otherwise the plugin breaks
        [remarkCodeHike, { theme, autoImport: false, showCopyButton: true }]
    ],
    rehypePlugins: [],
    useDynamicImport: true,
    format: 'md'
}