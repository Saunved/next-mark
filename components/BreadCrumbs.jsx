import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";

function BreadCrumbs({ links }) {
  return (
    <div className="text-sm text-gray-700 dark:text-gray-400 mb-2 breadcrumbs">
      {links.map((link, idx) => (
        <span key={link.href}>
          {link.disabled ? (
            <span className={idx === 0 ? "pr-2" : "px-2"}> {link.title} </span>
          ) : (
            <Link href={link.href} className={idx === 0 ? "pr-2" : "px-2"}>
              {link.title}
            </Link>
          )}

          {idx < links.length - 1 ? <>&gt;</> : null}
        </span>
      ))}
    </div>
  );
}

BreadCrumbs.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
};

export default BreadCrumbs;
