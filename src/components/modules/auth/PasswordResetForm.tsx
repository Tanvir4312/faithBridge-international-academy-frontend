"use client";

import { resetPasswordAction } from "@/app/(commonLayout)/(authRouteGroup)/reset-password/_action";
import AppField from "@/components/shared/AppField";
import AppSubmitButton from "@/components/shared/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { getUserInfo } from "../../../services/authService";
import { resetPasswordSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ResetPasswordFormProps {
  email: string;
}

const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { data: userInfo } = useQuery({
    queryKey: ["user-info"],
    queryFn: async () => await getUserInfo(),
  });

  const isNeedPasswordChange = userInfo?.needPasswordChange === true;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPasswordAction,
  });

  const form = useForm({
    defaultValues: {
      email: email || "",
      otp: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const payload = { ...value };
        if (isNeedPasswordChange) {
          delete (payload as any).otp;
        }
        const result = await mutateAsync(payload as any) as any;

        if (!result.success) {
          setServerError(result.message || "Reset failed");
          return;
        }

        toast.success(result.message || "Password reset successfully");
      } catch (error: any) {
        if (error.message && error.message.includes("NEXT_REDIRECT")) {
          throw error;
        }
        setServerError(`Reset failed: ${error.message}`);
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 text-primary mb-2 shadow-inner">
          <ShieldCheck className="size-10" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {isNeedPasswordChange ? "Set New Password" : "Reset Password"}
        </h1>
        <p className="text-muted-foreground text-balanced">
          {isNeedPasswordChange
            ? "Your email has been verified. Please set a strong password to secure your account and complete the setup."
            : "Enter the reset code sent to your email and your new password to restore access to your account."
          }
        </p>
      </div>

      <Card className="border border-border/50 shadow-2xl bg-card/30 backdrop-blur-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold">
            {isNeedPasswordChange ? "Account Security Update" : "Security Verification"}
          </CardTitle>
          <CardDescription className="space-y-1">
            {isNeedPasswordChange ? (
              <p>
                Set a secure password for <span className="font-semibold text-foreground underline decoration-primary/30 underline-offset-4">{email}</span> to finish your account setup.
              </p>
            ) : (
              <>
                <p>
                  The OTP was sent to <span className="font-semibold text-foreground underline decoration-primary/30 underline-offset-4">{email}</span>
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  Note: The OTP will expire in 5 minutes.
                </p>
              </>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <form.Field
              name="email"
              validators={{ onChange: resetPasswordSchema.shape.email }}
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

            {!isNeedPasswordChange && (
              <form.Field
                name="otp"
              >
                {(field) => (
                  <div className="space-y-3">
                    <Label htmlFor="otp" className={field.state.meta.errors?.length > 0 ? "text-destructive font-medium" : "font-medium"}>
                      Verification OTP
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
                              className="size-11 sm:size-12 text-xl border-input/50 bg-background/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all rounded-md"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>

                      {field.state.meta.isTouched && (field.state.meta.errors?.length > 0) && (
                        <p className="text-sm text-destructive font-medium animate-in fade-in slide-in-from-top-2">
                          {String(field.state.meta.errors[0])}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </form.Field>
            )}

            <form.Field
              name="password"
              validators={{ onChange: resetPasswordSchema.shape.password }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  prepend={<Lock className="size-4 text-muted-foreground" />}
                  append={
                    <Button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      variant="ghost"
                      size="icon"
                      className="size-8 mr-1 mt-1"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </Button>
                  }
                />
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
                  pendingLabel="Resetting password..."
                  disabled={!canSubmit}
                  className="h-12 text-base font-bold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] rounded-xl"
                >
                  {isNeedPasswordChange ? "Complete Setup" : "Reset Password"}
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
            onClick={() => toast.info("A new reset code will be sent shortly.")}
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

export default ResetPasswordForm;
