import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import TopNavigation from "./TopNavigation";
import PageFooter from "./PageFooter";

export default function Layout({ children, pageTitle, description }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Saunved" content={description} />
        <title>{pageTitle}</title>
      </Head>

      <TopNavigation />
      <div className="max-w-5xl mx-auto">
        <div className="mx-4">
          <main>
            <div className="content">{children}</div>
          </main>
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
  pageTitle: "Saunved | Writings",
  description: "A collection of my articles, stories, poems, and more",
};
