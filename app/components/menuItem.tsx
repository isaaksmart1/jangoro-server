import { useEffect, useState } from "react";
import { Legal } from "./menu/legal";
import { Product } from "./menu/product";
import { Company } from "./menu/company";

export const MenuItem = ({ content }) => {
  const [menuItem, setMenuItem] = useState(<></>);

  useEffect(() => {
    if (content === "legal") setMenuItem(<Legal />);
    else if (content === "product") setMenuItem(<Product />);
    else if (content === "company") setMenuItem(<Company />);
  }, []);

  return (
    <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-oe-white shadow-lg ring-1 ring-gray-900/5">
      {menuItem}
    </div>
  );
};
