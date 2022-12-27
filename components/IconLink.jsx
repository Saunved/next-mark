import React from "react";
import PropTypes from "prop-types";
import { ArrowUpRight } from "phosphor-react";

function IconLink({ href, title, icon, external, iconSize }) {
  const iconEl =
    icon || (external ? <ArrowUpRight size={iconSize || 16} /> : null);

  return (
    <a
      href={href}
      target="_blank"
      className="flex justify-start gap-1 items-center"
      rel="noreferrer"
    >
      {title} {iconEl}
    </a>
  );
}

IconLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  external: PropTypes.bool,
  iconSize: PropTypes.number,
};

IconLink.defaultProps = {
  icon: null,
  external: false,
  iconSize: 0,
};

export default IconLink;
