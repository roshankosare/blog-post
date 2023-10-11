"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { useState } from "react";
import ErrorBox from "./ErrorBox";
import { useRouter } from "next/navigation";


interface SignInFormProps {
  onSignIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSignIn }) => {
  const [signInError, setSignInError] = useState<string | null>(null);
  const router = useRouter();
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Required" })
      .email("enter correct email"),
    password: z.string().min(1, { message: "Required" }),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSignInError(null);
    onSignIn({ email: values.email, password: values.password })
      .then(() => {
       router.push("/");
      })
      .catch((error: Error) => {
        console.log(error);
        setSignInError(error.message || "something went wrong try again");
      });
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold mx-auto mb-5">Sign In</p>
      <Form {...form}>
        {signInError && <ErrorBox className="my-2">{signInError}</ErrorBox>}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </form>
      </Form>
      <div className="flex justify-between text-sm py-5">
        <p className=" flex items-center">New User?</p>
        <Link
          href={"/sign-up"}
          className={cn(buttonVariants({ variant: "link" }), "text-blue-800")}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
