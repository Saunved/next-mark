import React from "react";
import IconLink from "./IconLink";

function PageFooter() {
  return (
    <footer className="bg-gray-200 dark:bg-zinc-800 dark:text-white">
      <div className="max-w-6xl mx-auto py-4">
        <div className="mx-6 mt-8">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-8">
            <div className="col-span-4">
              <p className="uppercase font-bold">Connect via</p>
              <ul className="grid gap-1 mt-2 text-base">
                <li>
                  <IconLink
                    href="https://www.linkedin.com/in/saunved/"
                    title="LinkedIn"
                    external
                  />
                </li>
                <li>
                  <IconLink
                    href="https://twitter.com/saunved"
                    title="Twitter"
                    external
                  />
                </li>
                <li>
                  <IconLink
                    href="https://www.github.com/saunved/"
                    title="Github"
                    external
                  />
                </li>
              </ul>
            </div>

            <div className="col-span-4">
              <p className="uppercase font-bold">Other channels</p>
              <ul className="grid gap-1 mt-2 text-base">
                <li>
                  <IconLink
                    href="https://dev.to/saunved"
                    title="dev.to"
                    external
                  />
                </li>
                <li>
                  <IconLink
                    href="https://medium.com/@saunved"
                    title="Medium"
                    external
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-center mt-8">
          It’s the job that’s never started as takes longest to finish
          <br />- Sam Gamgee
        </p>

        <hr className="border-stone-900 dark:border-stone-500 mt-6" />

        <p className="text-center mt-6">
          &copy; Saunved M. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default PageFooter;
