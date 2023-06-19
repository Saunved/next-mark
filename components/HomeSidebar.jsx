import React from "react";
import sidebar from "constants/sidebar";
import SidebarLinks from "components/SidebarLinks";
import EmailCollector from "components/EmailCollector";

function HomeSidebar() {
  return (
    <aside
      className="md:p-4 dark:bg-zinc-900 bg-white overflow-auto sidebar md:sticky md:top-0 p-1"
      style={{ minHeight: "250px", maxHeight: "80vh" }}
    >

      <EmailCollector className="mb-8" />

      {sidebar.map((section) => (
        <section className="mb-8" key={section.title}>
          <p className="text-base tracking-wide dark:text-emerald-400 font-semibold">
            {section.title}
          </p>
          <SidebarLinks links={section.links} />
        </section>
      ))}

    </aside>
  );
}

export default HomeSidebar;
