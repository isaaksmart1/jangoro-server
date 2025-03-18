import { LocalFireDepartment } from "@mui/icons-material";

import { GACTA, ROUTES } from "~/utils/utils";

const PricingTable = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-12 text-white">
        Choose Your Plan
      </h2>
      <div className="flex flex-row flex-wrap gap-8">
        {/* Monthly Plan */}
        <div className="border rounded-lg shadow-lg p-6 bg-white">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Monthly Plan
          </h3>
          <p className="text-center text-4xl font-bold mb-6">$15/mo</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>1 Day Free Trial</li>
            <li>Unlimited Access to All Features</li>
            <li>Priority Support</li>
            <li>Free Updates</li>
            <li>Analytics Dashboard</li>
            <li>Custom Integrations</li>
          </ul>
          <button
            className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            onClick={() => GACTA("Get Started $15/mo")}
          >
            <a href={`${ROUTES.register}?plan=month`}>Get Started</a>
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="border rounded-lg shadow-lg p-6 bg-white">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Yearly Plan
          </h3>
          <p className="text-center text-4xl font-bold mb-6">$99/yr</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>1 Day Free Trial</li>
            <li>Unlimited Access to All Features</li>
            <li>Priority Support</li>
            <li>Free Updates</li>
            <li>Analytics Dashboard</li>
            <li>Custom Integrations</li>
          </ul>
          <button
            className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            onClick={() => GACTA("Get Started $99/yr")}
          >
            <a href={`${ROUTES.register}?plan=year`}>Get Started</a>
          </button>
          {/* <p
            style={{
              fontStyle: "italic",
              fontSize: 12,
              maxWidth: 312,
              margin: 8,
            }}
          >
            * Selecting this plan will automatically put you on the $15/mo
            subscription. Once you have created an account, login and go to
            Billing &#8594; Manage Subscriptions to upgrade.
          </p> */}
        </div>

        {/* Lifetime Plan */}
        <div className="border rounded-lg shadow-lg p-6 bg-white">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Lifetime Plan
          </h3>
          <p className="text-center text-4xl font-bold mb-6">$49</p>
          <ul className="list-disc pl-5 space-y-3">
            <li style={{ listStyle: "none" }}>
              <span
                style={{ backgroundColor: "firebrick" }}
                className="text-white rounded-lg p-2 my-2"
              >
                Limited Supply
              </span>
            </li>
            <li>Unlimited Access to All Features</li>
            <li>Priority Support</li>
            <li>Free Updates</li>
            <li>Analytics Dashboard</li>
            <li>Save over 40% vs Yearly Plan</li>
          </ul>
          <button
            className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            onClick={() => GACTA("Purchase Lifetime Plan")}
          >
            <a href={`${ROUTES.register}?plan=life`}>Purchase</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
