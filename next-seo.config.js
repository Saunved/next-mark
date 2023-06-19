export default {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https://saunved.com" : process.env.NEXT_PUBLIC_VERCEL_URL,
    site_name: "Saunved",
  },
  twitter: {
    handle: "@saunved",
    site: "@saunved",
    cardType: "summary_large_image",
  },
};
