"use client";

import { verifyEmailAction } from "@/app/(commonLayout)/(authRouteGroup)/verify-email/_action";
import AppField from "@/components/shared/AppField";
import AppSubmitButton from "@/components/shared/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { verifyEmailSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface VerifyEmailFormProps {
  email: string;
}

const VerifyEmailForm = ({ email }: VerifyEmailFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: verifyEmailAction,
  });

  const form = useForm({
    defaultValues: {
      email: email || "",
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value) as any;

        if (!result.success) {
          setServerError(result.message || "Verification failed");
          return;
        }

        toast.success(result.message || "Email verified successfully");
      } catch (error: any) {
        if (error.message && error.message.includes("NEXT_REDIRECT")) {
          throw error;
        }
        setServerError(`Verification failed: ${error.message}`);
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 text-primary mb-2 shadow-inner">
          <ShieldCheck className="size-10" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Verify your email</h1>
        <p className="text-muted-foreground text-balanced">
          We&apos;ve sent a 6-digit verification code to your email address. Please enter it below to secure your account.
        </p>
      </div>

      <Card className="border border-border/50 shadow-2xl bg-card/30 backdrop-blur-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold">Enter Verification OTP</CardTitle>
          <CardDescription className="space-y-1">
            <p>
              The OTP was sent to <span className="font-semibold text-foreground underline decoration-primary/30 underline-offset-4">{email}</span>
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
              Note: The OTP will expire in 5 minutes.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            <form.Field
              name="email"
              validators={{ onChange: verifyEmailSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email Address"
                  type="email"
                  disabled={true}
                  className="opacity-80"
                  prepend={<Mail className="size-4 text-muted-foreground" />}
                />
              )}
            </form.Field>

            <form.Field
              name="otp"
              validators={{
                onChange: verifyEmailSchema.shape.otp,
              }}
            >
              {(field) => (
                <div className="space-y-3">
                  <Label htmlFor="otp" className={field.state.meta.errors?.length > 0 ? "text-destructive font-medium" : "font-medium"}>
                    One-Time Password
                  </Label>
                  <div className="flex flex-col items-center gap-4">
                    <InputOTP
                      maxLength={6}
                      value={field.state.value}
                      onChange={(val) => field.handleChange(val)}
                      containerClassName="group flex items-center justify-center w-full"
                    >
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5]?.map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="size-12 sm:size-14 text-xl border-input/50 bg-background/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all rounded-md"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>

                    {field.state.meta.isTouched && field.state.meta.errors?.length > 0 && (
                      <p className="text-sm text-destructive font-medium animate-in fade-in slide-in-from-top-2">
                        {field.state.meta.errors[0]?.message || String(field.state.meta.errors[0])}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </form.Field>

            {serverError && (
              <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 text-destructive animate-in shake-in-1">
                <AlertDescription className="font-medium">{serverError}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Verifying code..."
                  disabled={!canSubmit}
                  className="h-12 text-base font-bold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] rounded-xl"
                >
                  Verify Email
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            className="text-primary font-semibold hover:underline underline-offset-4 decoration-2"
            onClick={() => toast.info("A new code will be sent shortly.", { description: "Please check your spam folder as well." })}
          >
            Resend Code
          </button>
        </p>

        <div className="pt-4">
          <button
            onClick={() => window.location.href = '/login'}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
