"use client";

import SignInForm from "@/components/SignInForm";

import { signIn } from "next-auth/react";

interface pageProps {}

const onSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await signIn("credentials", {
    redirect: false,
    email: email,
    password: password,
  });
  console.log(response);
  if (response?.error) {
    throw new Error(response.error);
  }
};
const SignInPage = ({}) => {
  return <SignInForm onSignIn={onSignIn} />;
};

export default SignInPage;
