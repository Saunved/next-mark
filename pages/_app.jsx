/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Layout from "components/Layout";
import "@code-hike/mdx/dist/index.css";
import BlogPost from "components/BlogPost";

const inter = Inter({
  subsets: ["latin"],
});

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider attribute="class">
      <Layout className={inter.className}>
        {
          pageProps?.title ?
            <BlogPost meta={pageProps}>
              <Component {...pageProps} />
            </BlogPost> :
            <Component {...pageProps} />
        }
      </Layout>
    </ThemeProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  pageProps: PropTypes.any,
};
