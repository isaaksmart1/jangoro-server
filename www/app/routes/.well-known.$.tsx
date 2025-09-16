import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle Chrome DevTools specific requests
    if (pathname.includes("com.chrome.devtools.json")) {
        // Return empty JSON for Chrome DevTools
        return json({}, { status: 200 });
    }

    // Handle other .well-known requests
    return json({ message: "Not Found" }, { status: 404 });
};
