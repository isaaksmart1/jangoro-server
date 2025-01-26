import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, useActionData } from "@remix-run/react";
import { useRef, useState } from "react";

import "~/css/styles.css";

import { Socials } from "~/components/artifacts/socials";
import Cookies from "~/components/cookies";
import Demo from "~/components/demo";
import Footer from "~/components/footer";
import Header from "~/components/header";
import Hero from "~/components/hero";
import Section from "~/components/section";
import SignUpForm from "~/components/signUpForm";
import TechUsed from "~/components/techUsed";
import { createBetaUser } from "~/models/beta.server";
import { useOptionalUser } from "~/utils/utils";

export const meta: MetaFunction = () => [{ title: "OpenEnded" }];

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
    <main className="relative bg-oe-primary w-full sm:flex sm:items-center sm:justify-center">
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
          title="AI Assistant"
          description="Upload source material. Ask questions about your idea to our in-built AI chatbot. Formulate new ideas through having a virtual conversation and receive insightful responses."
          emailRef={emailRef}
          email={email}
          setEmail={setEmail}
        />
        {/* <Demo /> */}
        <Section
          title="Safeguard your ideas"
          description=" Lock your idea from public view and setup digital signature authorization to control who sees your idea."
          emailRef={emailRef}
          email={email}
          setEmail={setEmail}
        />
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
