import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";

import appStore from "../assets/img/app-store-logo-2.png";
import playStore from "../assets/img/play-store-logo-2.png";

export default function SignUpForm({ emailRef, email, setEmail }) {
  const [signedUp, setSignedUp] = useState(false);
  const [signUpText, setSignUpText] = useState("Sign Up");
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    if (signedUp) {
      const timer = setTimeout(() => {
        setSignedUp(false);
        setSignUpText("Sign Up");
        setEmail("");
      }, 1000);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [signedUp]);

  // return (
  //   <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
  //     <p className="text-jgo-primary font-bold text-xl p-4 h-16 text-jgo-white justify-center bg-jgo-primary">
  //       Get Early Access
  //     </p>
  //     <Form
  //       method="post"
  //       className="flex flex-col items-stretch gap-4 md:flex-row md:items-center"
  //     >
  //       <label className="sr-only" htmlFor="earlyAccessForm">
  //         Get Early Access
  //       </label>

  //       <select
  //         name="platform"
  //         className="form-control w-full max-w-xs h-16 p-4 bg-jgo-white text-slate-400 border border-gray-300 rounded"
  //         defaultValue=""
  //         onChange={(e) => setPlatform(e.target.value)}
  //       >
  //         <option value="" disabled>
  //           Which platform?
  //         </option>
  //         <option value="Android" className="text-jgo-black">
  //           Android
  //         </option>
  //         <option value="iOS" className="text-jgo-black">
  //           iOS
  //         </option>
  //       </select>

  //       <input
  //         ref={emailRef}
  //         type="email"
  //         name="email"
  //         className="form-control w-full max-w-xs h-16 p-4 border border-gray-300 rounded"
  //         id="earlyAccessForm"
  //         placeholder="Email Address"
  //         value={email}
  //         onChange={(event) => setEmail(event.target.value)}
  //       />

  //       <button
  //         type="submit"
  //         className={`w-full max-w-xs h-16 rounded bg-jgo-primary text-jgo-white p-4 ${
  //           signedUp ? "bg-sky-500" : "hover:bg-green-700"
  //         }`}
  //         onClick={() => {
  //           if (email) {
  //             setSignedUp(true);
  //             setSignUpText("✓");
  //           } else {
  //             return;
  //           }
  //         }}
  //       >
  //         {signUpText}
  //       </button>
  //     </Form>
  //   </div>
  // );

  return (
    <div className="relative md:flex md:flex-row w-full justify-center">
      <a href="https://apps.apple.com/us/app/jangoro/id6670697772">
        <img
          className="store-icon my-4 md:m-4 object-cover rounded-[15px]"
          src={appStore}
          alt="App Store"
        />
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.jangoro">
        <img
          className="store-icon my-4 md:m-4 object-cover rounded-[15px]"
          src={playStore}
          alt="Play Store"
        />
      </a>
    </div>
  );
}
