import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";

import Footer from "~/components/footer";
import Header from "~/components/header";
import AdPolicy from "~/components/legal/adPolicy";
import {
  CookiePolicies,
  AdPolicies,
  PrivacyPolicies,
  TermsPolicies,
} from "~/components/legal/archives/archive";
import Policy from "~/components/legal/archives/policy";
import CommunityGuidelines from "~/components/legal/communityGuidelines";
import CookiePolicy from "~/components/legal/cookiePolicy";
import IPPolicy from "~/components/legal/ipPolicy";
import { LegalSnippet } from "~/components/legal/legal";
import PrivacyPolicy from "~/components/legal/privacyPolicy";
import Terms from "~/components/legal/terms";
import { ROUTES } from "~/utils/utils";

export const meta: MetaFunction = () => [{ title: "Legal" }];

export default function LegalPage() {
  const [pageURL, setPageUrl] = useState(ROUTES.login);
  const [activeItem, setActiveItem] = useState("default");
  const [href, setHref] = useState("#");

  const handleSetUrl = (url) => {
    setHref(url);
    setActiveItem("default");
  };

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
            <a href="#ad-policy" onClick={() => handleSetUrl("#ad-policy")}>
              Ad policy
            </a>
          </li>
          <li className="text-slate-300 font-bold my-2 md:my-0 mx-4">
            <a
              href="#privacy-policy"
              onClick={() => handleSetUrl("#privacy-policy")}
            >
              Privacy policy
            </a>
          </li>
          <li className="text-slate-300 font-bold my-2 md:my-0 mx-4">
            <a href="#terms" onClick={() => handleSetUrl("#terms")}>
              Terms and conditions
            </a>
          </li>
          <li className="text-slate-300 font-bold my-2 md:my-0 mx-4">
            <a
              href="#community-guidelines"
              onClick={() => handleSetUrl("#community-guidelines")}
            >
              Policy, safety and copyright
            </a>
          </li>
          <li className="text-slate-300 font-bold my-2 md:my-0 mx-4">
            <a
              href="#cookie-policy"
              onClick={() => handleSetUrl("#cookie-policy")}
            >
              Cookie policy
            </a>
          </li>
          <li className="text-slate-300 font-bold my-2 md:my-0 mx-4">
            <a href="#ip-policy" onClick={() => handleSetUrl("#ip-policy")}>
              IP policy & terms
            </a>
          </li>
        </ul>

        {(linkURL === "" || pageURL === "#") && <LegalSnippet />}

        <div className="w-full bg-slate-100">
          {linkURL.includes("ad-policy") ? (
            <div className="flex flex-col md:flex-row">
              {Object.keys(AdPolicies).length > 0 && (
                <div className="p-8 text-slate-900">
                  <p className="text-2xl my-4">Archives</p>
                  {Object.keys(AdPolicies).map((policy) => (
                    <Policy
                      policy={policy}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      setHref={setHref}
                      pageURL="ad-policy"
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col flex-wrap w-10/12 md:w-2/5 m-8 p-8 border-2 border-slate-400 rounded-xl">
                <h1 className="text-3xl">OpenEnded's Ad Policy</h1>
                {linkURL.includes(activeItem.split("/").join("")) ? (
                  AdPolicies[activeItem]()
                ) : (
                  <AdPolicy />
                )}
              </div>
            </div>
          ) : null}

          {linkURL.includes("privacy-policy") ? (
            <div className="flex flex-col md:flex-row">
              {Object.keys(PrivacyPolicies).length > 0 && (
                <div className="p-8 text-slate-900">
                  <p className="text-2xl my-4">Archives</p>
                  {Object.keys(PrivacyPolicies).map((policy) => (
                    <Policy
                      policy={policy}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      setHref={setHref}
                      pageURL="privacy-policy"
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col flex-wrap w-10/12 md:w-2/5 m-8 p-8 border-2 border-slate-400 rounded-xl">
                <h1 className="text-3xl">OpenEnded's Privacy Policy</h1>
                {linkURL.includes(activeItem.split("/").join("")) ? (
                  PrivacyPolicies[activeItem]()
                ) : (
                  <PrivacyPolicy />
                )}
              </div>
            </div>
          ) : null}

          {linkURL.includes("terms") ? (
            <div className="flex flex-col md:flex-row">
              {Object.keys(TermsPolicies).length > 0 && (
                <div className="p-8 text-slate-900">
                  <p className="text-2xl my-4">Archives</p>
                  {Object.keys(TermsPolicies).map((policy) => (
                    <Policy
                      policy={policy}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      setHref={setHref}
                      pageURL="terms"
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col flex-wrap w-10/12 md:w-2/5 m-8 p-8 border-2 border-slate-400 rounded-xl">
                <h1 className="text-3xl">
                  OpenEnded's Corporate Terms and Conditions
                </h1>
                {linkURL.includes(activeItem.split("/").join("")) ? (
                  TermsPolicies[activeItem]()
                ) : (
                  <Terms />
                )}
              </div>
            </div>
          ) : null}

          {linkURL.includes("community-guidelines") ? (
            <div className="flex flex-col flex-wrap w-10/12 md:w-2/5 m-8 p-8 border-2 border-slate-400 rounded-xl">
              <h1 className="text-3xl">OpenEnded's Community Guidelines</h1>
              <CommunityGuidelines />
            </div>
          ) : null}

          {linkURL.includes("cookie-policy") ? (
            <div className="flex flex-col md:flex-row">
              {Object.keys(CookiePolicies).length > 0 && (
                <div className="p-8 text-slate-900">
                  <p className="text-2xl my-4">Archives</p>
                  {Object.keys(CookiePolicies).map((policy) => (
                    <Policy
                      policy={policy}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                      setHref={setHref}
                      pageURL="cookie-policy"
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col flex-wrap w-10/12 md:w-2/5 m-8 p-8 border-2 border-slate-400 rounded-xl">
                <h1 className="text-3xl">How we use Cookies</h1>
                {linkURL.includes(activeItem.split("/").join("")) ? (
                  CookiePolicies[activeItem]()
                ) : (
                  <CookiePolicy />
                )}
              </div>
            </div>
          ) : null}

          {linkURL.includes("ip-policy") ? (
            <div className="flex flex-col flex-wrap w-10/12 md:w-2/5 m-8 p-8 border-2 border-slate-400 rounded-xl">
              <h1 className="text-3xl">OpenEnded's IP Policy</h1>
              <IPPolicy>
                <h1 className="text-3xl">OpenEnded's IP Terms</h1>
              </IPPolicy>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}
