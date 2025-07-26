import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {
  useTagTrackPageViews,
  useTrackPageViews,
} from "./components/analytics/track";
import { getUser } from "~/server/session.server";
import stylesheet from "~/css/tailwind.css";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png",
  },
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  useTrackPageViews();
  useTagTrackPageViews();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta
          name="description"
          content="AI-powered Survey and Review analytics solution."
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="keywords"
          content="Jangoro, AI Survey Analytics, Review Insights, Customer Feedback Analysis, Data Insights, AI Reviews, Sentiment Analysis, Business Intelligence, Market Research, Customer Satisfaction, AI-powered Reviews, AI Feedback, Online Surveys, User Experience Analytics, Consumer Data, Competitive Analysis"
        />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-428437575"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-428437575');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            function gtag_report_conversion_free(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-428437575/XwYeCJeKlfkaEMfgpcwB',
                  'value': 1.0,
                  'currency': 'GBP',
                  'event_callback': callback
              });
              return false;
            }
          `,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            function gtag_report_conversion_month(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-428437575/UkRSCJqKlfkaEMfgpcwB',
                  'value': 1.0,
                  'currency': 'GBP',
                  'event_callback': callback
              });
              return false;
            }`,
          }}
        ></script>
                <script
          dangerouslySetInnerHTML={{
            __html: `
            function gtag_report_conversion_year(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-428437575/IqMhCJ2KlfkaEMfgpcwB',
                  'value': 1.0,
                  'currency': 'GBP',
                  'event_callback': callback
              });
              return false;
            }
            `,
          }}
        ></script>
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-K727R6YZS5"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-K727R6YZS5');
            `,
          }}
        /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "About Us",
                  item: "https://jangoro.com/company",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Legal",
                  item: "https://jangoro.com/legal",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="h-full">
        <noscript></noscript>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
