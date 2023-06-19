import React from "react"
import PropTypes from "prop-types";

export default function EmailCollector({ className }) {
    return (
        <form action="https://buttondown.email/api/emails/embed-subscribe/saunved" method="post" target="popupwindow" className={className}>
            <p className="text-base tracking-wide dark:text-emerald-400 font-semibold">
                Subscribe via email
            </p>
            <p className="text-sm">
                Get notified when I publish. No spam :)
            </p>
            <input
                type="email"
                className="px-3 py-1.5 rounded-md border border-gray-500 text-lg w-full tracking-tight mt-2 outline-none focus:border-blue-500 border-2"
                placeholder="you@example.com"
                name="email"
            />
            <input type="hidden" value="1" name="embed" />
            <button
                type="submit"
                className="border dark:border-none dark:hover:bg-blue-700 px-1 py-2 text-base mt-4 mb-1 w-full rounded-xl bg-blue-600 text-white"
            >
                Subscribe
            </button>
        </form>
    )
}

EmailCollector.propTypes = {
    className: PropTypes.string
}

EmailCollector.defaultProps = {
    className: ""
}