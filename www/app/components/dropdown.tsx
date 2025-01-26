import { useState } from "react";

export default function Dropdown({ title, options, setOptions }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (option) => {
    let newOptions = options;
    newOptions.map((opt) => {
      if (opt.text === option.text) opt.isActive = true;
      else opt.isActive = false;
      return opt;
    });
    setOptions(newOptions);
    setShowDropdown(false);
  };

  const selectedOption = options.filter((option) => option.isActive)[0];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-oe-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {selectedOption ? selectedOption.text : title}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
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
        </button>
      </div>

      {showDropdown && (
        <div
          className="absolute z-10 mt-2 w-96 origin-top-right rounded-md bg-oe-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map((option, index) => {
              if (option.isActive)
                return (
                  <a
                    key={index}
                    href="#"
                    className="bg-oe-primary text-oe-white block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    {option.text}
                  </a>
                );
              else
                return (
                  <a
                    key={index}
                    href="#"
                    onClick={() => handleSelect(option)}
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    {option.text}
                  </a>
                );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
