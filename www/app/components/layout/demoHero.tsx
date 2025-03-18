import "../../css/styles.css";
import demo from "../../assets/img/demo.jpg";
import { GACTA } from "~/utils/utils";

export default function DemoHero({ user, emailRef, email, setEmail }) {
  return (
    <div className="hero-container w-full sm:overflow-hidden sm:rounded-b-[30px]">
      <div className="relative mx-auto w-full md:flex md:flex-row justify-center pb-8 pt-16 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="relative w-full">
          <div className="w-full md:w-1/2 my-8">
            <img
              className="relative inset-0 w-full h-full rounded-3xl"
              src={demo}
              width={128}
              height={128}
              alt="demo"
            />
            <h1 className="block text-jgo-accent drop-shadow-md text-left text-4xl m-4">
              Request a Demo
            </h1>
            <br />
            <ul className="demo-list-details">
              <li className="text-jgo-white drop-shadow-md text-left text-xl">
                Demo tailored to your unique business needs
              </li>
              <li className="text-jgo-white drop-shadow-md text-left text-xl">
                In-depth preview into features of your choice
              </li>
              <li className="text-jgo-white drop-shadow-md text-left text-xl">
                Smart solutions from our experts
              </li>
            </ul>
          </div>
        </div>

        <div className="relative w-full h-full md:w-1/2 md:h-1/2 bg-blue-500 overflow-hidden rounded-3xl p-8">
          <form>
            <h1 className="text-white p-4 text-2xl md:text-3xl">
              Schedule a Demo
            </h1>
            <div className="flex flex-col p-4">
              <label htmlFor="email" className="text-white text-lg mb-3">
                Email
              </label>
              <input
                className="border border-white rounded-3xl p-4 bg-white"
                type="email"
                name="email"
                placeholder="Email"
              />
              <a
                href="https://calendly.com/team-idearify/jangoro-demo"
                className="text-white bg-black border border-white rounded-xl text-base text-center p-3 mt-6 mb-3"
                onClick={() => GACTA("Demo Slot")}
              >
                Pick a Demo Slot <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="text-white text-center font-semibold text-sm">
                By continuing, you are agreeing to Jangoro's Privacy Policy and
                Terms of Service.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
