"use client";

import { Button } from "@/components/ui/button";
import { Role } from "@/types/Dashboard/shared_Enums/enums";
import { GraduationCap, ShieldAlert, ShieldCheck, UserPlus } from "lucide-react";

interface DemoLoginButtonsProps {
  onQuickLogin: (email: string, password: string) => void;
  isLoading: boolean;
}

const demoAccounts = [
  {
    role: Role.SUPER_ADMIN,
    email: "superadmin@gmail.com",
    password: "password1234",
    icon: ShieldAlert,
    color: "text-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-900/50 dark:hover:bg-emerald-900/20",
  },
  {
    role: Role.ADMIN,
    email: "admin3@gmail.com",
    password: "password1234",
    icon: ShieldCheck,
    color: "text-emerald-600 border-emerald-100 hover:bg-emerald-50/50 dark:text-emerald-500 dark:border-emerald-900/30 dark:hover:bg-emerald-900/10",
  },
  {
    role: Role.TEACHER,
    email: "mahfuj@gmail.com",
    password: "password123",
    icon: GraduationCap,
    color: "text-slate-700 border-slate-200 hover:bg-slate-50 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800/50",
  },
  {
    role: Role.APPLICANT,
    email: "applicant2@gmail.com",
    password: "password1234",
    icon: UserPlus,
    color: "text-slate-600 border-slate-200 hover:bg-slate-50/50 dark:text-slate-400 dark:border-slate-800/50 dark:hover:bg-slate-800/30",
  },
  {
    role: Role.STUDENT,
    email: "tanveer99ryan@gmail.com",
    password: "password1234",
    icon: UserPlus,
    color: "text-slate-600 border-slate-200 hover:bg-slate-50/50 dark:text-slate-400 dark:border-slate-800/50 dark:hover:bg-slate-800/30",
  },
];

const DemoLoginButtons = ({ onQuickLogin, isLoading }: DemoLoginButtonsProps) => {
  return (
    <div className="mt-8 space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
          <span className="px-4 bg-white dark:bg-slate-900 text-slate-400">
            Quick Access for Demo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {demoAccounts.map((account) => (
          <Button
            key={account.role}
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={() => onQuickLogin(account.email, account.password)}
            className={`flex items-center justify-start gap-2 h-10 px-3 rounded-lg border transition-all duration-200 ${account.color}`}
          >
            <account.icon className="h-4 w-4 shrink-0" />
            <span className="text-xs font-bold truncate">{account.role}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DemoLoginButtons;
