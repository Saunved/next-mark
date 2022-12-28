import React from "react";

function HomeSidebar() {
  return (
    <div
      className="p-4 dark:bg-zinc-900 bg-white overflow-auto"
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
        <p className="text-xs">Coming soon</p>
      </section>
    </div>
  );
}

export default HomeSidebar;
