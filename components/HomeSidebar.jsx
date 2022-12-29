import React from "react";
import sidebar from "../constants/sidebar";
import SidebarLinks from "./SidebarLinks";

function HomeSidebar() {
  return (
    <aside
      className="md:p-4 dark:bg-zinc-900 bg-white overflow-auto sidebar"
      style={{ minHeight: "250px", maxHeight: "70vh" }}
    >
      {sidebar.map((section) => (
        <section className="mb-8" key={section.title}>
          <p className="text-base tracking-wider dark:text-emerald-400 font-semibold">
            {section.title}
          </p>
          <SidebarLinks links={section.links} />
        </section>
      ))}
    </aside>
  );
}

export default HomeSidebar;
