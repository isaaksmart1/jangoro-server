import React from "react";
import { ROUTES } from "~/utils/utils";

const PricingTable = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-center mb-12 text-white">
        Choose Your Plan
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Monthly Plan */}
        <div className="border rounded-lg shadow-lg p-6 bg-white">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Monthly Plan
          </h3>
          <p className="text-center text-4xl font-bold mb-6">${15}/mo</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>1 Day Free Trial</li>
            <li>Unlimited Access to All Features</li>
            <li>Priority Support</li>
            <li>Free Updates</li>
            <li>Analytics Dashboard</li>
            <li>Custom Integrations</li>
          </ul>
          <button className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700">
            <a href={ROUTES.register}>Get Started</a>
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="border rounded-lg shadow-lg p-6 bg-white">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Yearly Plan
          </h3>
          <p className="text-center text-4xl font-bold mb-6">${99}/yr</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>1 Day Free Trial</li>
            <li>Unlimited Access to All Features</li>
            <li>Priority Support</li>
            <li>Free Updates</li>
            <li>Analytics Dashboard</li>
            <li>Custom Integrations</li>
          </ul>
          <button className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700">
            <a href={ROUTES.register}>Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
