import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

import { prod, ROUTES } from "~/utils/utils";

import { Button } from "../ui/button";

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

  function GACTA(eventName: string, label: string, url: string, type: string) {
    if (window.gtag) {
      window.gtag("event", eventName, {
        event_category: "button",
        event_label: label,
      });
    }
    if (typeof window.gtag_report_conversion === "function") {
      if (type === "free") window.gtag_report_conversion_free(url);
      else if (type === "monthly") window.gtag_report_conversion_month(url);
      else if (type === "yearly") window.gtag_report_conversion_year(url);
    } else {
      console.warn("gtag_report_conversion is not defined yet.");
    }
  }

  async function onCTA(type: string) {
    if (type === "free") {
      await GACTA(cta.free.action, cta.free.title, cta.free.link, type);
      window.location.href = cta.free.link;
    } else if (type === "monthly") {
      await GACTA(
        cta.monthly.action,
        cta.monthly.title,
        cta.monthly.link,
        type,
      );
      window.location.href = cta.monthly.link;
    } else if (type === "yearly") {
      await GACTA(cta.yearly.action, cta.yearly.title, cta.yearly.link, type);
      window.location.href = cta.yearly.link;
    } else if (type === "lifetime") {
      await GACTA(
        cta.lifetime.action,
        cta.lifetime.title,
        cta.lifetime.link,
        type,
      );
      window.location.href = cta.lifetime.link;
    }
  }

  const cta = {
    free: {
      title: "Free Version",
      action: "click_free_version",
      link: ROUTES.free,
    },
    monthly: {
      title: "Get Started $15/mo",
      action: "click_monthly_purchase",
      link: `${ROUTES.register}?plan=month`,
    },
    yearly: {
      title: "Get Started $99/yr",
      action: "click_yearly_purchase",
      link: `${ROUTES.register}?plan=year`,
    },
    lifetime: {
      title: "Purchase Lifetime Plan",
      action: "click_lifetime_purchase",
      link: `${ROUTES.register}?plan=life`,
    },
  };

  return (
    <section id="pricing" className="py-20 bg-jgo-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
            <p className="text-gray-600 mb-6">Perfect for getting started</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>AI Summarise</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>Charting</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-400">Community Support</span>
              </li>
            </ul>
            <Button
              className="w-full mt-6 py-2 bg-[#f5f5f4] text-black rounded-lg text-lg hover:bg-[#f1f1f1]"
              variant="secondary"
              onClick={() => onCTA("free")}
            >
              <a href={ROUTES.free}>Get Started</a>
            </Button>
          </div>

          {/* Monthly Plan */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-4 border-jgo-secondary relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-jgo-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Monthly
            </h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-gray-900">$15</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
            <p className="text-gray-600 mb-6">Ideal for regular users</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>Everything in basic</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>AI Sentiment Analysis</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>AI Strategy Analysis</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>AI Ask Me Anything</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>AI Survey Builder</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>Future Updates</span>
              </li>
            </ul>
            <Button
              className="w-full mt-6 py-2 bg-jgo-secondary text-white rounded-lg text-lg hover:bg-blue-700"
              onClick={() => onCTA("monthly")}
            >
              <a href={`${ROUTES.register}?plan=month`}>Start Free Trial</a>
            </Button>
          </div>

          {/* Yearly Plan */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Yearly</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-gray-900">$99</span>
              <span className="text-gray-600 ml-2">/year</span>
            </div>
            <p className="text-gray-600 mb-6">Best value for long-term use</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>Everything in monthly</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>Priority Support</span>
              </li>
            </ul>
            <Button
              className="w-full mt-6 py-2 bg-[#f5f5f4] text-black rounded-lg text-lg hover:bg-[#f1f1f1]"
              variant="secondary"
              onClick={() => onCTA("yearly")}
            >
              <a href={`${ROUTES.register}?plan=year`}>Start Free Trial</a>
            </Button>
          </div>

          {/* Lifetime Plan */}
          {/* <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Lifetime
            </h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-gray-900">$299</span>
              <span className="text-gray-600 ml-2">once</span>
            </div>
            <p className="text-gray-600 mb-6">One-time payment for life</p>
            <ul className="space-y-3 mb-8">
              <li className="text-sm text-white bg-red-500 inline-block rounded-full px-3 py-1 mb-2">
                {supply || "Loading..."}
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>All features unlocked</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>Priority Support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>Custom Integrations</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-success mr-3" />
                <span>Free Updates Forever</span>
              </li>
            </ul>
            <Button
              className="w-full mt-6 py-2 bg-[#f5f5f4] text-black rounded-lg text-lg hover:bg-[#f1f1f1]"
              onClick={() => onCTA("lifetime")}
            >
              <a href={`${ROUTES.register}?plan=life`}>Purchase</a>
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
