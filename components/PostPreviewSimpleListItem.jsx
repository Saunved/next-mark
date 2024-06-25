import React from "react";
import Link from "next/link";
import { meta } from "constants/propTypes";


function PostPreviewSimpleListItem({ postMeta }) {
    const { slug, title } = postMeta;

    return (
        <article className="bg-white mb-1 dark:bg-zinc-900">
            <Link href={slug}>
                <div>
                    <div>
                        <h2 className="hover:text-blue-700 dark:hover:text-blue-500">
                            {title}
                        </h2>
                    </div>
                </div>
            </Link>
        </article>
    );
}

PostPreviewSimpleListItem.propTypes = {
    postMeta: meta.isRequired,
};

export default PostPreviewSimpleListItem;
