import React from "react";
import IconLink from "components/IconLink";
import blogConfig from "blog.config.mjs";

function PageFooter({ className }) {
  return (
    <footer className="bg-gray-200 dark:bg-zinc-800 dark:text-white">
      <div className="max-w-5xl mx-auto py-4">
        <div className={`mt-8 ${className}`}>
          <div className="grid grid-cols-4 md:grid-cols-12 gap-8">
            <div className="col-span-4">
              <p className="uppercase font-bold text-sm">Connect via</p>
              <ul className="grid gap-1 mt-2 text-base">
                {
                  blogConfig.footer.social.map(social => (
                    <li key={social.href}>
                      <IconLink
                        href={social.href}
                        title={social.title}
                        external={social.external}
                      />
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="col-span-4">
              <p className="uppercase font-bold text-sm">Other channels</p>
              <ul className="grid gap-1 mt-2 text-base">
                {
                  blogConfig.footer.platforms.map(social => (
                    <li key={social.href}>
                      <IconLink
                        href={social.href}
                        title={social.title}
                        external={social.external}
                      />
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-stone-900 dark:border-stone-500 mt-6" />

        <p className="text-center mt-6">
          &copy; {blogConfig.copyRight}
        </p>
      </div>
    </footer>
  );
}

PageFooter.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PageFooter.string
}

export default PageFooter;
