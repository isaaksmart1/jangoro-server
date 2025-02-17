import { useEffect, useState } from "react";
import { Legal } from "./sidebar/legal";
import { Company } from "./sidebar/company";
import { Docs } from "./sidebar/docs";

export const SideBarItem = ({ title }) => {
  const [isExpanded, setExpand] = useState(false);
  const [menuItem, setMenuItem] = useState(<></>);

  useEffect(() => {
    if (title.toLowerCase() === "legal") setMenuItem(<Legal />);
    else if (title.toLowerCase() === "company") setMenuItem(<Company />);
    else if (title.toLowerCase() === "docs") setMenuItem(<Docs />);
  }, []);

  return (
    <div className="-mx-3">
      <button
        type="button"
        className="flex w-full items-center justify-start rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray hover:bg-gray-50"
        aria-controls="disclosure-1"
        aria-expanded="false"
        onClick={() => setExpand(!isExpanded)}
      >
        <svg
          className="h-5 w-5 flex-none"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <p className="ml-3">{title}</p>
      </button>
      {isExpanded && menuItem}
    </div>
  );
};
