import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "phosphor-react";
import { meta } from "../constants/propTypes";

function PostPreview({ postMeta }) {
  const { slug, title, description, date, author, image, alt } = postMeta;

  const clippedDescription = description.substring(0, 100);
  const ellipsisDescription =
    clippedDescription.trim() + (description.length > 100 ? "..." : "");

  return (
    <article className="rounded-xl mb-8 dark:border-gray-500 border bg-white dark:bg-zinc-900 group">
      <Link href={slug}>
        <Image
          src={image}
          alt={alt || title}
          className="rounded-t-xl h-48 w-full object-cover"
          width={1024}
          height={768}
        />
        <div className="p-4">
          <div>
            <h3 className="text-xl font-bold group-hover:text-indigo-700 dark:group-hover:text-indigo-500 transition-colors duration-200">
              {title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {author} &bull; {date}
            </p>
            <p className="mt-4">{ellipsisDescription}</p>
          </div>
          <div className="pt-4">
            <div className="text-sm group-hover:text-indigo-700 dark:group-hover:text-indigo-500 flex justify-start gap-2 items-center font-bold transition-colors duration-300">
              Continue reading{" "}
              <ArrowRight className="group-hover:visible invisible" size={16} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

PostPreview.propTypes = meta;

export default PostPreview;
