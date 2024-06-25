import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "phosphor-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import HamburgerMenu from "components/HamburgerMenu";
import { menu } from "constants/menu";
import blogConfig from "blog.config.mjs";
import PropTypes from "prop-types";

function TopNavigation({ className = "" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [renderClientSideCode, setRenderClientSideCode] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

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
    <div>
      <HamburgerMenu
        isMenuOpen={isMenuOpen}
        onMenuCloseClick={onMenuCloseClick}
      />
      <div className="py-4 bg-stone-900 text-white border-b dark:border-b-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className={className}>
            <div className="flex justify-between items-center mx-2">
              <div className="justify-self-start">
                <Link
                  href="/"
                  className="flex justify-start gap-2 items-center"
                >
                  <Image src="/favicon.ico" width={28} height={28} />
                  <h2 className="text-xl">{blogConfig.siteHeader}</h2>
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
                      setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                    title={
                      resolvedTheme === "dark"
                        ? "Activate light mode"
                        : "Activate dark mode"
                    }
                  >
                    {resolvedTheme === "dark" ? (
                      <Moon size={24} className="hover:text-yellow-400" />
                    ) : (
                      <Sun size={24} className="hover:text-yellow-400" />
                    )}
                  </button>
                ) : null}

                <button
                  onClick={onMenuButtonClick}
                  type="button"
                  className="block md:hidden border px-2 py-1 rounded-md"
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
    </div>
  );
}

TopNavigation.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string
}

export default TopNavigation;
