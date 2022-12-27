import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import Image from "next/image";
import { meta as metaPropType } from "../constants/propTypes";

export default function BlogPost({ meta, children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={meta.description} />
        <title>{meta.title}</title>
      </Head>
      <main className="mt-8 max-w-3xl ml-0">
        <div>
          <h1 className="text-4xl font-bold">{meta.title}</h1>
          <p className="text-gray-600">
            {meta.author} &bull; {meta.date} &bull; {meta.readTime} min read
          </p>
          <Image
            className="mt-4 rounded-md"
            src={meta.image}
            height={400}
            width={1024}
            alt={meta.alt}
          />
        </div>
        <article className="prose lg:prose-lg mt-8">{children}</article>
        <section className="mt-16">
          <p className="text-xl font-bold">Comments</p>
          <p className="text-xs">Coming soon</p>
        </section>
      </main>
    </>
  );
}

BlogPost.propTypes = {
  children: PropTypes.element.isRequired,
  // eslint-disable-next-line react/require-default-props
  meta: metaPropType,
};
