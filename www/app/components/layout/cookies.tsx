import { ROUTES } from "~/utils/utils";
import { setCookieConsent } from "~/utils/cookieConsent";

interface CookiesProps {
  isAcceptCookies: boolean;
  setIsAcceptCookies: (accepted: boolean) => void;
}

export default function Cookies({ isAcceptCookies, setIsAcceptCookies }: CookiesProps) {
  const acceptCookies = () => {
    // Persist the consent in localStorage
    setCookieConsent(true);
    // Update the local state
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
