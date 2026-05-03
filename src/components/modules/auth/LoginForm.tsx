"use client";

import { loginAction } from "@/app/(authLayout)/login/_action";
import ForgotPasswordModal from "@/components/modules/auth/ForgotPasswordModal";
import AppField from "@/components/shared/AppField";
import AppSubmitButton from "@/components/shared/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DemoLoginButtons from "./DemoLoginButtons";
// import SocialLogin from "./SocialLogin";

interface LoginFormProps {
  redirectPath?: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "oauth_failed") {
      setServerError("Google authentication failed. Please try again.");
    }
  }, [searchParams]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) => loginAction(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value) as any;
        if (!result.success) {
          setServerError(result.message || "Invalid credentials. Please try again.");
        }
      } catch (error: any) {
        setServerError("Something went wrong. Please try again later.");
      }
    },
  });


  const handleQuickLogin = (email: string, password: string) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", password);

    // Use setTimeout to ensure the form values are updated before submission
    setTimeout(() => {
      form.handleSubmit();
    }, 100);
  };

  return (
    <>
      <ForgotPasswordModal
        open={forgotModalOpen}
        onOpenChange={setForgotModalOpen}
        prefillEmail={forgotEmail}
      />

      <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300">
        <CardHeader className="text-center pt-8 pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
              <LockKeyhole className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400 mt-2">
            Enter your credentials to access your account
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
              name="email"
              validators={{ onChange: loginZodSchema.shape.email }}
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

            <div className="space-y-1">
              <form.Field
                name="password"
                validators={{ onChange: loginZodSchema.shape.password }}
              >
                {(field) => (
                  <AppField
                    field={field}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-slate-50/50 dark:bg-slate-800/50"
                    append={
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        onClick={() => setShowPassword(v => !v)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    }
                  />
                )}
              </form.Field>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(form.getFieldValue("email") || "");
                    setForgotModalOpen(true);
                  }}
                  className="text-xs font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {serverError && (
              <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-400">
                <AlertDescription className="text-xs font-medium">{serverError}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Signing in..."
                  disabled={!canSubmit}
                  className="w-full bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500 text-white font-bold py-6 rounded-xl transition-all duration-300 shadow-lg shadow-green-700/20"
                >
                  Sign In
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>

          {/* <div className="mt-6">
            <SocialLogin />
          </div> */}

          <form.Subscribe selector={(s) => [s.isSubmitting] as const}>
            {([isSubmitting]) => (
              <DemoLoginButtons
                onQuickLogin={handleQuickLogin}
                isLoading={isPending || isSubmitting}
              />
            )}
          </form.Subscribe>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
              <span className="px-4 bg-white dark:bg-slate-900 text-slate-400">
                New to FaithBridge?
              </span>
            </div>
          </div>

          <Link href="/register">
            <Button variant="outline" className="w-full py-6 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-all">
              Create an Account
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;