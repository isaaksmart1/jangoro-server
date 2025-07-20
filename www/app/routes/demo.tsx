import type { MetaFunction } from "@remix-run/node";
import { useRef, useState } from "react";

import "~/css/styles.css";
import DemoHero from "~/components/layout/demoHero";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import TechUsed from "~/components/sections/techUsed";
import { useOptionalUser } from "~/utils/utils";

export const meta: MetaFunction = () => [{ title: "Jangoro" }];

export default function Demo() {
  const emailRef = useRef<HTMLInputElement>(null);
  const user = useOptionalUser();

  const [email, setEmail] = useState(emailRef.current);

  return (
    <main className="relative bg-jgo-primary w-full sm:flex sm:items-center sm:justify-center">
      <div className="relative w-full">
        <Header user={user} />
        <DemoHero
          user={user}
          emailRef={emailRef}
          email={email}
          setEmail={setEmail}
        />
        {/* <TechUsed /> */}
        <Footer />
      </div>
    </main>
  );
}
