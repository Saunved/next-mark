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

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/random/**",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
});
