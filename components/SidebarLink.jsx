import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { ArrowRight } from "phosphor-react";
import IconLink from "components/IconLink";

function SidebarLink({ link }) {
  const linkIsExternal = link.external;

  const { title, external, href, iconSize } = link;

  if (linkIsExternal) {
    return (
      <div className="mt-2">
        <IconLink
          title={title}
          href={href}
          external={external}
          iconSize={iconSize}
        />
      </div>
    );
  }

  return (
    <div className="mt-2">
      <Link href={href} className="flex justify-start gap-2 items-center">
        <ArrowRight size={16} /> {title}
      </Link>
    </div>
  );
}

SidebarLink.propTypes = {
  link: PropTypes.shape({
    title: PropTypes.string.isRequired,
    external: PropTypes.bool.isRequired,
    href: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
  }).isRequired,
};

export default SidebarLink;
