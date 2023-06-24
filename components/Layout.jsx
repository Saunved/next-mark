/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { NextSeo, DefaultSeo } from "next-seo";
import TopNavigation from "components/TopNavigation";
import PageFooter from "components/PageFooter";
import HomeSidebar from "components/HomeSidebar";
import seo from "next-seo.config";
import baseConfig from "base.config";

export default function Layout({ children, pageTitle, description }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>

      <DefaultSeo {...seo} />
      <NextSeo title={pageTitle} description={description} />

      <TopNavigation />
      <div className="dark:bg-zinc-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <div className="md:grid grid-cols-12 py-8 gap-12 mx-6">
            <div className="col-span-8">
              <main className="min-h-screen">
                <div className="content">{children}</div>
              </main>
            </div>

            <div className="col-span-4 mt-8">
              <HomeSidebar />
            </div>
          </div>
        </div>
      </div>

      <PageFooter />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  pageTitle: PropTypes.string,
  description: PropTypes.string,
};

Layout.defaultProps = {
  pageTitle: baseConfig.seo.site_name,
  description: baseConfig.seo.description,
};
