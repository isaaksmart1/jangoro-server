import "../../css/styles.css";
import demo from "../../assets/img/demo.jpg";

export default function DemoHero({ user, emailRef, email, setEmail }) {
  return (
    <div className="hero-container w-full sm:overflow-hidden sm:rounded-b-[30px]">
      <div className="relative mx-auto w-full md:flex md:flex-row justify-center pb-8 pt-16 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="relative w-full">
          <div className="my-8 w-1/2">
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

        <div className="relative container w-1/2 h-1/2 bg-blue-500 overflow-hidden rounded-3xl p-8">
          <form>
            <h1
              className="text-white-500 p-4"
              style={{ fontSize: 32, color: "white" }}
            >
              Schedule a Demo
            </h1>
            <div className="flex flex-col p-4">
              <label
                htmlFor="email"
                style={{
                  fontSize: 24,
                  color: "white",
                  marginBottom: 12,
                  backgroundColor: "transparent",
                }}
              >
                Email
              </label>
              <input
                style={{
                  border: "1px solid white",
                  borderRadius: 24,
                  padding: 16,
                  backgroundColor: "white",
                }}
                type="email"
                name="email"
                placeholder="Email"
              />
              <button
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid white",
                  borderRadius: 12,
                  fontSize: 16,
                  padding: 12,
                  marginTop: 24,
                  marginBottom: 12,
                }}
              >
                <a
                  href={
                    "https://calendar.google.com/calendar/u/2?cid=dGVhbS5qYW5nb3JvQGdtYWlsLmNvbQ"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pick a Demo Slot <span aria-hidden="true">&rarr;</span>
                </a>
              </button>
              <p className="text-white text-center font-semibold text-sm">
                By continuing, you are agreeing to Jangoro Privacy Policy and
                Terms of Service.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
