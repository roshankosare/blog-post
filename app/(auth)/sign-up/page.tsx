"use client";

import SignUpForm from "@/components/SignUpForm";
import axios, { AxiosError } from "axios";
import { error } from "console";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface pageProps {}
const onSignUp = async ({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  try {
    await axios.post(
      "api/auth/sign-up",
      {
        email,
        password,
        username,
      },
      {
        withCredentials: true,
      }
    );

    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        const errorMessage = error.response?.data.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
      }
      if (error.response?.status === 500) {
        throw new Error("Something went wrong try again");
      }
    }
  }
};
const SignUpPage: React.FC<pageProps> = ({}) => {
  const session = useSession();
  if (session.status === "authenticated") {
    redirect("/");
  }
  return <SignUpForm onSignUp={onSignUp} />;
};

export default SignUpPage;
