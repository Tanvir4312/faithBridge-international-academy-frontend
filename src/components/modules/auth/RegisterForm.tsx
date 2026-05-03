"use client";

import { registerAction } from "@/app/(authLayout)/register/_action";
import AppField from "@/components/shared/AppField";
import AppSubmitButton from "@/components/shared/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { registerSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import SocialLogin from "./SocialLogin";

const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "oauth_failed") {
      setServerError("Google authentication failed. Please try again.");
    }
  }, [searchParams]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerAction,
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      const parsed = registerSchema.safeParse(value);
      if (!parsed.success) {
        setServerError(parsed.error.issues[0].message);
        return;
      }

      try {
        const result = (await mutateAsync(value)) as any;
        if (!result?.success) {
          setServerError(result?.message || "Registration failed");
        }
      } catch (error: any) {
        if (error?.message?.includes("NEXT_REDIRECT")) throw error;
        setServerError("Registration failed. Please try again later.");
      }
    },
  });

  return (
    <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300">
      <CardHeader className="text-center pt-8 pb-6">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
            <UserPlus className="size-8" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create Account
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 mt-2">
          Join FaithBridge International Academy today
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <form.Field
            name="name"
            validators={{ onChange: registerSchema.shape.name }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                className="bg-slate-50/50 dark:bg-slate-800/50"
              />
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{ onChange: registerSchema.shape.email }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                className="bg-slate-50/50 dark:bg-slate-800/50"
              />
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{ onChange: registerSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="bg-slate-50/50 dark:bg-slate-800/50"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>

          {serverError && (
            <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-400">
              <AlertDescription className="text-xs font-medium">{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Creating account..."
                disabled={!canSubmit}
                className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-400 text-white font-bold py-6 rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/20"
              >
                Create Account
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>

        {/* <div className="mt-6">
          <SocialLogin />
        </div> */}

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
            <span className="px-4 bg-white dark:bg-slate-900 text-slate-400">
              Already a member?
            </span>
          </div>
        </div>

        <Link href="/login">
          <Button variant="outline" className="w-full py-6 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-all">
            Sign In to your account
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
