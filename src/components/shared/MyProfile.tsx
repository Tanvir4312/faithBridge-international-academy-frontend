"use client";

import React, { useState } from "react";
import MyProfile_Teacher from "./MyProfile/MyProfile_Teacher";
import MyProfile_Student from "./MyProfile/MyProfile_Student";
import MyProfile_Admin from "./MyProfile/MyProfile_Admin";
import { ShieldCheck, Mail, User, Clock, Phone, MapPin, Edit, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import UpdateAdminModal from "./adminModals/UpdateAdminModal";
import { Button } from "@/components/ui/button";

interface MyProfileProps {
    userInfo: any;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    if (!userInfo) return null;

    const role = userInfo?.role;

    const getRoleData = () => {
        if (userInfo.admin) return userInfo.admin;
        if (userInfo.teacher) return userInfo.teacher;
        if (userInfo.student) return userInfo.student;
        return null;
    };

    const roleData = getRoleData();

    if (role === "TEACHER") {
        return <MyProfile_Teacher userInfo={userInfo} roleData={roleData} />;
    }

    if (role === "STUDENT") {
        return <MyProfile_Student userInfo={userInfo} roleData={roleData} />;
    }

    if (role === "ADMIN") {
        return <MyProfile_Admin userInfo={userInfo} roleData={roleData} />;
    }

    const profilePhoto =
        roleData?.profilePhoto ||
        roleData?.profileImage ||
        userInfo.image ||
        null;

    const joinDate = userInfo.createdAt
        ? format(new Date(userInfo.createdAt), "MMMM d, yyyy")
        : "N/A";

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-500">

            {/* 🔥 HERO SECTION */}
            <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border shadow-xl">

                {/* Gradient Top */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-gray-900 to-gray-800" />

                <div className="relative flex flex-col lg:flex-row items-center lg:items-end gap-6 lg:gap-10 p-6 sm:p-10 pt-20">

                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center group relative ring-8 ring-white/10">
                            {profilePhoto ? (
                                <img
                                    src={profilePhoto}
                                    alt="profile"
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <User className="w-14 h-14 text-gray-300" />
                            )}
                            {role !== "APPLICANT" && (
                                <div 
                                    className={cn(
                                        "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm cursor-pointer",
                                        userInfo.status !== "ACTIVE" && "pointer-events-none opacity-0"
                                    )} 
                                    onClick={() => userInfo.status === "ACTIVE" && setIsUpdateModalOpen(true)}
                                >
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            )}
                        </div>

                        <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-xl border-4 border-white shadow-md">
                            <ShieldCheck className="w-4 h-4 text-white" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center lg:text-left space-y-3">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-bold">
                                    {role === "APPLICANT" ? "Candidate Profile" : "Master Authority"}
                                </p>
                                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight text-gray-900">
                                    {userInfo.name}
                                </h1>
                            </div>
                            {role !== "APPLICANT" && (
                                <Button 
                                    onClick={() => setIsUpdateModalOpen(true)} 
                                    disabled={userInfo.status !== "ACTIVE"}
                                    size="sm" 
                                    variant="secondary" 
                                    className="rounded-full font-black text-[10px] uppercase tracking-widest px-6 shadow-xl hover:scale-105 active:scale-95 transition-all mx-auto lg:mx-0 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                                >
                                    <Edit className="w-3.5 h-3.5 mr-2" />
                                    Update Profile
                                </Button>
                            )}
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-2">
                            <span className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold tracking-wide shadow">
                                <ShieldCheck className="w-4 h-4" />
                                {role.replace("_", " ")}
                            </span>

                            <span className={cn(
                                "flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold tracking-wide border shadow-sm backdrop-blur-md",
                                userInfo.status === "ACTIVE" ? "bg-emerald-50/80 text-emerald-700 border-emerald-200" : "bg-rose-50/80 text-rose-700 border-rose-200"
                            )}>
                                <div className={cn("w-2 h-2 rounded-full animate-pulse", userInfo.status === "ACTIVE" ? "bg-emerald-500" : "bg-rose-500")} />
                                {userInfo.status}
                            </span>

                            <span className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-1.5 rounded-xl text-sm shadow border">
                                <Mail className="w-4 h-4 text-indigo-500" />
                                {userInfo.email}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔥 GRID SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {(userInfo.status === "INACTIVE" || userInfo.status === "SUSPENDED") && (
                    <div className="lg:col-span-12">
                        <div className="bg-rose-50 border-2 border-rose-200 p-6 rounded-3xl flex items-center gap-6 animate-pulse shadow-lg">
                            <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-rose-900 font-black uppercase tracking-widest text-sm">Account Restricted</h3>
                                <p className="text-rose-700 text-sm font-medium mt-1">
                                    Your account status is currently set to <span className="font-black">"{userInfo.status}"</span>. 
                                    Access to dashboard activities and applications has been temporarily disabled. 
                                    Please contact system administration for reactivation.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* LEFT */}
                <div className="lg:col-span-4 space-y-6">
                    {role !== "APPLICANT" && (
                        <div className="bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border shadow-md hover:shadow-lg transition">
                            <SectionTitle icon={Clock} title="Contact Info" />

                            <div className="space-y-4">
                                <InfoItem icon={Clock} label="Joined" value={joinDate} />
                                <InfoItem
                                    icon={Phone}
                                    label="Contact"
                                    value={roleData?.contactNumber}
                                />
                                <InfoItem
                                    icon={MapPin}
                                    label="Address"
                                    value={roleData?.address}
                                />
                            </div>
                        </div>
                    )}

                    {/* Status Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-3xl shadow-lg">
                        <p className="text-xs uppercase tracking-widest text-indigo-400 mb-2">
                            {role === "APPLICANT" ? "Portal Status" : "Security Level"}
                        </p>
                        <h4 className="text-2xl font-bold">
                            {role === "APPLICANT" ? "Registered Member" : "Full Access"}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                            {role === "APPLICANT"
                                ? "Complete your admission application to proceed"
                                : "System fully authorized"
                            }
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-8">
                    <div className="bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border shadow-md h-full">

                        <SectionTitle icon={ShieldCheck} title={role === "APPLICANT" ? "Permissions" : "Privileges"} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

                            <div className="p-6 bg-indigo-50 rounded-2xl border">
                                <p className="text-xs uppercase text-indigo-500 font-bold mb-1">
                                    {role === "APPLICANT" ? "Account Level" : "Access"}
                                </p>
                                <p className="text-xl font-bold">
                                    {role === "APPLICANT" ? "STANDARD USER" : "ROOT ACCESS"}
                                </p>
                            </div>

                            <div className="p-6 bg-green-50 rounded-2xl border">
                                <p className="text-xs uppercase text-green-500 font-bold mb-1">
                                    Status
                                </p>
                                <p className="text-xl font-bold">{userInfo.status}</p>
                            </div>

                            <div className="sm:col-span-2 p-6 bg-gray-50 rounded-2xl border text-sm text-gray-500 italic">
                                {role === "APPLICANT"
                                    ? "“You have successfully joined our portal. Explore the dashboard to start your journey with us.”"
                                    : "“With great power comes great responsibility.”"
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UpdateAdminModal
                admin={{ ...roleData, name: userInfo.name }}
                isOpen={isUpdateModalOpen}
                onOpenChange={setIsUpdateModalOpen}
            />
        </div>
    );
};


const SectionTitle = ({ icon: Icon, title }: any) => (
    <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
            <Icon size={18} />
        </div>
        <h3 className="text-sm font-bold tracking-wide">{title}</h3>
        <div className="flex-1 h-px bg-gray-200" />
    </div>
);

const InfoItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-indigo-500" />
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-semibold text-gray-800">{value || "N/A"}</p>
        </div>
    </div>
);

export default MyProfile;