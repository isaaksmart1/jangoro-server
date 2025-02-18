import { Link } from "@remix-run/react";
import { ROUTES } from "~/utils/utils";

export const Docs = ({}) => {
  return (
    <div className="p-4">
      <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-jgo-white">
          <svg
            className="h-6 w-6 text-gray-600 group-hover:text-jgo-secondary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2.25a.75.75 0 0 0-.75.75v1.5h-6A2.25 2.25 0 0 0 3 6.75v13.5A2.25 2.25 0 0 0 5.25 22.5h13.5A2.25 2.25 0 0 0 21 20.25v-13.5A2.25 2.25 0 0 0 18.75 4.5h-6v-1.5a.75.75 0 0 0-.75-.75zm-3 6h6M12 12h6m-6 4h6m-7.5 0h-3m3-4h-3m-3 0h3m0 4h-3"
            />
          </svg>
        </div>
        <Link to={`${ROUTES.docs}`}>
          <div className="flex-auto">
            <p className="block font-semibold text-gray">
              Help
              <span className="absolute inset-0"></span>
            </p>
            <p className="mt-1 text-gray-600">
              Get a better understanding of how jangoro works
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
