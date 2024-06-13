import nextMdx from "@next/mdx";
import { remarkCodeHike } from "@code-hike/mdx";
import theme from "shiki/themes/dracula-soft.json" assert {type: "json"};
import remarkFrontmatter from 'remark-frontmatter'
import { remarkMdxNext } from "remark-mdx-next";

const withMDX = nextMdx({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxNext, [remarkCodeHike, { theme, showCopyButton: true }]],
    rehypePlugins: [],
  },
});

const getBaseUrl = () => {
  if (!process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return "http://localhost:3000"
  }

  return process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https://saunved.com" : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
}

/** @type {import('next').NextConfig} */
export default withMDX({
  reactStrictMode: true,
  env: {
    BASE_URL: getBaseUrl()
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
});

