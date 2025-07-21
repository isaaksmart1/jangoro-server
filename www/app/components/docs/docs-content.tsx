import {
  Info,
  PlayCircle,
  LayoutDashboard,
  Settings,
  HelpCircle,
  BarChart3,
  FileText,
  Users,
  Table,
  Database,
  Webhook,
  Cloud,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function DocsContent() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Jangoro Help Documentation
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Everything you need to know to get started with Jangoro's powerful
          survey and analytics platform.
        </p>

        {/* Introduction */}
        <section id="introduction" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2 text-blue-500" />
            Introduction
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 mb-4">
              Jangoro is a powerful survey and data insights tool designed to
              help you collect and analyze responses effortlessly. Whether you
              need market research, customer feedback, or internal evaluations,
              Jangoro provides an intuitive platform to create, distribute, and
              gain insights from surveys.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Key Features</h4>
              <ul className="list-disc list-inside text-blue-800 space-y-1">
                <li>AI-powered survey analysis and sentiment detection</li>
                <li>Real-time response tracking and analytics</li>
                <li>Automated report generation and insights</li>
                <li>Multi-format data import (CSV, JSON, XML)</li>
                <li>Advanced visualization and dashboard tools</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section id="getting-started" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <PlayCircle className="w-6 h-6 mr-2 text-green-500" />
            Getting Started
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                🚀 Quick Start
              </h3>
              <ol className="list-decimal list-inside text-slate-700 space-y-2">
                <li>Create your account</li>
                <li>Upload your first dataset</li>
                <li>Run automated analysis</li>
                <li>View insights dashboard</li>
              </ol>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                ⏱️ Time to Value
              </h3>
              <ul className="text-slate-700 space-y-2">
                <li>
                  <span className="font-medium">5 minutes:</span> Account setup
                </li>
                <li>
                  <span className="font-medium">10 minutes:</span> First
                  analysis
                </li>
                <li>
                  <span className="font-medium">30 minutes:</span> Full
                  dashboard
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Creating an Account
          </h3>
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <ol className="list-decimal list-inside text-slate-700 space-y-3">
              <li>
                Visit{" "}
                <a
                  href="https://app.jangoro.com/login"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  app.jangoro.com
                </a>{" "}
                and click on <strong>Sign Up</strong>
              </li>
              <li>
                Enter your email, create a secure password, and complete your
                profile details
              </li>
              <li>Verify your email to activate your account</li>
              <li>
                Complete the onboarding tour to familiarize yourself with the
                interface
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Logging In
          </h3>
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <ol className="list-decimal list-inside text-slate-700 space-y-3">
              <li>
                Go to{" "}
                <a
                  href="https://app.jangoro.com/login"
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  app.jangoro.com/login
                </a>
              </li>
              <li>Enter your registered email and password</li>
              <li>
                Click <strong>Login</strong> or use single sign-on options
              </li>
              <li>Enable two-factor authentication for enhanced security</li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Resetting Your Password
          </h3>
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <ol className="list-decimal list-inside text-slate-700 space-y-3">
              <li>
                Click <strong>Forgot Password?</strong> on the login page
              </li>
              <li>
                Alternatively you can send a password reset request to
                team.jangoro@gmail.com
              </li>
              <li>
                Check your email for a reset link and follow the instructions
              </li>
            </ol>
          </div>
        </section>

        {/* Dashboard Overview */}
        <section id="dashboard" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <LayoutDashboard className="w-6 h-6 mr-2 text-purple-500" />
            Dashboard Overview
          </h2>
          <p className="text-slate-700 mb-6">
            After logging in, you'll be taken to your comprehensive dashboard
            with these key sections:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="font-semibold text-blue-900">Analytics Hub</h3>
              </div>
              <p className="text-blue-800 text-sm">
                Real-time response tracking, sentiment analysis, and automated
                insights generation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <FileText className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="font-semibold text-green-900">Survey Manager</h3>
              </div>
              <p className="text-green-800 text-sm">
                Create, edit, and manage your surveys with AI-powered question
                suggestions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Users className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="font-semibold text-purple-900">
                  Response Center
                </h3>
              </div>
              <p className="text-purple-800 text-sm">
                Monitor responses, manage participants, and track completion
                rates.
              </p>
            </div>
          </div>

          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            <li>View Surveys and Reviews</li>
            <li>Check response analytics</li>
            <li>Create new surveys</li>
            <li>Analyze sentiment and summarise</li>
            <li>Access settings</li>
          </ul>
        </section>

        {/* Creating Surveys */}
        <section id="surveys" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Creating Surveys
          </h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Uploading Surveys
          </h3>
          <p className="text-slate-700 mb-4">
            Click the "Upload" button under AI actions and upload surveys and/or
            reviews. Can only upload <strong>.csv</strong> file types.
          </p>
        </section>

        {/* Advanced Features */}
        <section id="advanced" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-orange-500" />
            Advanced Features
          </h2>

          <div className="space-y-8">
            <div className="border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                AI-Powered Analysis
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">
                    Sentiment Detection
                  </h4>
                  <p className="text-slate-700 text-sm mb-3">
                    Automatically analyze emotional tone and sentiment across
                    all responses.
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded p-3">
                    <code className="text-sm text-slate-700">
                      sentiment_score: 0.85 (Positive)
                    </code>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">
                    Topic Clustering
                  </h4>
                  <p className="text-slate-700 text-sm mb-3">
                    Group similar responses and identify key themes
                    automatically.
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded p-3">
                    <code className="text-sm text-slate-700">
                      themes: ["pricing", "features", "support"]
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Data Integration
              </h3>
              <p className="text-slate-700 mb-4">
                Connect Jangoro with your existing tools and workflows:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 border border-slate-200 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded mx-auto mb-2 flex items-center justify-center">
                    <Table className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">CSV Import</span>
                </div>
                {/* <div className="text-center p-3 border border-slate-200 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded mx-auto mb-2 flex items-center justify-center">
                    <Database className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">SQL Connect</span>
                </div>
                <div className="text-center p-3 border border-slate-200 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded mx-auto mb-2 flex items-center justify-center">
                    <Webhook className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">API Access</span>
                </div>
                <div className="text-center p-3 border border-slate-200 rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded mx-auto mb-2 flex items-center justify-center">
                    <Cloud className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium">Cloud Sync</span>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Analytics & Insights */}
        <section id="analytics" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Analyzing Data & Insights
          </h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Viewing Responses
          </h3>
          <p className="text-slate-700 mb-4">
            Access real-time response data in the <strong>Responses</strong>{" "}
            tab, view individual responses, or analyze aggregated data.
          </p>
        </section>

        {/* Account Settings */}
        <section id="settings" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Account Settings
          </h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Deleting Account Information
          </h3>
          <p className="text-slate-700 mb-4">
            Navigate to <strong>Settings &gt; Profile</strong> to delete your
            account and cancel your subscription.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Subscription Plans
          </h3>
          <p className="text-slate-700 mb-4">
            View and upgrade your subscription under <strong>Billing</strong>.
            Manage payment methods and invoices.
          </p>
        </section>

        {/* Contact Support */}
        <section id="support" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <HelpCircle className="w-6 h-6 mr-2 text-red-500" />
            Contact Support
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Get Help</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-slate-500 mr-3" />
                  <div>
                    <p className="font-medium text-slate-900">Email Support</p>
                    <a
                      href="mailto:team.jangoro@gmail.com"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      team.jangoro@gmail.com
                    </a>
                  </div>
                </div>
                {/* <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-slate-500 mr-3" />
                  <div>
                    <p className="font-medium text-slate-900">Live Chat</p>
                    <p className="text-slate-600 text-sm">Available 9 AM - 6 PM EST</p>
                  </div>
                </div> */}
              </div>
            </div>
            {/* <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-6"> */}
            {/* <h3 className="font-semibold text-slate-900 mb-4">Response Times</h3> */}
            {/* <div className="space-y-3"> */}
            {/* <div className="flex justify-between">
              <span className="text-slate-700">Critical Issues</span>
              <span className="font-medium text-green-600">&lt; 2 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">General Questions</span>
              <span className="font-medium text-blue-600">&lt; 24 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Feature Requests</span>
              <span className="font-medium text-purple-600">&lt; 3 days</span>
            </div> */}
            {/* </div> */}
            {/* </div> */}
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-lg text-slate-900 mb-2">
              We hope you enjoy using Jangoro! 🚀
            </p>
            <p className="text-slate-600">
              Join thousands of teams already using Jangoro to make data-driven
              decisions.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
