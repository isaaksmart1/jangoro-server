import { Link } from "@remix-run/react";
import { ROUTES } from "~/utils/utils";

export const Product = ({}) => {
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
              d="M3 20.25h18M3 3.75v16.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 14l3-3 4 4 5-6 2 2"
            />
          </svg>
        </div>
        <Link to={`${ROUTES.roadmap}`}>
          <div className="flex-auto">
            <p className="block font-semibold text-gray">
              Product Roadmap
              <span className="absolute inset-0"></span>
            </p>
            <p className="mt-1 text-gray-600">
              Review the application release schedule
            </p>
          </div>
        </Link>
      </div>
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
              d="M3 7.5h18M3 12h18M3 16.5h18M4.5 3v18m15-18v18"
            />
          </svg>
        </div>
        <div className="flex-auto">
          <a href="#" className="block font-semibold text-gray">
            OpenEnded Ad Manager (IAM)
            <span className="absolute inset-0"></span>
          </a>
          <p className="mt-1 text-gray-600">
            Promote your products and services on OpenEnded using the "OpenEnded
            Ad Manager"
          </p>
        </div>
      </div>
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
              d="M12 1.5c-5.799 0-10.5 4.701-10.5 10.5s4.701 10.5 10.5 10.5 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5zm0 15a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5zm0-6a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z"
            />
          </svg>
        </div>
        <div className="flex-auto">
          <a href="#" className="block font-semibold text-gray">
            Idea Invest
            <span className="absolute inset-0"></span>
          </a>
          <p className="mt-1 text-gray-600">
            Save your best ideas for speaking directly to potential investors
          </p>
        </div>
      </div>
    </div>
  );
};
