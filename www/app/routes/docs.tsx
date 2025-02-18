import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import Docs from "~/components/docs/docs";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { ROUTES } from "~/utils/utils";

export const meta: MetaFunction = () => [{ title: "Docs" }];

export default function DocsPage() {
  const [pageURL, setPageUrl] = useState(ROUTES.docs);
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
        <ul className="flex flex-row flex-wrap w-full p-4 bg-jgo-tertiary">
          <li className="text-slate-300 font-bold my-2 md:my-0 mx-4">
            <a href="#" onClick={() => handleSetUrl("/docs")}>
              Docs
            </a>
          </li>
        </ul>

        <div className="w-full bg-slate-100">
          {pageURL.endsWith("docs") ? (
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col flex-wrap w-10/12 md:w-2/5 m-8 p-8 border-2 border-slate-400 rounded-xl">
                <h1 className="text-3xl">Documentation</h1>
                <Docs />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}
