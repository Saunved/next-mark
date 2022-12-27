const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
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
