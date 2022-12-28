import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "phosphor-react";
import { useTheme } from "next-themes";
import HamburgerMenu from "./HamburgerMenu";
import { menu } from "../constants/menu";

function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [renderClientSideCode, setRenderClientSideCode] = useState(false);
  const { theme, setTheme } = useTheme();

  const onMenuButtonClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(true);
  };

  const onMenuCloseClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
  };

  // https://blog.hao.dev/render-client-side-only-component-in-next-js
  useEffect(() => {
    setRenderClientSideCode(true);
  }, []);

  return (
    <>
      <HamburgerMenu
        isMenuOpen={isMenuOpen}
        onMenuCloseClick={onMenuCloseClick}
      />
      <div className="py-4 bg-stone-900 text-white border-b dark:border-b-gray-800">
        <div className="max-w-6xl mx-auto">
          <div>
            <div className="flex justify-between items-center mx-4">
              <div className="justify-self-start">
                <Link href="/">
                  <h2 className="text-xl">By Saunved</h2>
                </Link>
              </div>

              <div className="flex gap-6 md:gap-10 justify-between">
                <nav className="md:flex gap-10 justify-end hidden">
                  {menu.map((item) => (
                    <Link href={item.link} className="text-lg" key={item.link}>
                      {item.title}
                    </Link>
                  ))}
                </nav>

                {renderClientSideCode ? (
                  <button
                    type="button"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    title={
                      theme === "dark"
                        ? "Activate light mode"
                        : "Activate dark mode"
                    }
                  >
                    {theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
                  </button>
                ) : null}

                <button
                  onClick={onMenuButtonClick}
                  type="button"
                  className="block md:hidden border px-2 py-1 rounded"
                >
                  Menu
                </button>
              </div>

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
