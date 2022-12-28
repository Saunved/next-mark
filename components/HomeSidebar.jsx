import React from "react";
import IconLink from "./IconLink";

function HomeSidebar() {
  return (
    <div
      className="p-4 dark:bg-zinc-900 bg-white overflow-auto sidebar"
      style={{ minHeight: "250px", maxHeight: "70vh" }}
    >
      <section className="mb-16">
        <p className="text-sm uppercase tracking-wider dark:text-gray-300">
          Categories
        </p>
        <p className="text-xs">To be added</p>
      </section>

      {/* <section className="mb-16">
        <p className="text-sm uppercase tracking-wider dark:text-gray-300">
          Popular
        </p>
        <p className="text-xs">Coming soon</p>
      </section> */}

      <section className="mb-16">
        <p className="text-sm uppercase tracking-wider dark:text-gray-300">
          Entertainment
        </p>
        <p className="text-xs">Coming soon</p>
      </section>

      <section className="mb-16">
        <p className="text-sm uppercase tracking-wider dark:text-gray-300">
          Awesome libraries
        </p>
        <p className="text-sm dark:text-gray-300 text-gray-700">
          Highly recommended
        </p>
        <div className="mt-4">
          <p>
            <IconLink
              title="CodeHike"
              href="https://github.com/code-hike/codehike"
              external
              iconSize={14}
            />
          </p>
          <p className="mt-1">
            <IconLink
              title="Docusaurus"
              href="https://docusaurus.io"
              external
              iconSize={14}
            />
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomeSidebar;
