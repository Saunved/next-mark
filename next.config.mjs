import nextMdx from "@next/mdx";
import mdxOptions from "./mdx.options.mjs";
import baseConfig from "./base.config.mjs";

const withMDX = nextMdx({
  extension: /\.(md|mdx)$/,
  options: mdxOptions
});

const getBaseUrl = () => {
  if (!process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return "http://localhost:3000"
  }

  return process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? baseConfig.siteUrl : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
}

/** @type {import('next').NextConfig} */
export default withMDX({
  reactStrictMode: true,
  env: {
    BASE_URL: getBaseUrl()
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
  webpack: (config) => ({ ...config, experiments: { ...config.experiments, topLevelAwait: true } })
});

