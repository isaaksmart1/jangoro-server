import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import Header from "~/components/layout/header";
import Footer from "~/components/layout/footer";
import DocsNavigation from "~/components/docs/docs-navigation";
import DocsSidebar from "~/components/docs/docs-sidebar";
import DocsContent from "~/components/docs/docs-content";
import ExamplesSection from "~/components/docs/examples-section";
import { ROUTES } from "~/utils/utils";

export const meta: MetaFunction = () => [{ title: "Docs" }];

export default function DocsPage() {
  const [pageURL, setPageUrl] = useState(ROUTES.docs);
  const [activeSection, setActiveSection] = useState("docs");
  const [href, setHref] = useState("#");

  const handleSectionChange = (section: string) => {
    setHref(`#${section}`);
    setActiveSection(section);
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
      <div className="bg-slate-50 font-sans min-h-screen">
        <DocsNavigation
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <DocsSidebar />

            <div className="flex-1 min-w-0">
              {pageURL.endsWith("docs") && <DocsContent />}
              {pageURL.endsWith("examples") && <ExamplesSection />}
              {pageURL.endsWith("api") && (
                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">
                    API Reference
                  </h1>
                  <p className="text-lg text-slate-600 mb-8">
                    Complete API documentation for integrating Jangoro into your
                    applications.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
                    <p className="text-amber-800">
                      🚧 API documentation is coming soon. Contact support for
                      early access.
                    </p>
                  </div>
                </div>
              )}
              {pageURL.endsWith("tutorials") && (
                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">
                    Video Tutorials
                  </h1>
                  <p className="text-lg text-slate-600 mb-8">
                    Step-by-step video guides to master Jangoro's features.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <p className="text-blue-800">
                      📹 Video tutorials are being produced. Subscribe to our
                      newsletter for updates.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
