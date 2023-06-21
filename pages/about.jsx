/* eslint-disable react/no-unescaped-entities */
import React from "react"

export default function SubscribedPage() {
    return (
        <article>
            <div className="border-gray-200 rounded-xl text-lg mt-12">
                <h1 className="text-3xl mb-2">About me</h1>

                <p className="mb-4">Hey there! I am Saunved.</p>

                <p className="mb-4">
                    I write stories and articles about a wide variety of topics ranging from personal experiences to fictional worlds, or often times, a mix of both. I am a software engineer by profession, so I occasionally write tech guides or articles pertaining to programming.
                </p>

                <p className="mb-4">
                    A few books that have really left a mark on me include the LoTR series, The Fountainhead, And Then There Were None, To Kill A Mockingbird, and Sherlock, of course!
                </p>

                <p className="mb-4">
                    I am "owned" by two cats, adopted back in 2017. They're fun to have around, and they do a lot of random, crazy things on a daily basis!
                </p>

                <p className="mb-4">
                    You can talk to me about startups, technology, movies - especially animated movies, pets, running, and anything fun and random!
                </p>

            </div>

            <div className="border-gray-200 rounded-xl text-lg mt-12">

                <h1 className="text-3xl mb-2">Why this website?</h1>
                <p className="mb-4">
                    I have always wanted to have an independent space on the internet, free from the constraints of the common content management systems, or the whims of publishing platforms.
                </p>
                <p className="mb-4">
                    Part of the reason for creating this website is the joy of coding it from the ground up. Also, I really enjoy writing, so this is a perfect mix of both for me.
                </p>
            </div>

            <div className="border-gray-200 rounded-xl text-lg mt-12">

                <h1 className="text-3xl mb-2">How is this website made?</h1>
                <p className="mb-4">
                    This website is created using a framework called <a className="underline" href="https://nextjs.org/" target="_blank" rel="noreferrer">Next.js</a> along with <a className="underline" href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind</a> for the styling. I write the content in a format called <a className="underline" href="https://mdxjs.com/" target="_blank" rel="noreferrer">MDX</a>.
                </p>
                <p className="mb-4">
                    The site is hosted on <a className="underline" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a> and is connected to <a className="underline" href="https://vercel.com/" target="_blank" rel="noreferrer">Vercel</a> for deployments. I am also using <a className="underline" href="https://buttondown.email" target="_blank" rel="noreferrer">Buttondown</a> for creating a subscriber list for this website's newsletter.
                </p>
                <p className="mb-4">
                    Besides the few hours I have spent building it (maybe 16-20 hours), and the cost of my domain, this setup is entirely free (so far). I am hoping to make certain parts of this site open source so that other developers can reuse parts of it if they wish to.
                </p>

            </div>            

            <div id="why-subscribe" className="border-gray-200 rounded-xl text-lg my-12">

                <h1 className="text-3xl mb-2">Why subscribe?</h1>
                <p className="mb-4">
                    If you subscribe, you will occasionally be treated to an email with a summary of my posts over the last week or two.
                </p>
                <p className="mb-4">
                    If you like reading witty stories, enjoy being pulled into fictional worlds, or you're interested in software engineering, then you should consider subscribing.
                </p>
                <p className="mb-4">
                    Your email won't be shared anywhere else, and I won't spam you. You also get to see a cool cat picture after you subscribe, so there's that!
                </p>
            </div>

        </article>
    )
}