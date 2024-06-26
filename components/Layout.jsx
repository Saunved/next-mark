/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { NextSeo, DefaultSeo } from "next-seo";
import TopNavigation from "components/TopNavigation";
import PageFooter from "components/PageFooter";
import HomeSidebar from "components/HomeSidebar";
import seo from "next-seo.config";
import blogConfig from "blog.config.mjs";
// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children, pageTitle = blogConfig.seo.site_name, description = blogConfig.seo.description }) {

  const defaultMargins = "sm:mx-4 mx-2"

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>

      <DefaultSeo {...seo} />
      <NextSeo title={pageTitle} description={description} />

      <TopNavigation className={defaultMargins} />
      <div className="dark:bg-zinc-900 dark:text-white">
        <div className="max-w-5xl mx-auto">
          <div className="md:grid grid-cols-12 py-8 gap-16 mx-2">
            <div className="col-span-8">
              <main className={`min-h-screen ${defaultMargins}`}>
                <div className="content">{children}</div>
              </main>
            </div>

            <div className="col-span-4 mt-8">
              <HomeSidebar />
            </div>
          </div>
        </div>
      </div>

      <PageFooter className={defaultMargins} />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  pageTitle: PropTypes.string,
  description: PropTypes.string,
};