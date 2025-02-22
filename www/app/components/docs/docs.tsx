export default function Docs() {
  return (
    <div className="p-4 text-slate-900">
      <h1 className="text-2xl font-bold my-4">Jangoro Help Documentation</h1>

      <h2 className="text-xl font-semibold mt-4">Introduction</h2>
      <p className="text-md my-2">
        Jangoro is a powerful survey and data insights tool designed to help you
        collect and analyze responses effortlessly. Whether you need market
        research, customer feedback, or internal evaluations, Jangoro provides
        an intuitive platform to create, distribute, and gain insights from
        surveys.
      </p>

      <h2 className="text-xl font-semibold mt-4">Getting Started</h2>
      <h3 className="text-lg font-semibold mt-2">Creating an Account</h3>
      <p className="text-md my-2">
        1. Visit{" "}
        <a href="https://app.jangoro.com" className="text-blue-500">
          app.jangoro.com
        </a>{" "}
        and click on <strong>Sign Up</strong>.<br />
        2. Enter your email, create a password, and complete your profile
        details.
        <br />
        3. Verify your email to activate your account.
      </p>

      <h3 className="text-lg font-semibold mt-2">Logging In</h3>
      <p className="text-md my-2">
        1. Go to{" "}
        <a href="https://app.jangoro.com/login" className="text-blue-500">
          app.jangoro.com/login
        </a>
        .<br />
        2. Enter your registered email and password.
        <br />
        3. Click <strong>Login</strong>.
      </p>

      <h3 className="text-lg font-semibold mt-2">Resetting Your Password</h3>
      <p className="text-md my-2">
        1. Click <strong>Forgot Password?</strong> on the login page.
        <br />
        2. Enter your email and submit the request.
        <br />
        3. Check your email for a reset link and follow the instructions.
      </p>

      <h2 className="text-xl font-semibold mt-4">Dashboard Overview</h2>
      <p className="text-md my-2">
        After logging in, you will be taken to your dashboard, where you can:
        <ul className="list-disc pl-5">
          <li>View Surveys and Reviews</li>
          <li>Check response analytics</li>
          <li>Create new surveys</li>
          <li>Analyze sentiment and summarize</li>
          <li>Access settings</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-4">Creating Surveys</h2>
      <h3 className="text-lg font-semibold mt-2">Uploading Surveys</h3>
      <p className="text-md my-2">
        Click the "Upload" button under AI actions and upload surveys and/or
        reviews. Can only upload <strong>.csv</strong> file types.
      </p>

      <h2 className="text-xl font-semibold mt-4">Analyzing Data & Insights</h2>
      <h3 className="text-lg font-semibold mt-2">Viewing Responses</h3>
      <p className="text-md my-2">
        Access real-time response data in the <strong>Responses</strong> tab,
        view individual responses, or analyze aggregated data.
      </p>

      <h2 className="text-xl font-semibold mt-4">Account Settings</h2>
      <h3 className="text-lg font-semibold mt-2">
        Deleting Account Information
      </h3>
      <p className="text-md my-2">
        Navigate to <strong>Settings &gt; Profile</strong> to delete your
        account and cancel your subscription.
      </p>

      <h3 className="text-lg font-semibold mt-2">Subscription Plans</h3>
      <p className="text-md my-2">
        View and upgrade your subscription under <strong>Billing</strong>.
        Manage payment methods and invoices.
      </p>

      <h2 className="text-xl font-semibold mt-4">Contact Support</h2>
      <p className="text-md my-2">
        If you need assistance, reach out to our support team:
        <ul className="list-disc pl-5">
          <li>
            <strong>Email:</strong>
            <a href="mailto:team.jangoro@gmail.com">team@jangoro.com</a>
          </li>
          <li>
            <strong>Live Chat:</strong> Available on our website
          </li>
          <li>
            <strong>Help Center:</strong>{" "}
            <a href="https://help.jangoro.com" className="text-blue-500">
              Visit Here
            </a>
          </li>
        </ul>
      </p>

      <p className="text-md my-2">We hope you enjoy using Jangoro! 🚀</p>
    </div>
  );
}
