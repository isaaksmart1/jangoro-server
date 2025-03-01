import React from "react";
import { Link } from "react-router-dom";

const SupportForm = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#F3F4F6] p-6">
      <section className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8">
        {/* Form Title */}
        <div className="mt-4">
          <h1 className="text-3xl font-extrabold text-jgo-primary">
            Contact Jangoro Support
          </h1>
          <p className="text-gray-600 mt-2">
            Need help? Select a category below and we’ll assist you.
          </p>
        </div>

        {/* Category Selection */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Select a support category <span className="text-red-500">*</span>
          </h3>
        </div>

        {/* Options */}
        <div className="mt-4 space-y-4">
          {[
            {
              id: "bug",
              label: "🐞 Report a Bug",
              url: "https://jangoro.slack.com/lists/T08FNJG1SUB/F08FNMM8A4T",
            },
            {
              id: "feature",
              label: "🗳️ Feature Request",
              url: "https://jangoro.slack.com/lists/T08FNJG1SUB/F08FR2N42GL",
            },
            {
              id: "feedback",
              label: "💬 Share Feedback",
              url: "https://jangoro.slack.com/lists/T08FNJG1SUB/F08FL1SKZMK",
            },
            {
              id: "help",
              label: "🙋‍♂️ Get Help",
              url: "https://jangoro.slack.com/lists/T08FNJG1SUB/F08FNMP4LJX",
            },
          ].map((option) => (
            <Link
              key={option.id}
              to={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 border rounded-lg cursor-pointer transition border-gray-300 bg-[#EFF6FF] hover:bg-[#DBEAFE] shadow-sm"
            >
              <span className="ml-3 text-gray-900 font-medium">
                {option.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-gray-600 text-sm">
          Want to request features? Submit them{" "}
          <a
            href="https://jangoro.slack.com/lists/T08FNJG1SUB/F08FR2N42GL"
            target="_blank"
            rel="noreferrer"
            className="text-jgo-primary font-medium hover:underline"
          >
            here
          </a>
          .
        </div>
      </section>
    </main>
  );
};

export default SupportForm;
