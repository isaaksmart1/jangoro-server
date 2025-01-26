import { ROUTES } from "~/utils/utils";

export const Product = ({}) => {
  return (
    <div className="mt-2 space-y-2" id="disclosure-1">
      <a
        href={`${ROUTES.roadmap}`}
        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray hover:bg-gray-50"
      >
        Product Roadmap
      </a>
      <a
        href="#"
        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray hover:bg-gray-50"
      >
        OpenEnded Ad Manager (IAM)
      </a>
      <a
        href="#"
        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray hover:bg-gray-50"
      >
        Idea Invest
      </a>
    </div>
  );
};
