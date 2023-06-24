import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "phosphor-react";
import PropTypes from "prop-types";
import { meta } from "constants/propTypes";
import { humanReadableDate } from "utils/date";

function PostPreview({ postMeta, cardType }) {
  const { slug, title, description, date, author, image, alt, parts } =
    postMeta;
  const typeIsCollection = cardType === "collection";

  const clippedDescription = description.substring(0, 150);
  const ellipsisDescription =
    clippedDescription.trim() + (description.length > 150 ? "..." : "");

  return (
    <article className="rounded-xl mb-6 md:mb-2 dark:border-gray-500 border border-gray-300 hover:shadow-md bg-white dark:bg-zinc-900 group">
      <Link href={slug}>
        <Image
          src={image}
          alt={alt || title}
          className="rounded-t-xl h-48 w-full object-cover"
          width={512}
          height={384}
        />
        <div className="p-4">
          <div>
            <h3 className="text-xl font-bold group-hover:text-blue-700 dark:group-hover:text-blue-500 transition-colors duration-100">
              {title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {author} &bull;{" "}
              {!typeIsCollection ? (
                humanReadableDate(date)
              ) : (
                <>
                  {parts} part{parts > 1 ? "s" : ""}
                </>
              )}
            </p>
            <p className="mt-4">{ellipsisDescription}</p>
          </div>
          <div className="pt-4">
            <div className="text-sm group-hover:text-blue-700 dark:group-hover:text-blue-500 flex justify-start gap-2 items-center font-bold transition-colors duration-100">
              Continue reading{" "}
              <ArrowRight className="group-hover:visible visible" size={16} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

PostPreview.propTypes = {
  postMeta: meta.isRequired,
  cardType: PropTypes.string.isRequired,
};

export default PostPreview;
