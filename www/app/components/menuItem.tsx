import { useEffect, useState } from "react";

import { Company } from "./menu/company";
import { Legal } from "./menu/legal";
import { Docs } from "./menu/docs";

export const MenuItem = ({ content }) => {
  const [menuItem, setMenuItem] = useState(<></>);

  useEffect(() => {
    if (content === "legal") setMenuItem(<Legal />);
    else if (content === "company") setMenuItem(<Company />);
    else if (content === "docs") setMenuItem(<Docs />);
  }, []);

  return (
    <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-oe-white shadow-lg ring-1 ring-gray-900/5">
      {menuItem}
    </div>
  );
};
