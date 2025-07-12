import { useEffect, useState } from "react";
import { prod, ROUTES } from "~/utils/utils";

const PricingTable = () => {
  const [supply, setSupply] = useState("");

  useEffect(() => {
    getRedeemCount();
  }, []);

  async function getRedeemCount() {
    const res = await fetch(`${prod.api}/redeem/total`);
    const totalCount = await res.json();
    const count = totalCount.totalCount;
    if (count > 100) setSupply("Limited Supply");
    else setSupply(`${count} codes left`);
  }

  function GACTA(eventName: string, label: string) {
    if (window.gtag) {
      window.gtag("event", eventName, {
        event_category: "button",
        event_label: label,
      });
    }
  }

  return (
    <div id="pricing" className="mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-12 text-white">
        Choose Your Plan
      </h2>
      <div className="flex flex-row flex-wrap gap-4">
        {/* Free Plan */}
        <div
          className="border rounded-lg shadow-lg p-6 bg-white"
          style={{ maxWidth: 360 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-4">
            Basic Plan
          </h3>
          <p className="text-center text-4xl font-bold mb-6">Free</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>Summarise</li>
            <li>Analytics Dashboard</li>
          </ul>
          <button
            className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            onClick={() => GACTA("click_free_version", "Free Version")}
          >
            <a href={`${ROUTES.free}`}>Enter</a>
          </button>
        </div>

        {/* Monthly Plan */}
        <div
          className="border rounded-lg shadow-lg p-6 bg-white"
          style={{ maxWidth: 360 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-4">
            Monthly Plan
          </h3>
          <p className="text-center text-4xl font-bold mb-6">$15/mo</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>14 Day Free Trial</li>
            <li>
              Summarise, Sentiment Analysis, Strategy Planner, Survey Builder
            </li>
            <li>Priority Support</li>
            <li>Free Updates</li>
            <li>Analytics Dashboard</li>
            <li>Custom Integrations</li>
          </ul>
          <button
            className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            onClick={() =>
              GACTA("click_monthly_purchase", "Get Started $15/mo")
            }
          >
            <a href={`${ROUTES.register}?plan=month`}>Get Started</a>
          </button>
        </div>

        {/* Yearly Plan */}
        <div
          className="border rounded-lg shadow-lg p-6 bg-white"
          style={{ maxWidth: 360 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-4">
            Yearly Plan
          </h3>
          <p className="text-center text-4xl font-bold mb-6">$99/yr</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>14 Day Free Trial</li>
            <li>
              Summarise, Sentiment Analysis, Strategy Planner, Survey Builder
            </li>
            <li>Priority Support</li>
            <li>Free Updates</li>
            <li>Analytics Dashboard</li>
            <li>Custom Integrations</li>
          </ul>
          <button
            className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            onClick={() => GACTA("click_yearly_purchase", "Get Started $99/yr")}
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
        <div
          className="border rounded-lg shadow-lg p-6 bg-white"
          style={{ maxWidth: 360 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-4">
            Lifetime Plan
          </h3>
          <p className="text-center text-4xl font-bold mb-6">$299</p>
          <ul className="list-disc pl-5 space-y-3">
            <li style={{ listStyle: "none" }}>
              <span
                style={{ backgroundColor: "firebrick" }}
                className="text-white rounded-lg p-2 my-2"
              >
                {supply.toString()}
              </span>
            </li>
            <li>
              Summarise, Sentiment Analysis, Strategy Planner, Survey Builder
            </li>
            <li>Priority Support</li>
            <li>Free Updates</li>
            <li>Analytics Dashboard</li>
            <li>Save over 40% vs Yearly Plan</li>
          </ul>
          <button
            className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
            onClick={() =>
              GACTA("click_lifetime_purchase", "Purchase Lifetime Plan")
            }
          >
            <a href={`${ROUTES.register}?plan=life`}>Purchase</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
