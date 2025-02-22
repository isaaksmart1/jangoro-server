import { useState } from "react";

import { MenuItem } from "../menuItem";
import { SideBarItem } from "../sideBarItem";

import "~/css/styles.css";
import logo from "~/assets/img/logo.png";
import { ROUTES } from "~/utils/utils";

export default function Header({ user }) {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuItem = (item) => {
    setActiveMenuItem((prevMenuItem) => {
      if (prevMenuItem === null) {
        return item;
      }
      return null;
    });
  };

  return (
    <header className="header bg-jgo-primary">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex flex-row items-center">
            <span className="sr-only">Jangoro</span>
            <img src={logo} alt="Jangoro" className="h-12 w-auto" />
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-jgo-white-700"
            onClick={() => setMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fff"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-jgo-white"
              aria-expanded="false"
              onClick={() => toggleMenuItem("company")}
            >
              Company
              <svg
                className="h-5 w-5 flex-none text-jgo-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {activeMenuItem === "company" ? (
              <MenuItem content="company" />
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-jgo-white"
              aria-expanded="false"
              onClick={() => toggleMenuItem("legal")}
            >
              Legal
              <svg
                className="h-5 w-5 flex-none text-jgo-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {activeMenuItem === "legal" ? <MenuItem content="legal" /> : null}
          </div>

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-jgo-white"
              aria-expanded="false"
              onClick={() => toggleMenuItem("docs")}
            >
              Docs
              <svg
                className="h-5 w-5 flex-none text-jgo-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {activeMenuItem === "docs" ? <MenuItem content="docs" /> : null}
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href={ROUTES.login}
            className="text-lg font-semibold leading-6 text-jgo-white"
          >
            Log In <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <a
          href="https://jangoro.com/demo"
          className="button bg-blue-500 text-white mx-3 p-3 rounded-2xl "
        >
          Book a Demo
        </a>
      </nav>

      {menuOpen ? (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>

          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-jgo-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5 flex flex-row items-center">
                <span className="sr-only">Jangoro</span>
                <img src={logo} alt="Jangoro" className="h-12 w-auto" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-jgo-white-700"
                onClick={() => setMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <SideBarItem title="Company" />
                  <SideBarItem title="Legal" />
                  <SideBarItem title="Docs" />
                </div>
                <div className="py-6">
                  <a
                    href={ROUTES.login}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray hover:bg-gray-50"
                  >
                    Log In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
