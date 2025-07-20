import { ROUTES } from "~/utils/utils";

export const Docs = ({}) => {
  return (
    <div className="mt-2 space-y-2" id="disclosure-1">
      <a
        href={`${ROUTES.docs}`}
        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray hover:bg-gray-50"
      >
        Help
      </a>
    </div>
  );
};
