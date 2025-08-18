import type { MetaFunction } from "@remix-run/node";
import { useEffect, useMemo, useState } from "react";
import Header from "~/components/layout/header";
import Footer from "~/components/layout/footer";
import { URL } from "~/utils/utils";

export const meta: MetaFunction = () => [{ title: "Guides - Jangoro" }];

interface Guide {
    id: string;
    title: string;
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

const guides: Guide[] = [
    {
        id: "survey-mistakes-guide",
        title: "5 Common Survey Mistakes SMEs Make",
        description:
            "Learn the common pitfalls small businesses make when conducting and analysing surveys. Perfect for researchers, marketers, and business analysts.",
        coverImage: "/img/guide-mistakes-guide.jpg",
        downloadUrl: "/guides/survey-mistakes-guide.pdf",
        category: "Analytics",
    },
];

// Prefer env var if available; fall back to localhost for dev
const API_BASE = URL.api || "http://127.0.0.1:4000";

export default function GuidesPage() {
    const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<CaptureSuccess | CaptureError | null>(
        null
    );

    useEffect(() => {
        // Clear result when opening/closing modal
        if (selectedGuide) setResult(null);
    }, [selectedGuide]);

    const isValidEmail = useMemo(
        () => /\S+@\S+\.\S+/.test(email.trim()),
        [email]
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
                body: JSON.stringify({ email: email.trim(), guideId: selectedGuide.id }),
            });

            if (!response.ok) {
                const msg =
                    (await response.text()) || "Failed to capture email. Please try again.";
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
                    data.message || "Email captured successfully! Downloading your guide...",
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
        <div className="min-h-screen bg-slate-50">
            <Header user={null} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        Free E-Books & Guides
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Download our comprehensive guides and e-books to master survey analysis,
                        AI-powered insights, and data-driven decision making. Get expert
                        knowledge delivered straight to your inbox.
                    </p>
                </div>

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

                {/* Guides Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {guides.map((guide) => (
                        <div
                            key={guide.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            onClick={() => handleGuideSelect(guide)}
                        >
                            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <div className="text-6xl mb-2">📚</div>
                                    <div className="text-sm font-medium">{guide.category}</div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    {guide.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {guide.description}
                                </p>
                                <div className="mt-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        Free Download
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

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

                            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${email.length === 0
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
                                By downloading, you agree to receive our newsletter with tips and
                                updates. You can unsubscribe at any time.
                            </div>
                        </div>
                    </div>
                )}

                {/* Additional Info */}
                <div className="bg-white rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                        Why Download Our Guides?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-3xl mb-2">🎯</div>
                            <h3 className="font-medium text-slate-900 mb-2">Expert Knowledge</h3>
                            <p className="text-slate-600 text-sm">
                                Written by industry experts with years of experience in data analysis
                            </p>
                        </div>
                        <div>
                            <div className="text-3xl mb-2">💡</div>
                            <h3 className="font-medium text-slate-900 mb-2">Actionable Insights</h3>
                            <p className="text-slate-600 text-sm">
                                Practical tips and strategies you can implement immediately
                            </p>
                        </div>
                        <div>
                            <div className="text-3xl mb-2">🚀</div>
                            <h3 className="font-medium text-slate-900 mb-2">Stay Updated</h3>
                            <p className="text-slate-600 text-sm">
                                Get notified about new guides and industry best practices
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
