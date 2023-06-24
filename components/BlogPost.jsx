import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { meta as metaPropType } from "constants/propTypes";
import { humanReadableDate } from "utils/date";
import BreadCrumbs from "components/BreadCrumbs";
import {useRouter} from "next/router";

export default function BlogPost({ meta, children }) {
  const [breadCrumbLinks, setBreadCrumbLinks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getBreadCrumbLinks = () => {
      const links = [
        {
          href: "/",
          title: "Home",
        },
      ];
      const postIsFromTech = meta?.categories?.includes("tech");
      const postIsFromSeries = meta?.order;

      if (postIsFromSeries) {
        links.push(
          { href: `/series`, title: "Series" },
          {
            href: `/series/${meta.seriesId}`,
            title: meta.series,
          }
        );
      } else if (postIsFromTech) {
        links.push({
          href: `/tech`,
          title: "Tech",
        });
      }

      links.push({
        href: router.pathname,
        title: meta.title,
        disabled: true,
      });

      return links;
    };

    setBreadCrumbLinks(getBreadCrumbLinks());
  }, []);

  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        openGraph={{
          url: process.env.BASE_URL + router.pathname,
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
          siteName: "Stories by Saunved",
        }}
      />

      <div className="max-w-2xl ml-0">
        <div>
          <BreadCrumbs links={breadCrumbLinks} />
          <h1 className="text-4xl font-bold">{meta.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {meta.author} &bull; {humanReadableDate(meta.date)} &bull;{" "}
            {meta.readTime} min read
          </p>
          <figure>
            <Image
              className="mt-8 rounded-md"
              src={`${meta.image}`}
              height={400}
              width={1200}
              alt={meta.alt}
            />
            <figcaption>{meta.credit}</figcaption>
          </figure>
        </div>
        <article className="mt-8 mb-16 prose prose-neutral prose-lg dark:prose-invert">
          {children}
        </article>

        <hr className="my-10 dark:border-gray-600 hidden" />
        <section className="pt-4 pb-16 hidden">
          <p className="text-xl font-bold">Comments</p>
          <p className="text-xs">Coming soon</p>
        </section>
        <hr className="md:hidden my-10 dark:border-gray-600" />
      </div>
    </>
  );
}

BlogPost.propTypes = {
  children: PropTypes.element.isRequired,
  meta: metaPropType.isRequired,
};
