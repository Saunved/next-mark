import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "phosphor-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import blogConfig from "blog.config.mjs";
import PropTypes from "prop-types";
import opineKit from "helpers/opineKit";

function TopNavigation({ className = "" }) {
  const [renderClientSideCode, setRenderClientSideCode] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // https://blog.hao.dev/render-client-side-only-component-in-next-js
  useEffect(() => {
    setRenderClientSideCode(true);
    opineKit.onThemeChange(resolvedTheme)
  }, [resolvedTheme]);

  return (
    <div>
      <div className="py-4 bg-stone-900 text-white border-b dark:border-b-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className={className}>
            <div className="flex justify-between items-center mx-2">
              <div className="justify-self-start">
                <Link
                  href="/"
                  className="flex justify-start gap-2 items-center"
                >
                  <Image src="/favicon.ico" width={28} height={28} alt="Website logo" />
                  <h2 className="text-xl">{blogConfig.siteHeader}</h2>
                </Link>
              </div>

              <div className="flex gap-6 md:gap-10 justify-between">
                {renderClientSideCode ? (
                  <button
                    type="button"
                    onClick={() => {
                      setTheme(resolvedTheme === "dark" ? "light" : "dark");
                      opineKit.onThemeChange(resolvedTheme === "dark" ? "light" : "dark")
                    }
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
