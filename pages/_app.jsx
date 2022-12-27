/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import "../styles/globals.css";
import { Inter } from "@next/font/google";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <Layout className={inter.className}>
      <Component {...pageProps} />
    </Layout>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.any,
};

App.defaultProps = {
  pageProps: {},
};
