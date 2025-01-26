import { ROUTES } from "~/utils/utils";

export const Legal = ({}) => {
  return (
    <div className="mt-2 space-y-2" id="disclosure-1">
      <a
        href={`${ROUTES.legal}#terms`}
        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray hover:bg-gray-50"
      >
        Terms
      </a>
      <a
        href={`${ROUTES.legal}#privacy-policy`}
        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray hover:bg-gray-50"
      >
        Privacy Policy
      </a>
      <a
        href={`${ROUTES.legal}#community-guidelines`}
        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray hover:bg-gray-50"
      >
        Community Guidelines
      </a>
    </div>
  );
};
