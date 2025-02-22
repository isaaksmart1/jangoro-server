import { Link } from "@remix-run/react";

import "~/css/styles.css";
import discord from "~/assets/img/discord.png";
import linkedin from "~/assets/img/linkedin.png";
import logo from "~/assets/img/logo.png";
import tiktok from "~/assets/img/tiktok.png";
import twitter from "~/assets/img/twitter.png";
import { ROUTES } from "~/utils/utils";

export default function Footer({}) {
  return (
    <footer className="footer bg-jgo-tertiary">
      <nav
        className="mx-auto flex flex-row flex-wrap max-w-7xl items-center justify-between p-6 pb-16 sm:mt-16 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 mb-8">
          <a href="/" className="-m-1.5 p-1.5 flex flex-row items-center">
            <span className="sr-only">Jangoro</span>
            <div className="logo-container w-40 flex flex-row items-center p-2">
              <img src={logo} alt="Jangoro" className="h-12 w-auto" />
            </div>
          </a>
        </div>

        <div className="flex flex-row flex-wrap lg:flex lg:gap-x-12">
          <div className="relative w-[256px] my-3">
            <h1
              className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-jgo-accent mb-3"
              aria-expanded="false"
            >
              Company
            </h1>
            <ul>
              <li className="text-jgo-white my-1">
                <Link to={`${ROUTES.company}`}>About Us</Link>
              </li>
            </ul>
          </div>

          <div className="relative w-[256px] my-3">
            <h1
              className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-jgo-accent mb-3"
              aria-expanded="false"
            >
              Legal
            </h1>
            <ul>
              <li className="text-jgo-white my-1">
                <Link to={`${ROUTES.legal}#privacy-policy`}>
                  Privacy Policy
                </Link>
              </li>
              <li className="text-jgo-white my-1">
                <Link to={`${ROUTES.legal}#terms`}>Terms and Conditions</Link>
              </li>
              <li className="text-jgo-white my-1">
                <Link to={`${ROUTES.legal}#cookie-policy`}>Cookie Policy</Link>
              </li>
            </ul>
          </div>

          <div className="relative w-[256px] my-3">
            <h1
              className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-jgo-accent mb-3"
              aria-expanded="false"
            >
              Contact Us
            </h1>
            <ul>
              <li className="text-jgo-white my-1">
                <a href="mailto:team.jangoro@gmail.com">team@jangoro.com</a>
              </li>
            </ul>
          </div>

          <div className="relative w-[256px] my-3">
            <h1
              className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-jgo-accent mb-3"
              aria-expanded="false"
            >
              Socials
            </h1>
            <ul className="flex flex-row">
              {/* <li className="social-icon bg-jgo-white p-2 mx-1">
                <a href="https://discord.com/invite/bapedUtcEv">
                  <img src={discord} alt="Discord" className="h-4 w-auto" />
                </a>
              </li>
              <li className="social-icon bg-jgo-white p-2 mx-1">
                <img src={linkedin} alt="LinkedIn" className="h-4 w-auto" />
              </li> */}
              <li className="social-icon bg-jgo-white p-2 mx-1">
                <a href="https://x.com/JangoroOfficial">
                  <img src={twitter} alt="X" className="h-4 w-auto" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <p className="text-jgo-white p-4">
        &copy; 2025 Jangoro Ltd. All rights reserved.
      </p>
    </footer>
  );
}
