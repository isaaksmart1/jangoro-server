export default function DocsSidebar() {
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "getting-started", label: "Getting Started" },
    { id: "dashboard", label: "Dashboard Overview" },
    { id: "surveys", label: "Creating Surveys" },
    { id: "advanced", label: "Advanced Features" },
    { id: "analytics", label: "Analytics & Insights" },
    { id: "integrations", label: "Integrations" },
    { id: "settings", label: "Account Settings" },
    { id: "support", label: "Contact Support" },
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Table of Contents</h3>
          <nav className="space-y-2">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="block text-sm text-slate-600 hover:text-slate-900 py-1 text-left w-full"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
