/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/globals.css";
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-clojure';
import { Inter } from "next/font/google";
import Layout from "components/Layout";
import opineKit from "helpers/opineKit";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
});

export default function App(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    opineKit.start();
  }, [])

  useEffect(() => {
    // Configure Prism options
    Prism.plugins.toolbar.registerButton('copy-to-clipboard', {
      text: 'Copy',
      onClick: (env) => {
        const button = env.element.querySelector('.toolbar-item button');
        const code = env.element.querySelector('code')?.textContent || '';

        const copyCode = async () => {
          try {
            if (navigator.clipboard && window.isSecureContext) {
              await navigator.clipboard.writeText(code);
            } else {
              // Fallback for older browsers
              const textArea = document.createElement('textarea');
              textArea.value = code;
              textArea.style.position = 'fixed';
              textArea.style.left = '-999999px';
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              textArea.remove();
            }

            // Success feedback
            button.textContent = 'Copied!';
            setTimeout(() => {
              button.textContent = 'Copy';
            }, 2000);

          } catch (error) {
            console.error('Failed to copy:', error);
            button.textContent = 'Failed to copy';
            setTimeout(() => {
              button.textContent = 'Copy';
            }, 2000);
          }
        };

        copyCode();
      }
    });

    // Re-highlight all code blocks
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []); // Re-run when html content changes

  return (
    <ThemeProvider attribute="class">
      <Layout className={inter.className}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  pageProps: PropTypes.any,
};
