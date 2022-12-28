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
        <meta name="description" content={meta.description} />
        <title>{meta.title}</title>
      </Head>
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold">{meta.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {meta.author} &bull; {meta.date} &bull; {meta.readTime} min read
        </p>
        <Image
          className="mt-8 rounded-md object-cover"
          src={meta.image}
          height={400}
          width={1200}
          alt={meta.alt}
        />
      </div>
      <article className="mt-8 prose prose-zinc prose-lg dark:prose-invert">
        {children}
      </article>
      <hr className="my-10 dark:border-gray-600" />
      <section className="pt-4 pb-16">
        <p className="text-xl font-bold">Comments</p>
        <p className="text-xs">Coming soon</p>
      </section>
      <hr className="md:hidden my-10 dark:border-gray-600" />
    </>
  );
}

BlogPost.propTypes = {
  children: PropTypes.element.isRequired,
  // eslint-disable-next-line react/require-default-props
  meta: metaPropType,
};
