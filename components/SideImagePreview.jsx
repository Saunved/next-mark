import React from "react";
import Link from "next/link";
import { meta } from "constants/propTypes";
import Image from "next/image";
import { formatDate } from "date-fns";

function SideImagePreview({ postMeta }) {
    const { slug, title, description, image, alt, date } =
        postMeta;


    const clippedDescription = description.substring(0, 150);
    const ellipsisDescription =
        clippedDescription.trim() + (description.length > 153 ? "..." : "");

    const clippedTitle = title.substring(0, 60);
    const ellipsisTitle =
        clippedTitle.trim() + (title.length > 63 ? "..." : "");

    const imageEl = !image ? null :
        <Image
            src={image}
            alt={alt || title}
            className="rounded-xl max-w-[500px] xs:max-w-[250px] max-h-[300px] object-cover w-full mx-auto"
            width={600}
            height={300}
            priority
        />

    return (
        <article className="mb-2 bg-white dark:bg-zinc-900 group border-b py-4 dark:border-gray-600 border-gray-200">
            <Link href={slug}>
                <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 xs:items-start xs:justify-between relative">
                    {
                        !imageEl ? null :
                            <div className="mb-4 xs:hidden">
                                {imageEl}
                            </div>
                    }
                    <div className="xs:col-span-8 md:col-span-7 w-full">
                        <div>
                            <h3 className="text-xl font-semibold">
                                {ellipsisTitle}
                            </h3>
                            <p className="mt-1">{ellipsisDescription}</p>
                            {
                                !date ? null :
                                    <p className="text-sm dark:text-gray-400 text-gray-600 mt-2">{formatDate(date, "dd MMM, yyyy")}</p>

                            }
                        </div>
                    </div>
                    {
                        !imageEl ? null :
                            <div className="xs:col-span-4 md:col-span-5 hidden xs:block">
                                {imageEl}
                            </div>
                    }
                </div>
            </Link>
        </article>
    );
}

SideImagePreview.propTypes = {
    postMeta: meta.isRequired,
};

export default SideImagePreview;
