import type { MetaFunction } from "@remix-run/node";

import Footer from "~/components/footer";
import Header from "~/components/header";

export const meta: MetaFunction = () => [{ title: "Roadmap" }];

const RoadmapPage = () => {
  return (
    <div className="bg-oe-white text-oe-primary min-h-screen">
      <Header />
      <div className="flex min-h-full flex-col p-4">
        <h1 className="text-3xl text-oe-primary text-center font-semibold mb-8">
          Application Release Schedule
        </h1>
        {/* Roadmap Table */}
        <main className="relative min-h-screen flex flex-col justify-center bg-oe-white overflow-hidden">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-2">
            <div className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-4 md:-mx-6 text-sm">
              <section className="md:contents [&>div:first-child]:pt-10 [&>div:last-child]:pb-10 max-md:hidden">
                <div className="relative bg-oe-white px-6 flex flex-col justify-end">
                  <div className="pb-5 md:">
                    <div className="max-md:text-center">
                      <div className="inline-flex items-center whitespace-nowrap">
                        <div className="text-sm text-oe-white mr-2 md:max-lg:sr-only">
                          Feature
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-oe-white  px-6 flex flex-col justify-end  md:order-1"
                  aria-hidden="true"
                >
                  <div className="py-2 font-semibold text-slate-900 text-xl font-medium mt-4">
                    Discover
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-2"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Search for ideas
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-3"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Scroll through ideas
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-4"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Filter ideas
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-5"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Categorise ideas
                  </div>
                </div>
                <div
                  className="bg-oe-white  px-6 flex flex-col justify-end  md:order-6"
                  aria-hidden="true"
                >
                  <div className="py-2 font-semibold text-slate-900 text-xl font-medium mt-4">
                    View
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-7"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">Like</div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-8"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">Comment</div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-9"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">Share</div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-10"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">Report</div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-11"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Collaborate
                  </div>
                </div>
                <div
                  className="bg-oe-white  px-6 flex flex-col justify-end  md:order-12"
                  aria-hidden="true"
                >
                  <div className="py-2 font-semibold text-slate-900 text-xl font-medium mt-4">
                    Profile
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[13]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">Subscribe</div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[14]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Scroll through ideas
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[15]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Edit ideas
                  </div>
                </div>
                <div
                  className="bg-oe-white  px-6 flex flex-col justify-end  md:order-[16]"
                  aria-hidden="true"
                >
                  <div className="py-2 font-semibold text-slate-900 text-xl font-medium mt-4">
                    Idea Hub
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[17]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">Post idea</div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[18]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Collaborations
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[19]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Doc to Idea
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[20]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Idea Dictionary
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[21]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Strategy Agents
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[22]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">Idea Lens</div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[23]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Live Storm
                  </div>
                </div>
                <div
                  className="bg-oe-white  px-6 flex flex-col justify-end  md:order-[24]"
                  aria-hidden="true"
                >
                  <div className="py-2 font-semibold text-slate-900 text-xl font-medium mt-4">
                    Settings
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[25]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">Tutorial</div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[26]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Profile Settings
                  </div>
                </div>
                <div
                  className="bg-oe-white px-6 flex flex-col justify-end  md:order-[27]"
                  aria-hidden="true"
                >
                  <div className="py-2 text-oe-primary text-lg ">
                    Terms and Privacy Policy
                  </div>
                </div>
              </section>

              <section className="md:contents [&>div:first-child]:pt-10 [&>div:last-child]:pb-10">
                <div className="relative bg-oe-white px-6 flex flex-col justify-end max-md:block">
                  <div className="grow mb-5">
                    <div className="font-semibold text-slate-900 text-xl mb-0.5">
                      Alpha Launch: v0.1
                    </div>
                    <div className="mb-1">
                      <span className="text-sm text-slate-500 text-lg">
                        Target date
                      </span>
                    </div>
                    <span className="text-3xl font-bold text-slate-900 text-xl">
                      1st June 2024
                    </span>
                  </div>
                  <div className="pb-4 ">
                    <a
                      className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-2.5 py-1.5 text-sm font-medium text-oe-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group"
                      href="#0"
                    >
                      Closed Invitation
                    </a>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-1">
                  <div className="py-2 font-semibold text-slate-900 text-xl text-xl font-medium mt-4 md:sr-only"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-2">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-3">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-4">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-5">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-6">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-7">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-8">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-9">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-10">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-11">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-12">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[13]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[14]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[15]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[16]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[17]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[18]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[19]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[20]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[21]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[22]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[23]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[24]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[25]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[26]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[27]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
              </section>

              <section className="md:contents [&>div:first-child]:pt-10 [&>div:last-child]:pb-10">
                <div className="relative bg-oe-white px-6 flex flex-col justify-end max-md:block">
                  <div className="absolute top-2 mx-auto mr-6 -mt-4">
                    <div className="inline-flex items-center text-sm font-semibold py-1.5 px-3 bg-emerald-500 text-oe-white rounded-full shadow-sm shadow-slate-950/5">
                      Live
                    </div>
                  </div>
                  <div className="grow mb-5">
                    <div className="font-semibold text-slate-900 text-xl mb-0.5">
                      Beta Launch: v1.0
                    </div>
                    <div className="mb-1">
                      <span className="text-sm text-slate-500 text-lg">
                        Target date
                      </span>
                    </div>
                    <span className="text-3xl font-bold text-slate-900 text-xl">
                      1st October 2024
                    </span>
                  </div>
                  <div className="pb-4 ">
                    <a
                      className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-2.5 py-1.5 text-sm font-medium text-oe-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group"
                      href="#0"
                    >
                      Open Invitation
                    </a>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-1">
                  <div className="py-2 font-semibold text-slate-900 text-xl text-xl font-medium mt-4 md:sr-only"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-2">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-3">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-4">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-5">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-6">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-7">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-8">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-9">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-10">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-11">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-12">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[13]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[14]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[15]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[16]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[17]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[18]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[19]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[20]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[21]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[22]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[23]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[24]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[25]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[26]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[27]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
              </section>

              <section className="md:contents [&>div:first-child]:pt-10 [&>div:last-child]:pb-10">
                <div className="relative bg-oe-white px-6 flex flex-col justify-end max-md:block">
                  <div className="grow mb-5">
                    <div className="font-semibold text-slate-900 text-xl mb-0.5">
                      Official Launch: v3.0
                    </div>
                    <div className="mb-1">
                      <span className="text-sm text-slate-500 text-lg">
                        Target date
                      </span>
                    </div>
                    <span className="text-3xl font-bold text-slate-900 text-xl">
                      14th February 2025
                    </span>
                  </div>
                  <div className="pb-4 ">
                    <a
                      className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-2.5 py-1.5 text-sm font-medium text-oe-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group"
                      href="#0"
                    >
                      Download
                    </a>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-1">
                  <div className="py-2 font-semibold text-slate-900 text-xl text-xl font-medium mt-4 md:sr-only"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-2">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-3">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-4">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-5">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-6">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-7">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-8">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-9">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-10">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-11">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-12">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[13]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[14]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[15]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[16]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[17]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[18]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[19]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[20]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[21]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[22]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[23]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[24]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg"></div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[25]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[26]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="bg-oe-white px-6 flex flex-col justify-end max-md:hidden md:order-[27]">
                  <div className="flex items-center h-full  py-2 text-oe-primary text-lg">
                    <svg
                      className="shrink-0 fill-emerald-500 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9"
                    >
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RoadmapPage;
