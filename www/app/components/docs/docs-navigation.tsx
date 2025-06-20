interface DocsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function DocsNavigation({ activeSection, onSectionChange }: DocsNavigationProps) {
  const sections = [
    { id: "docs", label: "Documentation" },
    { id: "examples", label: "Examples" },
    { id: "api", label: "API Reference" },
    { id: "tutorials", label: "Tutorials" },
  ];

  return (
    <div className="bg-jgo-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 py-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`docs-tab text-white font-semibold px-3 py-2 rounded-md transition-colors ${
                activeSection === section.id ? "active" : ""
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
