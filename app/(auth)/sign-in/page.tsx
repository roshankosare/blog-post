"use client";

import SignInForm from "@/components/SignInForm";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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
const SignInPage= ({}) => {
  const session = useSession();
  if(session.status === "authenticated"){
    redirect("/");
  }
  return <SignInForm onSignIn={onSignIn} />;
};

export default SignInPage;
