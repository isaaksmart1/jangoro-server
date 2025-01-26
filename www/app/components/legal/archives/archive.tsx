import { default as PP01212024 } from "./privacyPolicy/01212024";
import { default as PP01252024 } from "./privacyPolicy/01252024";
import { default as TC01212024 } from "./terms/01212024";
import { default as TC01252024 } from "./terms/01252024";

export const PrivacyPolicies = {
  "21/01/2024": () => <PP01212024 />,
  "25/01/2024": () => <PP01252024 />,
};

export const TermsPolicies = {
  "21/01/2024": () => <TC01212024 />,
  "25/01/2024": () => <TC01252024 />,
};

export const CookiePolicies = {};

export const AdPolicies = {};
