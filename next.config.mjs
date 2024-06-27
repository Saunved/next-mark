import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import blogConfig from "./blog.config.mjs";
import { getAllRedirects } from './lib/redirects.mjs';

const getBaseUrl = () => {
  if (!process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return "http://localhost:3000"
  }

  return process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? blogConfig.siteUrl : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
}

/** @type {import('next').NextConfig} */
export default {
  async redirects() {
    const redirects = await getAllRedirects()
    return redirects;
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true
  },
  env: {
    BASE_URL: getBaseUrl()
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Copy content/assets to the public directory
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve('./content/assets'),
              to: path.resolve('./public'),
              noErrorOnMissing: true
            },
          ],
        })
      );
    }

    return { ...config, experiments: { ...config.experiments, topLevelAwait: true } }
  }
};

