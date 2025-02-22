import { motion } from "framer-motion";
import "../../css/styles.css";

import hero from "../../assets/img/hero.png";
import TypedText from "../artifacts/typed";
import SignUpForm from "../signUpForm";

export default function Hero({ user, emailRef, email, setEmail }) {
  const phrases = [
    "Shape Any Idea",
    "Think Beyond the Norm",
    "Inspire Together",
  ];
  return (
    <div className="hero-container w-full sm:overflow-hidden sm:rounded-b-[30px]">
      <div className="relative mx-auto w-full md:flex md:flex-row justify-center pb-8 pt-16 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="relative w-full">
          {/* <h1 className="text-left text-6xl font-extrabold tracking-tight sm:text-6xl lg:text-6xl">
            <TypedText texts={phrases} />
          </h1> */}
          <div className="my-8 w-1/2">
            <h1 className="block text-jgo-accent drop-shadow-md text-left text-4xl">
              Unlock Insights in Seconds.
            </h1>
            <br />
            <p className="block text-jgo-white drop-shadow-md text-left text-xl">
              Transform customer survey data into actionable results with our
              powerful analysis tool—fast, accurate, and effortless. Know what
              matters most, instantly.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.img
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.8, 0.25, 1],
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 80,
              },
            }}
            className="relative inset-0 w-full h-full object-cover"
            src={hero}
            alt="OE App Phone"
          />
        </div>
      </div>
    </div>
  );
}
