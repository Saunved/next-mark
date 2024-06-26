import { fetchAllPostsMeta } from "./indices.mjs";

// eslint-disable-next-line import/prefer-default-export
export const getAllRedirects = async () => {
    const postsMeta = await fetchAllPostsMeta(undefined, false);

    const redirects = [];
    postsMeta.forEach(meta => {
        if (meta.alias) {
            redirects.push({
                source: meta.alias,
                destination: `${meta.slug}`,
                permanent: true
            })
        } else if (meta.aliases) {
            meta.aliases.forEach(alias => {
                redirects.push({
                    source: alias,
                    destination: meta.slug,
                    permanent: true
                })
            })
        }
    })

    return redirects;
}