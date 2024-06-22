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
        clippedDescription.trim() + (description.length > 200 ? "..." : "");

    return (
        <article className="mb-2 bg-white dark:bg-zinc-900 group border-b py-6 dark:border-gray-600 border-gray-200">
            <Link href={slug}>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-8">
                        <div>
                            <h3 className="text-xl font-semibold">
                                {title}
                            </h3>
                            <p className="mt-1">{ellipsisDescription}</p>
                            {
                                !date ? null :
                                    <p className="text-sm dark:text-gray-400 text-gray-600 mt-2">{formatDate(date, "dd MMM, yyyy")}</p>

                            }
                        </div>
                    </div>
                    <div className="col-span-4">
                        {
                            !image ? null :
                                <Image
                                    src={image}
                                    alt={alt || title}
                                    className="rounded-xl h-32 w-full object-cover"
                                    width={512}
                                    height={128}
                                />
                        }

                    </div>
                </div>
            </Link>
        </article>
    );
}

SideImagePreview.propTypes = {
    postMeta: meta.isRequired,
};

export default SideImagePreview;
