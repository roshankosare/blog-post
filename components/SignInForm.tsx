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

interface SignInFormProps {}

const SignInForm: React.FC<SignInFormProps> = ({}) => {
  const formSchema = z.object({
    email: z.string().min(1,{message:"Required"}),
    password: z.string().min(1,{message:"Required"}),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormLabel  className="text-gray-600">Password</FormLabel>
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
      <Link href={"/sign-up"} className={cn(buttonVariants({variant:"link"}),"text-blue-800")}>Sign Up</Link>
    </div>
    </div>
  );
};

export default SignInForm;
