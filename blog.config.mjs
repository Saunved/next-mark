const blogConfig = {
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
    author: "Saunved",
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
    buttonDownLink: "https://buttondown.email/api/emails/embed-subscribe/saunved",
    tags: {
        "other-access": {
            title: "Other Access",
            description: "A young man has three days left to find a purpose or end up on death row."
        },
        "seychelles": {
            title: "Adventures in Seychelles",
            description: "A slightly fictionalized recounting of my childhood in Seychelles."
        }
    }
}

if (typeof exports === "object") {
    module.exports = {
        ...blogConfig
    }
}

export default blogConfig;