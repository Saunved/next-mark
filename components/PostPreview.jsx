import React from "react";
import Image from "next/image";
import Link from "next/link";
import { meta } from "../constants/propTypes";

function PostPreview({ postMeta }) {
  const { slug, title, description, date, author, image, alt } = postMeta;

  return (
    <article className="rounded-xl border mb-8">
      <Link href={slug}>
        <Image
          src={image}
          alt={alt || title}
          className="rounded-t-xl h-60 w-full object-cover"
          width={1024}
          height={768}
        />
      </Link>
      <div className="p-4">
        <Link href={slug}>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-gray-600">
            {date} &bull; {author}
          </p>
          <p className="mt-2">{description}</p>
        </Link>
        <div className="mt-4">
          <Link className="underline text-indigo-700" href={slug}>
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}

PostPreview.propTypes = meta;

export default PostPreview;
