/* eslint-disable import/prefer-default-export */

export const getAllTags = async (postsMeta) => {
    const tags = postsMeta.map(post => post?.tags);
    return Array.from(new Set(tags))
}