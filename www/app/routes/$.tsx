import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle Chrome DevTools requests
    if (pathname.includes(".well-known") || pathname.includes("devtools")) {
        return json({ message: "Not Found" }, { status: 404 });
    }

    // Handle other unmatched routes
    return json({ message: "Page not found" }, { status: 404 });
};

export default function CatchAllRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-jgo-primary text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-jgo-accent mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-lg mb-8">
                    The page you're looking for doesn't exist.
                </p>
                <a
                    href="/"
                    className="inline-block bg-jgo-secondary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
