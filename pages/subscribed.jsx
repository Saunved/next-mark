import Image from "next/image"
import Link from "next/link"

export default function SubscribedPage() {
    return (
        <div className="text-center my-12 border-gray-200 rounded-xl bg-gray-200 dark:bg-gray-800 p-8">
            <h1 className="text-xl">Subscription confirmed!</h1>
            <p className="">My cat is confused as to why anyone would subscribe to this mewsletter. <br /> But I sincerely hope you enjoy the content to follow!</p>
            <div className="flex justify-center w-full mt-6">
                <Image src={process.env.CLOUDFRONT_URL + "/dot_hi.jpg"} width={250} height={300} className="rounded-xl"></Image>
            </div>

            <div className="mt-4 text-center">
                <Link className="" href="/">
                    <button className="px-2 py-1 m-2 rounded border dark:border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600 border-gray-700 bg-gray-200 text-gray-700 hover:bg-gray-300">Back to home</button>
                </Link>
            </div>
        </div>
    )
}