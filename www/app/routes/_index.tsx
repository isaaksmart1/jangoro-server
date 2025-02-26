import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useRef, useState } from "react";

import "~/css/styles.css";
import spreadsheet from "~/assets/img/spreadsheet.jpg";
import { AIChatCard } from "~/components/artifacts/features";
import PricingTable from "~/components/artifacts/pricing";
import { Socials } from "~/components/artifacts/socials";
import Cookies from "~/components/layout/cookies";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Hero from "~/components/layout/hero";
import Section from "~/components/layout/section";
import { ROUTES, useOptionalUser } from "~/utils/utils";

const TryItButton = () => (
  <button className="w-1/4 mt-6 py-2 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700">
    <a href={ROUTES.register}>Try It</a>
  </button>
);

export const meta: MetaFunction = () => [{ title: "Jangoro" }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const platform = formData.get("platform");
  try {
    // const user = await createBetaUser({ email: email as string }); // Cast email to string if necessary
    const response = await fetch("http://127.0.0.1:34675/beta/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, platform }),
    });
    const user = await response.json();
    console.log(user); // Check if user is logged correctly
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const user = useOptionalUser();

  const [isAcceptCookies, setIsAcceptCookies] = useState(false);
  const [email, setEmail] = useState(emailRef.current);

  return (
    <main className="relative bg-jgo-primary w-full sm:flex sm:items-center sm:justify-center">
      <div className="relative w-full">
        <Header user={user} />
        <Hero
          user={user}
          emailRef={emailRef}
          email={email}
          setEmail={setEmail}
        />

        <Section
          title="Features"
          description="No more tedious one at a time"
          emailRef={emailRef}
          email={email}
          setEmail={setEmail}
        >
          <div className="flex flex-col justify-center mx-auto">
            <div className="flex flow-row flex-wrap justify-center m-2">
              <AIChatCard />
              <div className="w-full md:w-1/2">
                <h2 className="text-jgo-accent text-2xl font-semibold p-2 mt-16">
                  Analyze Sentiment and Summarise
                </h2>
                <p className="text-white text-lg md:w-96 m-2">
                  Upload survey responses or feedback data. Engage with our
                  in-built AI chatbot to summarize responses, extract key
                  insights, and analyze sentiment.
                </p>
                <TryItButton />
              </div>
            </div>
            <div className="flex flow-row flex-wrap justify-center m-2">
              <div className="w-full md:w-1/2">
                <h2 className="text-jgo-accent text-2xl font-semibold p-2 mt-16">
                  Batch generate and analyze content
                </h2>
                <p className="text-white text-lg md:w-96 m-2">
                  To generate content, answer, or to analyze user review,
                  customer feedback in bulk, just upload your data as CSV, then
                  Jangoro will quickly give you the results.
                </p>
                <TryItButton />
              </div>
              <img
                className="m-5 rounded-2xl"
                src={spreadsheet}
                alt="spreadsheet"
                width={312}
                height={96}
              />
            </div>
          </div>
        </Section>
        <Section
          title="Pricing"
          description=""
          emailRef={emailRef}
          email={email}
          setEmail={setEmail}
        >
          <PricingTable />
        </Section>
        <Section
          title="Join our growing community"
          description=""
          backgroundColor="transparent"
          emailRef={emailRef}
          email={email}
          setEmail={setEmail}
          customVerticalPadding="pt-0 pb-16"
        >
          <Socials />
        </Section>
        <Footer />
        <Cookies
          isAcceptCookies={isAcceptCookies}
          setIsAcceptCookies={setIsAcceptCookies}
        />
      </div>
    </main>
  );
}
