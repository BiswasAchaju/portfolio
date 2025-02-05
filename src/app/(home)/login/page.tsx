"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const formSchema = z.object({
  email: z.string().min(1, "Required").email("Not a valid email"),

  password: z.string().min(1, "Required"),
});

function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        toast.error(res.error || "Login failed. Please try again.");
      } else if (res?.ok) {
        toast.success("Login successful!");
        window.location.href = callbackUrl;
      }
    } catch (error: object | any) {
      toast.error(error?.message || "Something went wrong!");
    }
  }

  return (
    <Card className="mx-auto my-[2%] w-[30%]">
      <CardHeader>
        <CardTitle className="text-2xl text-textColor">Log In</CardTitle>
        {/* Divider */}
        <div className="w-full border border-textColor" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between ">
              <Button
                type="submit"
                className="hover:opacity-90 bg-textColor hover:bg-textColor"
              >
                Log In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default function SuspenseLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 flex items-center justify-center text-lg">
          Loading...
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
