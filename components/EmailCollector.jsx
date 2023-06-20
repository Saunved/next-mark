import React, { useState } from "react"
import PropTypes from "prop-types";
import Link from "next/link";

export default function EmailCollector({ className }) {
    const [email, setEmail] = useState("")

    return (
        <section className={className}>
            <form action="https://buttondown.email/api/emails/embed-subscribe/saunved" method="post" target="popupwindow">
                <p className="text-base tracking-wide dark:text-emerald-400 font-semibold">
                    Subscribe via email
                </p>
                <p className="text-sm">
                    Get notified when I publish. No spam :)
                </p>
                <input
                    type="email"
                    className="px-3 py-1.5 rounded-md border-gray-500 text-lg w-full tracking-tight mt-2 outline-none focus:border-blue-500 border-2"
                    placeholder="you@example.com"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="hidden" value="1" name="embed" />
                <button
                    type="submit"
                    className="border dark:border-none dark:hover:bg-blue-700 px-1 py-2 text-base mt-4 mb-1 w-full rounded-xl bg-blue-600 text-white disabled:opacity-50"
                    disabled={!email || !email.includes('@') || !email.includes('.')}
                >
                    Subscribe
                </button>
            </form>
            <div className="text-center">
                <Link href="/about#why-subscribe" className="text-sm dark:text-gray-200 underline">Why subscribe?</Link>
            </div>
        </section>
    )
}

EmailCollector.propTypes = {
    className: PropTypes.string
}

EmailCollector.defaultProps = {
    className: ""
}