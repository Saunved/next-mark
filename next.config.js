const nextMdx = require("@next/mdx");
const { remarkCodeHike } = require("@code-hike/mdx");
const theme = require("shiki/themes/dracula-soft.json");

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike, { theme, showCopyButton: true }]],
    rehypePlugins: [],
  },
});

// eslint-disable-next-line prefer-destructuring
const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  reactStrictMode: true,
  env: {
    CLOUDFRONT_URL,
  },
  images: {
    domains: [CLOUDFRONT_URL.split("//")[1]],
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
});
