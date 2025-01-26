import { Link } from "@remix-run/react";
import { ROUTES } from "~/utils/utils";

export const Company = ({}) => {
  return (
    <div className="p-4">
      <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-oe-white">
          <svg
            className="h-6 w-6 text-gray-600 group-hover:text-oe-secondary"
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
      {/* <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-oe-white">
          <svg
            className="h-6 w-6 text-gray-600 group-hover:text-oe-secondary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
            />
          </svg>
        </div>
        <div className="flex-auto">
          <a href="#" className="block font-semibold text-gray">
            Careers
            <span className="absolute inset-0"></span>
          </a>
          <p className="mt-1 text-gray-600">
            See what opportunities are available working with us
          </p>
        </div>
      </div> */}
      <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-oe-white">
          <svg
            className="h-6 w-6 text-gray-600 group-hover:text-oe-secondary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-.25-3.25a1.25 1.25 0 1 1 1.25-1.25 1.25 1.25 0 0 1-1.25 1.25zm1.5-5.75v-1a2 2 0 1 0-4 0h1.5a.5.5 0 0 1 1 0v.25a2.25 2.25 0 0 0 2 2.25h.5v1.5H13a.5.5 0 0 1 0-1h.25a1 1 0 0 0 0-2z"
            />
          </svg>
        </div>
        <div className="flex-auto">
          <a href="#" className="block font-semibold text-gray">
            Help Center
            <span className="absolute inset-0"></span>
          </a>
          <p className="mt-1 text-gray-600">
            Get assistance from our help center
          </p>
        </div>
      </div>
      <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-oe-white">
          <svg
            className="h-6 w-6 text-gray-600 group-hover:text-openended-yellow"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <div className="flex-auto">
          <a href="#" className="block font-semibold text-gray">
            Resources
            <span className="absolute inset-0"></span>
          </a>
          <p className="mt-1 text-gray-600">Expand your learning online</p>
        </div>
      </div>
    </div>
  );
};
