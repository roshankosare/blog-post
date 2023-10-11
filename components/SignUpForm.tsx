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
  onSignUp: ({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) => Promise<void>;
}

const SignUpForm: React.FC<SignInFormProps> = ({ onSignUp }) => {
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().min(1, { message: "Required" }),
    password: z.string().min(1, { message: "Required" }),
    username: z.string().min(1, { message: "Required" }),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setSignUpError(null);
    onSignUp({
      email: values.email,
      password: values.password,
      username: values.username,
    })
      .then(() => {
        router.push("/");
      })
      .catch((error: Error) => {
        setSignUpError(error.message || "something went wrong try again");
      });
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold mx-auto mb-5">Sign Up</p>
      {signUpError && <ErrorBox className="my-2">{signUpError}</ErrorBox>}
      <Form {...form}>
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
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
            Sign Up
          </Button>
        </form>
      </Form>
      <div className="flex justify-between text-sm py-5">
        <p className=" flex items-center">Already a user?</p>
        <Link
          href={"/sign-in"}
          className={cn(buttonVariants({ variant: "link" }), "text-blue-800")}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
