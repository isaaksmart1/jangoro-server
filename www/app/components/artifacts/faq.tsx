import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What is Jangoro?",
    answer:
      "Jangoro is a survey and data insights platform designed to help businesses and startups conduct market research, gather customer feedback, and analyze trends effectively.",
  },
  {
    question: "What is a CSV?",
    answer:
      "CSV or Comma-Separated Value is a data format designed to structure data and its values separated by a common delimiter, for example ',' or '|'. Jangoro expects your customer surveys to be in this format before processing.",
  },
  {
    question: "How can I sign up?",
    answer:
      "You can sign up for Jangoro by visiting our website, viewing the pricing section and choosing a plan. A free trial is available for new users.",
  },
  {
    question: "Is Jangoro free to use?",
    answer:
      "No, Jangoro pricing starts $15/mo which includes all of the advanced analytics and custom surveys.",
  },
  {
    question: "How does Jangoro help my business?",
    answer:
      "Jangoro provides actionable insights from your surveys, helping you understand your customers better, refine your products, and make data-driven decisions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 bg-white hover:bg-gray-100 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-gray-900">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden px-6 bg-gray-50"
            >
              <p className="py-4 text-gray-700">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
