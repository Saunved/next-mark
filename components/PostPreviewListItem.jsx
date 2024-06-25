import React from "react";
import Link from "next/link";
import { ArrowRight } from "phosphor-react";
import { meta } from "constants/propTypes";

function PostPreviewListItem({ postMeta }) {
    const { slug, title, description } =
        postMeta;


    const clippedDescription = description.substring(0, 150);
    const ellipsisDescription =
        clippedDescription.trim() + (description.length > 150 ? "..." : "");

    return (
        <article className="mb-12 md:mb-8 bg-white dark:bg-zinc-900 group">
            <Link href={slug}>
                <div>
                    <div>
                        <h3 className="text-xl font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-500">
                            {title}
                        </h3>
                        <p className="mt-2">{ellipsisDescription}</p>
                    </div>
                    <div className="pt-2">
                        <div className="text-sm group-hover:text-blue-700 dark:group-hover:text-blue-500 flex justify-start gap-2 items-center font-bold transition-colors duration-100">
                            Read more {" "}
                            <ArrowRight className="group-hover:visible visible" size={16} />
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}

PostPreviewListItem.propTypes = {
    postMeta: meta.isRequired,
};

export default PostPreviewListItem;
