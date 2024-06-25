/* eslint-disable import/prefer-default-export */

export const getAllTags = async (postsMeta) => {
    const tags = postsMeta.map(post => post?.tags);
    const flattenedTags = [];
    tags.forEach(tagGroup => flattenedTags.concat(tagGroup));
    return Array.from(new Set(flattenedTags))
}