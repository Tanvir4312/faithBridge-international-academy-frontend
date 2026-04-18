"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/authService";
import { UserInfo } from "@/types/user.types";
import { Key, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserDropdownProps {
    userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const result = await logoutUser();

            if (result.success) {
                toast.success("Logged out successfully");
                router.push("/login");
                router.refresh();
            } else {
                toast.error(result.message || "Failed to logout");
            }
        } catch {
            toast.error("An error occurred during logout");
        }
    };

    const userInitial = userInfo?.name?.charAt(0)?.toUpperCase() || "?";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 hover:bg-primary/10 transition"
                >
                    <span className="text-sm font-semibold">{userInitial}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-64 p-2 rounded-xl shadow-lg"
            >
                {/* User Info */}
                <DropdownMenuLabel className="px-2 py-2">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">
                            {userInfo?.name}
                        </p>

                        <p className="text-xs text-muted-foreground truncate">
                            {userInfo?.email}
                        </p>

                        <p className="text-xs text-primary capitalize font-medium">
                            {userInfo?.role?.toLowerCase().replace("_", " ")}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Profile */}
                <DropdownMenuItem asChild>
                    <Link
                        href="/my-profile"
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                    </Link>
                </DropdownMenuItem>

                {/* Change Password */}
                <DropdownMenuItem asChild>
                    <Link
                        href="/change-password"
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <Key className="h-4 w-4" />
                        <span>Change Password</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;