import React, { useState } from "react";
import { URL } from "~/utils/utils";

/**
 * EmailCaptureForm
 * A single-file React component (Tailwind CSS) for capturing email addresses.
 * - Default export
 * - Accessible: aria attributes, focus outlines
 * - Basic client-side validation
 * - Honeypot field to reduce simple spam
 * - Loading / success / error states
 * - Props: endpoint (POST url), placeholder, showName (boolean)
 *
 * Usage:
 * <EmailCaptureForm endpoint="/api/subscribe" showName />
 *
 * Drop this file into your React app and ensure Tailwind is configured.
 */

export default function EmailCaptureForm({
  endpoint = "api/subscribe/mailing-list",
  placeholder = "Enter your email",
  showName = false,
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Honeypot field value (invisible to humans)
  const [hp, setHp] = useState("");

  // Simple email regex (reasonable but not perfect)
  const emailIsValid = (v: any) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (hp) {
      // honeypot filled -> likely bot
      setError("Spam detected" as any);
      return;
    }

    if (!emailIsValid(email)) {
      setError("Please enter a valid email address." as any);
      return;
    }

    setLoading(true);
    try {
      const payload = { email } as any;
      if (showName && name) payload.name = name;

      const res = await fetch(`${URL.api}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      setSuccess(true);
      setEmail("");
      setName("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full items-center justify-center bg-jgo-primary">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md grid gap-4"
        aria-live="polite"
      >
        <div>
          <h3 className="text-lg font-semibold">Join our email list</h3>
          <p className="text-sm text-gray-500">
            No spam — unsubscribe anytime.
          </p>
        </div>

        {showName && (
          <label className="sr-only" htmlFor="ec-name">
            Name
          </label>
        )}

        {showName && (
          <input
            id="ec-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1"
            aria-label="Your name (optional)"
          />
        )}

        <label className="sr-only" htmlFor="ec-email">
          Email address
        </label>
        <input
          id="ec-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-1"
          aria-invalid={!emailIsValid(email) && email.length > 0}
          aria-describedby="ec-helper ec-error"
          autoComplete="email"
        />

        {/* Honeypot - hidden from users but visible to bots */}
        <div
          style={{ position: "absolute", left: "-10000px", top: "-10000px" }}
          aria-hidden="true"
        >
          <label htmlFor="ec-hp">Leave this field blank</label>
          <input
            id="ec-hp"
            name="hp"
            type="text"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-2xl font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : null}
            {loading ? "Subscribing..." : "Join"}
          </button>

          <button
            type="button"
            onClick={() => {
              setEmail("");
              setName("");
              setError(null);
              setSuccess(false);
            }}
            className="px-4 py-2 border rounded-2xl bg-white"
          >
            Reset
          </button>
        </div>

        <div id="ec-helper" className="text-sm text-gray-500">
          We use your email only for occasional updates.
        </div>

        <div id="ec-error" className="min-h-[1.25rem]">
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>

        {success && (
          <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-green-800 text-sm">
            Thanks — you're on the list! You will receive our welcome emails shortly.
          </div>
        )}

        <small className="text-xs text-gray-400">
          By subscribing you agree to our terms and privacy policy.
        </small>
      </form>
    </div>
  );
}
