import React from "react";
import sidebar from "../constants/sidebar";
import SidebarLinks from "./SidebarLinks";

function HomeSidebar() {
  return (
    <aside
      className="md:p-4 dark:bg-zinc-900 bg-white overflow-auto sidebar"
      style={{ minHeight: "250px", maxHeight: "80vh" }}
    >
      {sidebar.map((section) => (
        <section className="mb-8" key={section.title}>
          <p className="text-base tracking-wider dark:text-emerald-400 font-semibold">
            {section.title}
          </p>
          <SidebarLinks links={section.links} />
        </section>
      ))}

      <section className="hidden">
        <p className="text-base tracking-wider dark:text-emerald-400 font-semibold">
          Subscribe via email
        </p>
        <p className="text-sm">
          Get curated weekly updates straight to your inbox
        </p>
        <input
          type="email"
          className="px-2 py-1.5 rounded-md border border-gray-500 text-lg w-full tracking-tight mt-2"
          placeholder="Your email"
        />
        <button
          type="button"
          className="border dark:border-none dark:hover:bg-blue-700 p-1 text-lg mt-2 mb-2 w-full rounded-md bg-blue-600 text-white"
        >
          Subscribe
        </button>
      </section>
    </aside>
  );
}

export default HomeSidebar;
