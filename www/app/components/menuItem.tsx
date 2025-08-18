import { useEffect, useState } from "react";

import { Company } from "./navigation/menu/company";
import { Docs } from "./navigation/menu/docs";
import { Legal } from "./navigation/menu/legal";
import { Guides } from "./navigation/menu/guides";

export const MenuItem = ({ content }) => {
  const [menuItem, setMenuItem] = useState(<></>);

  useEffect(() => {
    if (content === "legal") setMenuItem(<Legal />);
    else if (content === "company") setMenuItem(<Company />);
    else if (content === "docs") setMenuItem(<Docs />);
    else if (content === "guides") setMenuItem(<Guides />);
  }, []);

  return (
    <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-jgo-white shadow-lg ring-1 ring-gray-900/5">
      {menuItem}
    </div>
  );
};
