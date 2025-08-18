import { ROUTES } from "~/utils/utils";

export const Guides = () => {
    return (
        <div className="p-4">
            <div className="flow-root">
                <div className="-my-2 divide-y divide-gray-500/10">
                    <div className="py-2">
                        <a
                            href={ROUTES.guides}
                            className="group relative -m-2 flex items-center p-2 text-sm leading-6 font-semibold text-slate-900 hover:text-blue-600"
                        >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <span className="text-xl">📚</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-semibold text-slate-900">
                                    Free E-Books & Guides
                                </p>
                                <p className="text-xs text-slate-600">
                                    Download comprehensive guides on survey analysis, AI insights, and more
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
