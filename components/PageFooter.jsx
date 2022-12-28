import React from "react";
import IconLink from "./IconLink";

function PageFooter() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto py-4">
        <div className="mx-4 mt-8">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-8">
            <div className="col-span-4">
              <p className="uppercase">Connect via</p>
              <ul className="grid gap-1 mt-2 text-lg">
                <li>
                  <IconLink
                    href="https://www.linkedin.com/in/saunved/"
                    title="LinkedIn"
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
              <p className="uppercase">Other channels</p>
              <ul className="grid gap-1 mt-2 text-lg">
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

        <hr className="mt-8" />

        <p className="text-center mt-8">
          &copy; Saunved M. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default PageFooter;
