"use client";

import { forgotPasswordAction } from "@/app/(commonLayout)/(authRouteGroup)/forgot-password/_action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillEmail?: string;
}

const ForgotPasswordModal = ({ open, onOpenChange, prefillEmail }: ForgotPasswordModalProps) => {
  const router = useRouter();
  const [email, setEmail] = useState(prefillEmail || "");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail(prefillEmail || "");
      setError(null);
      setSent(false);
    }
  }, [open, prefillEmail]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: forgotPasswordAction,
  });

  const handleSend = async () => {
    setError(null);
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    const result = await mutateAsync(email) as any;

    if (!result?.success) {
      setError(result?.message || "Failed to send reset code");
      return;
    }

    setSent(true);
    toast.success("Reset code sent to your email!");

    setTimeout(() => {
      onOpenChange(false);
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-center">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Mail className="size-7" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold">Forgot Password?</DialogTitle>
          <DialogDescription className="text-center">
            Enter your email address and we&apos;ll send you a one-time code to reset your password.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center animate-in fade-in zoom-in-95">
              <div className="p-3 rounded-full bg-green-500/10 text-green-500">
                <CheckCircle className="size-8" />
              </div>
              <p className="font-semibold text-foreground">Code sent!</p>
              <p className="text-sm text-muted-foreground">Redirecting you to reset your password...</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="forgot-email" className="font-medium">
                  Email Address
                </Label>
                <div className="relative flex items-center border rounded-lg bg-background/50 border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  <Mail className="size-4 text-muted-foreground ml-3 shrink-0" />
                  <Input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Enter your registered email"
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 text-destructive">
                  <AlertDescription className="font-medium">{error}</AlertDescription>
                </Alert>
              )}
            </>
          )}
        </div>

        {!sent && (
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={isPending}
              className="w-full sm:w-auto font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                "Send Reset Code"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
