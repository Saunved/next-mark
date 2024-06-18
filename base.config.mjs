const baseConfig = {
    seo: {
        openGraph: {
            type: "website",
            locale: "en_US",
            url: process.env.BASE_URL,
            site_name: "Stories by Saunved",
            description: "Stories, tech insights, poems, and more - by Saunved"
        },
        twitter: {
            handle: "@saunved",
            site: "@saunved",
            cardType: "summary_large_image",
        }
    },
    siteUrl: "https://saunved.com",
    localUrl: "http://localhost:3000",
    siteHeader: "Saunved",
    copyRight: "Saunved M. All Rights Reserved.",
    footer: {
        social: [
            {
                href: "https://www.linkedin.com/in/saunved/",
                title: "LinkedIn",
                external: true
            },
            {
                href: "https://twitter.com/saunved",
                title: "Twitter",
                external: true
            },
            {
                href: "https://github.com/saunved/",
                title: "GitHub",
                external: true
            }
        ],
        platforms: [
            {
                href: "https://dev.to/saunved",
                title: "Dev",
                external: true
            },
            {
                href: "https://medium.com/@saunved",
                title: "Medium",
                external: true
            },
        ]
    },
    buttonDownLink: "https://buttondown.email/api/emails/embed-subscribe/saunved"
}

if (typeof exports === "object") {
    module.exports = {
        ...baseConfig
    }
}

export default baseConfig;