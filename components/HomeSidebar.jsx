import React from "react";
import sidebar from "../constants/sidebar";
import SidebarLinks from "./SidebarLinks";

function HomeSidebar() {
  return (
    <div
      className="p-4 dark:bg-zinc-900 bg-white overflow-auto sidebar"
      style={{ minHeight: "250px", maxHeight: "70vh" }}
    >
      {sidebar.map((section) => (
        <section className="mb-12" key={section.title}>
          <p className="text-base tracking-wider dark:text-gray-300">
            {section.title}
          </p>
          <SidebarLinks links={section.links} />
        </section>
      ))}
    </div>
  );
}

export default HomeSidebar;
