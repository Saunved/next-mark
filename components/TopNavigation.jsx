import Link from "next/link";
import React, { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { menu } from "../constants/menu";

function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuButtonClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(true);
  };

  const onMenuCloseClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
  };

  return (
    <>
      <HamburgerMenu
        isMenuOpen={isMenuOpen}
        onMenuCloseClick={onMenuCloseClick}
      />
      <div className="py-4 bg-gradient-to-t bg-purple-800 text-white">
        <div className="max-w-5xl mx-auto">
          <div>
            <div className="flex justify-between items-center mx-4">
              <div className="justify-self-start">
                <Link href="/">
                  <h2 className="font-bold text-3xl">Saunved</h2>
                </Link>
              </div>

              <nav className="md:flex gap-10 justify-end hidden">
                {menu.map((item) => (
                  <Link
                    href={item.link}
                    className="uppercase text-base"
                    key={item.link}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <button
                onClick={onMenuButtonClick}
                type="button"
                className="block md:hidden border px-2 py-1 rounded"
              >
                Menu
              </button>

              <div className="hidden">
                <input
                  type="search"
                  placeholder="Type to search..."
                  className="rounded-md z-10 text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopNavigation;
