import { ROUTES } from "~/utils/utils";

export default function Cookies({ isAcceptCookies, setIsAcceptCookies }) {
  const acceptCookies = () => {
    setIsAcceptCookies(true);
  };

  return !isAcceptCookies ? (
    <div className="fixed bottom-4 left-4 z-50 w-72 max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5 bg-black p-4 text-jgo-white">
      <p>
        By using this website, you agree to our use of cookies. We use cookies
        to provide you with a great experience and to help our website run
        effectively.{" "}
        <a
          href={`${ROUTES.legal}#cookie-policy`}
          className="text-sky-700 underline"
        >
          Learn more
        </a>
      </p>
      <button
        className="bg-jgo-white text-jgo-primary hover:bg-jgo-primary hover:text-jgo-white rounded-xl p-3 mt-8"
        onClick={acceptCookies}
      >
        Accept
      </button>
    </div>
  ) : (
    <></>
  );
}
