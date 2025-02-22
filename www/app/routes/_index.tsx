import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, useActionData } from "@remix-run/react";
import { useRef, useState } from "react";

import "~/css/styles.css";

import PricingTable from "~/components/artifacts/pricing";
import { Socials } from "~/components/artifacts/socials";
import Cookies from "~/components/layout/cookies";
import Demo from "~/components/layout/demoHero";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import Hero from "~/components/layout/hero";
import Section from "~/components/layout/section";
import SignUpForm from "~/components/signUpForm";
import TechUsed from "~/components/techUsed";
import { createBetaUser } from "~/models/beta.server";
import { useOptionalUser } from "~/utils/utils";

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
        {/* <TechUsed /> */}
        <Section
          title="AI Summarizing and Sentiment Analysis"
          description="Upload survey responses or feedback data. Engage with our in-built AI chatbot to summarize responses, extract key insights, and analyze sentiment."
          emailRef={emailRef}
          email={email}
          setEmail={setEmail}
        />
        {/* <Demo /> */}
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
