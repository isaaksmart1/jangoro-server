export function LegalSnippet() {
  return (
    <div className="flex flex-col flex-wrap w-10/12 md:w-2/5 m-8 p-8 border-2 border-slate-400 rounded-xl">
      <h1 className="text-3xl">OpenEnded's Legal Page</h1>
      <Legal />
    </div>
  );
}

export default function Legal() {
  return (
    <div className="p-4 text-slate-900">
      <p className="text-md my-2">
        Welcome to OpenEnded's Legal Information Page. OpenEnded is your premier
        idea discovery platform, dedicated to helping innovators, creators, and
        visionaries bring their ideas to life. This page provides you with
        important legal information, including our terms of service, privacy
        policy, and other essential guidelines that govern your use of our
        platform.
      </p>

      <p className="text-md my-2">
        We are committed to maintaining transparency, protecting your rights,
        and ensuring a safe and productive environment for all our users. Please
        take a moment to review the information provided here to understand your
        rights and responsibilities while using OpenEnded. If you have any
        questions or need further assistance, our support team is here to help.
      </p>
    </div>
  );
}
