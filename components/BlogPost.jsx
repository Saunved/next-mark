import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { meta as metaPropType } from "constants/propTypes";
import { formatDate } from "date-fns";
import blogConfig from "blog.config.mjs";
import feedTypes from "constants/feedTypes";
import GenericPostFeed from "./GenericPostFeed";

export default function BlogPost({ relatedPosts = [], meta, isIndex = false, children }) {

  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        openGraph={{
          url: process.env.BASE_URL + meta.slug,
          title: meta.title,
          description: meta.description,
          images: [
            {
              url: process.env.BASE_URL + meta.image,
              width: 800,
              height: 600,
              alt: meta.alt,
            },
          ],
          siteName: blogConfig.seo.siteName,
        }}
      />

      <div className="max-w-2xl ml-0">

        {
          isIndex ? null :
            <div className="mb-8">
              <h1 className="text-4xl font-bold">{meta.title}</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {!meta.author || meta.author === "undefined" ? null : <>{meta.author} &bull; </>}
                {!meta.date || meta.date === "undefined" ? null : <> {formatDate(meta.date, "dd MMM, yyyy")}</>}
              </p>
              {
                !meta.image ? null : <figure> <Image
                  className="mt-8 rounded-md max-h-[400px] object-cover"
                  src={`${meta.image}`}
                  height={400}
                  width={600}
                  priority
                  alt={meta.alt}
                />
                  <figcaption dangerouslySetInnerHTML={{ __html: meta.credit }} />
                </figure>
              }
            </div>
        }

        {
          !isIndex && <div id="tldr" className="h-[64px]" />
        }

        <article id="post" className="mb-12 prose prose-lg prose-neutral dark:prose-invert">
          {children}
        </article>

        {
          isIndex ? null :
            <div id="opinions" />
        }


        {
          // eslint-disable-next-line react/prop-types
          !relatedPosts?.length ? null :
            <section>
              <GenericPostFeed feedType={feedTypes.simpleList} title="Related posts" postsMeta={relatedPosts} />
            </section>
        }


        <hr className="my-10 dark:border-gray-600 hidden" />
        <section className="pt-4 pb-16 hidden">
          <p className="text-xl font-bold">Comments</p>
          <p className="text-xs">Coming soon</p>
        </section>
      </div>
    </>
  );
}

BlogPost.propTypes = {
  children: PropTypes.element.isRequired,
  meta: metaPropType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  relatedPosts: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  isIndex: PropTypes.bool
};
