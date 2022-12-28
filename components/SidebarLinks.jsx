import React from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";

function SidebarLinks({ links }) {
  if (!links.length) {
    return null;
  }

  return (
    <>
      {links.map((link) => (
        <SidebarLink link={link} key={link.href} />
      ))}
    </>
  );
}

SidebarLinks.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  links: PropTypes.array.isRequired,
};

export default SidebarLinks;
