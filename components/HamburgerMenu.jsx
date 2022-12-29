import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { menu } from "constants/menu";

function HamburgerMenu({ isMenuOpen, onMenuCloseClick }) {
  const onMenuButtonCloseClick = (e) => {
    setTimeout(() => {
      onMenuCloseClick(e);
    }, 0);
  };

  return (
    <div
      className={`fixed top-0 right-0 z-50 px-4 bg-black bg-opacity-95 text-white h-full w-screen md:hidden ${
        isMenuOpen ? "animate-fade-in" : "animate-fade-out"
      }`}
    >
      <nav className="grid gap-12 my-12 p-8">
        {menu.map((item) => (
          <Link
            href={item.link}
            className="text-2xl"
            key={item.link}
            onClick={onMenuButtonCloseClick}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="text-center fixed bottom-16 mx-auto w-full">
        <button
          type="button"
          className="border px-2 py-2 rounded-md"
          onClick={onMenuCloseClick}
        >
          Close menu
        </button>
      </div>
    </div>
  );
}

HamburgerMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  onMenuCloseClick: PropTypes.func.isRequired,
};

export default HamburgerMenu;
