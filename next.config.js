const nextMdx = require("@next/mdx");
const { remarkCodeHike } = require("@code-hike/mdx");
const theme = require("shiki/themes/min-dark.json");

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike, { theme }]],
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
