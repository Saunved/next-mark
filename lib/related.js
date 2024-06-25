import { fetchAllPostsMeta } from "./indices";

// eslint-disable-next-line import/prefer-default-export
export const fetchRelatedPosts = async (postMeta) => {

    const allPosts = await fetchAllPostsMeta();

    if (!postMeta?.tags) {
        return [];
    }

    return allPosts.filter(
        (post) =>
            // This can also be done on the slug, but title should be okay for now
            post.title !== postMeta.title &&
            post.tags &&
            post.tags.some((tag) => postMeta.tags.includes(tag) && tag !== "featured")
    )
}