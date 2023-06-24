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

const getBaseUrl = () => {
  if(!process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return "http://localhost:3000"
  }

  return process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https://saunved.com" : process.env.NEXT_PUBLIC_VERCEL_URL
}

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  reactStrictMode: true,
  env: {
    BASE_URL: getBaseUrl()
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
});

