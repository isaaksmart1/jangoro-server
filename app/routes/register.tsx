import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

import logo from "~/assets/img/logo.png";
import Dropdown from "~/components/dropdown";
import {
  createUser,
  createUserType,
  getUserByEmail,
} from "~/models/user.server";
import { createUserSession, getUserId } from "~/server/session.server";
import { ROUTES, safeRedirect, validateEmail } from "~/utils/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const acceptTerms = formData.get("acceptTerms");
  const securityAnswer = formData.get("securityAnswer");

  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!firstName || !lastName || !securityAnswer || !username) {
    return json(
      {
        errors: {
          firstName: "First name is invalid",
          lastName: "Last name is invalid",
          username: "Username is invalid",
          securityAnswer: "Security answer is invalid",
          password: null,
        },
      },
      { status: 400 },
    );
  }

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 },
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 },
    );
  }

  const newUser = {
    id: "",
    email,
    username,
    password,
    firstName,
    lastName,
    acceptTerms,
    securityAnswer,
    status: "inactive",
    dateJoined: new Date().toISOString(),
    // ...defaultUserFields,
  };

  const user = await createUser(createUserType(newUser), password);

  // TODO - create user on backend db

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const securityAnswerRef = useRef<HTMLInputElement>(null);
  const [securityQuestions, setSecurityQuestions] = useState([
    { text: "What is your mother's maiden name?", isActive: false },
    { text: "In what city were you born?", isActive: false },
    { text: "What is your favorite colour?", isActive: false },
    {
      text: "What is the name of your favorite childhood teacher?",
      isActive: false,
    },
    { text: "What is the name of the street you grew up on?", isActive: false },
    { text: "What is your favorite food?", isActive: false },
    { text: "What is the name of your favorite sports team?", isActive: false },
    {
      text: "What is the last name of your best friend in childhood",
      isActive: false,
    },
  ]);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col mt-8 md:justify-center">
      <div className="mx-auto w-full w-3/4 md:max-w-md p-8 mb-8 border-slate-300 border-2 rounded-2xl">
        <a href="/">
          <img src={logo} alt="OpenEnded" className="mx-auto mt-2 w-12" />
        </a>
        <h1 className="text-center text-2xl font-semibold text-oe-black mt-4 mb-2">
          Register
        </h1>
        <p className="text-center text-xl font-normal text-oe-black mb-4">
          your OpenEnded Account
        </p>
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-oe-primary"
            >
              First name
            </label>
            <div className="mt-1">
              <input
                id="firstName"
                ref={firstNameRef}
                name="firstName"
                type="firstName"
                aria-invalid={actionData?.errors?.firstName ? true : undefined}
                aria-describedby="firstName-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.firstName ? (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.firstName}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-oe-primary"
            >
              Last name
            </label>
            <div className="mt-1">
              <input
                id="lastName"
                ref={lastNameRef}
                name="lastName"
                type="lastName"
                aria-invalid={actionData?.errors?.lastName ? true : undefined}
                aria-describedby="lastName-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.lastName ? (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.lastName}
                </div>
              ) : null}
            </div>
          </div>

          <Dropdown
            title="Security question"
            options={securityQuestions}
            setOptions={setSecurityQuestions}
          />

          <div>
            <label
              htmlFor="securityAnswer"
              className="block text-sm font-semibold text-oe-primary"
            >
              Security answer
            </label>
            <div className="mt-1">
              <input
                id="securityAnswer"
                ref={securityAnswerRef}
                name="securityAnswer"
                type="securityAnswer"
                aria-invalid={
                  actionData?.errors?.securityAnswer ? true : undefined
                }
                aria-describedby="securityAnswer-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.securityAnswer ? (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.securityAnswer}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-oe-primary"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.email ? (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-oe-primary"
            >
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                ref={usernameRef}
                name="username"
                type="username"
                aria-invalid={actionData?.errors?.username ? true : undefined}
                aria-describedby="username-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.username ? (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.username}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-oe-primary"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password ? (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              ) : null}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-oe-primary px-4 py-2 text-oe-white hover:bg-green-800 focus:bg-oe-primary"
          >
            Create Account
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                className="text-oe-primary font-bold"
                to={{
                  pathname: ROUTES.login,
                  search: searchParams.toString(),
                }}
              >
                Log In
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
