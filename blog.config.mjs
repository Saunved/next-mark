const blogConfig = {
    seo: {
        openGraph: {
            type: "website",
            locale: "en_US",
            url: process.env.BASE_URL,
            site_name: "next-mark",
            description: "This is the next-mark demo website"
        },
        twitter: {
            handle: "",
            site: "",
            cardType: "summary_large_image",
        }
    },
    siteUrl: "",
    localUrl: "",
    siteHeader: "",
    copyRight: "",
    author: "",
    footer: {
        social: [
        ],
        platforms: [
        ],
        other: [
        ]
    },
    buttonDownLink: "",
}

if (typeof exports === "object") {
    module.exports = {
        ...blogConfig
    }
}

export default blogConfig;