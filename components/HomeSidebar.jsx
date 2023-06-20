import React from "react";
import EmailCollector from "components/EmailCollector";

function HomeSidebar() {
  return (
    <aside
      className="md:p-4 md:pt-8 dark:bg-zinc-900 bg-white overflow-auto sidebar md:sticky md:top-0 p-1"
      style={{ minHeight: "250px", maxHeight: "80vh" }}
    >

      <EmailCollector className="mb-8" />

    </aside>
  );
}

export default HomeSidebar;
