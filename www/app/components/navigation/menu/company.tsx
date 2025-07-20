import { Link } from "@remix-run/react";
import { ROUTES } from "~/utils/utils";

export const Company = ({}) => {
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
              d="M3 6.75A1.5 1.5 0 0 1 4.5 5.25h15A1.5 1.5 0 0 1 21 6.75v12A1.5 1.5 0 0 1 19.5 20.25h-15A1.5 1.5 0 0 1 3 18.75v-12zm1.5 0v12m0 0h15v-12m-15 0h-1.5m1.5 0H6m12 0h2.25m-2.25 0h-1.5m-9 0H3m1.5-1.5v-1.5a.75.75 0 0 1 .75-.75h11.25a.75.75 0 0 1 .75.75v1.5"
            />
          </svg>
        </div>
        <Link to={`${ROUTES.company}`}>
          <div className="flex-auto">
            <p className="block font-semibold text-gray">
              About Us
              <span className="absolute inset-0"></span>
            </p>
            <p className="mt-1 text-gray-600">
              Learn who we are and what we do
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
