import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import About from "~/components/company/about";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { ROUTES } from "~/utils/utils";

export const meta: MetaFunction = () => [{ title: "About Us" }];

export default function CompanyPage() {
  const [pageURL, setPageUrl] = useState(ROUTES.login);
  const [activeItem, setActiveItem] = useState("default");
  const [href, setHref] = useState("#");

  const handleSetUrl = (url) => {
    setHref(url);
    setActiveItem("default");
  };

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (href !== "#") setPageUrl(href);
  }, [href]);

  const linkURL = pageURL.split(ROUTES.login)[1];

  return (
    <div>
      <Header />
      <div className="flex min-h-full flex-col">
        <ul className="flex flex-row flex-wrap w-full p-4 bg-oe-primary">
          <li className="text-slate-300 font-bold my-2 md:my-0 mx-4">
            <a href="#" onClick={() => handleSetUrl("/company")}>
              About Us
            </a>
          </li>
        </ul>

        <div className="w-full bg-slate-100">
          {pageURL.endsWith("company") ? (
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col flex-wrap w-10/12 md:w-2/5 m-8 p-8 border-2 border-slate-400 rounded-xl">
                <h1 className="text-3xl">About Us</h1>
                <About />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}
