"use client";

import React from "react";
import {
    User,
    Mail,
    ShieldCheck,
    Calendar,
    Phone,
    BadgeCheck,
    Briefcase,
    GraduationCap,
    Clock,
    Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MyProfileProps {
    userInfo: any;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
    if (!userInfo) return null;

    const role = userInfo.role;

    const getRoleData = () => {
        if (userInfo.admin) return userInfo.admin;
        if (userInfo.teacher) return userInfo.teacher;
        if (userInfo.student) return userInfo.student;
        return null;
    };

    const roleData = getRoleData();

    const profilePhoto = roleData?.profilePhoto || userInfo.image || null;

    const joinDate = roleData?.createdAt
        ? format(new Date(roleData.createdAt), "MMMM d, yyyy")
        : "N/A";

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-12">

            {/* HERO */}
            <div className="relative overflow-visible md:overflow-hidden bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-5 sm:p-8">

                {/* Gradient */}
                <div className="absolute top-0 left-0 w-full h-32 sm:h-40 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-90 rounded-t-3xl" />

                <div className="relative flex flex-col lg:flex-row items-center lg:items-end gap-6">

                    {/* Avatar */}
                    <div className="relative flex-shrink-0 mt-10 lg:mt-0">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center group">

                            {profilePhoto ? (
                                <img
                                    src={profilePhoto}
                                    alt="profile"
                                    className="w-full h-full object-cover transition group-hover:scale-110"
                                />
                            ) : (
                                <User className="w-12 h-12 text-gray-300" />
                            )}

                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>

                    {/* INFO */}
                    <div className="flex-1 min-w-0 text-center lg:text-left space-y-3 w-full">

                        {/* Name + Status */}
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold break-words bg-gradient-to-r from-gray-900 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                                {userInfo.name}
                            </h1>

                            <span
                                className={cn(
                                    "px-3 py-1 rounded-xl text-xs font-bold w-fit mx-auto lg:mx-0",
                                    userInfo.status === "ACTIVE"
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                )}
                            >
                                {userInfo.status}
                            </span>
                        </div>

                        {/* Role + Email */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 justify-center lg:justify-start">

                            <span className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold">
                                <ShieldCheck className="w-4 h-4" />
                                {role.replace("_", " ")}
                            </span>

                            <div
                                title={userInfo.email}
                                className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm bg-gray-50 px-3 py-1.5 rounded-xl border truncate max-w-full sm:max-w-[250px]"
                            >
                                <Mail className="w-4 h-4 text-indigo-500" />
                                {userInfo.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="space-y-6">

                    <div className="bg-white/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border shadow hover:shadow-lg transition">
                        <h3 className="font-bold mb-4 flex items-center gap-2 text-sm sm:text-base">
                            <BadgeCheck className="text-indigo-500" />
                            Core Info
                        </h3>

                        <InfoItem
                            icon={Clock}
                            label="Joined Date"
                            value={format(new Date(userInfo.createdAt), "MMM d, h:mm a")}
                        />
                        <InfoItem icon={Phone} label="Contact" value={roleData?.contactNumber || "N/A"} />

                    </div>

                    <div className="bg-gray-900 text-white p-5 sm:p-6 rounded-2xl shadow-lg">
                        <h4 className="font-bold text-lg mb-2">System Secure</h4>
                        <p className="text-gray-400 text-sm">
                            Your account is protected with encryption.
                        </p>

                        <div className="mt-3 h-2 bg-white/10 rounded-full">
                            <div className="h-full w-[95%] bg-indigo-500 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border shadow hover:shadow-lg transition">

                    <h3 className="font-bold mb-4 flex items-center gap-2 text-sm sm:text-base">
                        {role === "STUDENT" ? <GraduationCap /> : <Briefcase />}
                        Role Insights
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        {[
                            { label: "Integrity", value: "Perfect" },
                            { label: "Uptime", value: "100%" },
                            { label: "Tier", value: "Elite" },
                            { label: "Alerts", value: "Safe" },
                        ].map((item) => (
                            <div key={item.label}>
                                <p className="text-[10px] text-gray-400 uppercase">
                                    {item.label}
                                </p>
                                <p className="text-base sm:text-lg font-bold text-gray-900">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

/* Reusable */
const InfoItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">
            <Icon className="w-4 h-4 text-indigo-500" />
        </div>
        <div className="min-w-0">
            <p className="text-[10px] text-gray-400 uppercase">{label}</p>
            <p className="font-semibold text-sm sm:text-base break-words">
                {value}
            </p>
        </div>
    </div>
);