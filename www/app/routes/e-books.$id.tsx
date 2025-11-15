// app/routes/e-books.$id.tsx
import React, { useEffect, useMemo, useState } from "react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import mistakes from "../assets/img/guides/survey-mistakes-guide.png";
import fortune from "../assets/img/guides/feedback-fortune-guide.png";
import { URL } from "~/utils/utils";
import Footer from "~/components/layout/footer";

const API_BASE = URL.api || "http://127.0.0.1:4000";

interface Guide {
  id: string;
  title: string;
  points: string[];
  description: string;
  coverImage: string;
  downloadUrl: string;
  category: string;
}

type CaptureSuccess = {
  success: true;
  message: string;
  downloadUrl: string;
  guideTitle: string;
};

type CaptureError = {
  success: false;
  error: string;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  // Fetch ebook content, metadata, etc.
  // Replace this with your real DB/API call
  const ebooks: Guide[] = [
    {
      id: "survey-mistakes-guide",
      title: "5 Common Survey Mistakes SMEs Make",
      coverImage: mistakes,
      points: [
        "Jangoro Automation Blueprint ($197 Value)",
        "Mistakes Conducting Surveys ($297 Value)",
        "Mistakes Analysing Surveys ($147 Value)",
        "Common Pitfalls ($97 Value)",
        "Includes Free Jangoro Software Trial",
      ],
      downloadUrl: "/guides/survey-mistakes-guide.pdf",
      category: "Analytics",
      description:
        "Learn the common pitfalls small businesses make when conducting and analysing surveys. Perfect for researchers, marketers, and business analysts.",
    },
    {
      id: "feedback-fortune-guide",
      title: "The SME Customer Feedback Playbook",
      points: [
        "Jangoro Automation Blueprint ($197 Value)",
        "Turning Customer feedback into growth ($159 Value)",
        "Actionable Tactics for Customer Feedback($247 Value)",
        "Includes Free Jangoro Software Trial",
      ],
      coverImage: fortune,
      downloadUrl: "/guides/feedback-fortune-guide.pdf",
      category: "Analytics",
      description:
        "This short guide (6–8 pages) would give SMEs a step-by-step system for turning customer feedback into business growth. It highlights actionable tactics while naturally leading into Jangoro as the tool that makes this process effortless.",
    },
  ];

  return json({ ebooks, id });
};

export default function EbookPage() {
  const { ebooks, id } = useLoaderData<typeof loader>();

  const book = ebooks.find((ebook) => ebook.id === id);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<CaptureSuccess | CaptureError | null>(
    null,
  );

  useEffect(() => {
    // Clear result when opening/closing modal
    if (selectedGuide) setResult(null);
  }, [selectedGuide]);

  const isValidEmail = useMemo(
    () => /\S+@\S+\.\S+/.test(email.trim()),
    [email],
  );

  const handleGuideSelect = (guide: Guide) => {
    setSelectedGuide(guide);
    setEmail("");
  };

  const triggerDownload = (url: string) => {
    // Programmatic download to honor CORS/content-disposition
    const a = document.createElement("a");
    a.href = url;
    a.download = ""; // let server/content-disposition decide filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuide || !isValidEmail) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/api/capture-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          guideId: selectedGuide.id,
        }),
      });

      if (!response.ok) {
        const msg =
          (await response.text()) ||
          "Failed to capture email. Please try again.";
        setResult({ success: false, error: msg });
        setIsSubmitting(false);
        return;
      }

      const data = (await response.json()) as {
        downloadUrl?: string;
        guideTitle?: string;
        message?: string;
      };

      if (!data.downloadUrl) {
        setResult({
          success: false,
          error:
            "Email captured, but no download URL was returned. Please contact support.",
        });
        setIsSubmitting(false);
        return;
      }

      setResult({
        success: true,
        message:
          data.message ||
          "Email captured successfully! Downloading your guide...",
        downloadUrl: data.downloadUrl,
        guideTitle: data.guideTitle || selectedGuide.title,
      });

      // Reset UI & trigger download
      setEmail("");
      setSelectedGuide(null);
      setIsSubmitting(false);
      triggerDownload(data.downloadUrl);
    } catch (err) {
      console.error("Error capturing email:", err);
      setResult({
        success: false,
        error: "Failed to capture email. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="bg-jgo-primary text-white min-h-screen py-12 px-4 flex justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT SECTION (Benefits + Mockup) */}
          <div>
            <h1 className="text-4xl font-bold mb-6">
              Download Your Free Jangoro eBook
            </h1>

            <p className="text-lg mb-6">{book?.description}</p>

            <img
              src={book?.coverImage}
              alt="Jangoro eBook"
              style={{ maxHeight: 400 }}
              className="rounded-xl shadow-xl mb-8"
            />

            <ul className="space-y-3 text-lg">
              {book?.points.map((point, index) => (
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✔</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT SECTION (Form + CTA) */}
          <div className="bg-white rounded-xl shadow-xl border p-8 h-fit">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-4 mb-4"
              onClick={() => handleGuideSelect(book as any)}
            >
              <h2 className="font-bold">Get Instant Access to the eBook</h2>
            </button>

            <p className="text-lg text-slate-600 my-4">
              Get exclusive news and updates by subscribing to our email list.
              Don't miss out on important information & perks as you come with
              us on this journey.
            </p>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4"
              onClick={() => window.location.href = "/mailing"}
            >
              <h2 className="font-bold">Subscribe</h2>
            </button>

            {/* Success/Error Messages */}
            {result && result.success && (
              <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 mb-3">{result.message}</p>
                {result.downloadUrl && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">
                      Guide: {result.guideTitle}
                    </span>
                    <a
                      href={result.downloadUrl}
                      download
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                )}
              </div>
            )}

            {result && !result.success && (
              <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{result.error}</p>
              </div>
            )}

            {/* Email Capture Modal */}
            {selectedGuide && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl max-w-md w-full p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🎉</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      Get Your Free Guide Instantly
                    </h3>
                    <p className="text-slate-600">
                      Enter your email to get "{selectedGuide.title}" instantly
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                          email.length === 0
                            ? "border-slate-300 focus:ring-blue-500"
                            : isValidEmail
                            ? "border-green-300 focus:ring-green-500"
                            : "border-red-300 focus:ring-red-500"
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={isSubmitting || !isValidEmail}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Processing..." : "Get Guide"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedGuide(null)}
                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                  <div className="mt-4 text-xs text-slate-500 text-center">
                    By downloading, you agree to receive our newsletter with
                    tips and updates. You can unsubscribe at any time.
                  </div>
                </div>
              </div>
            )}

            {/* Additional CTA Section */}
            <div className="mt-6 p-6 bg-gray-100 rounded-lg border">
              <h3 className="text-xl text-jgo-primary font-bold mb-2">
                Ready to Go Further?
              </h3>
              <p className="text-gray-600 mb-4">
                Unlock the full Jangoro data analytics suite and start analysing
                customer feedback, survey data, and product reviews faster than
                ever.
              </p>
              <a
                href="https://app.jangoro.com/register?plan=month"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold"
              >
                Start Your Jangoro Free Trial & Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
