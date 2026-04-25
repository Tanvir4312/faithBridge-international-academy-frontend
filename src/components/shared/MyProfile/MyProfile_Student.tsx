"use client";

import React from "react";
import {
    User,
    Mail,
    ShieldCheck,
    Calendar,
    Phone,
    BadgeCheck,
    GraduationCap,
    Clock,
    Camera,
    MapPin,
    Edit,
    Shield,
    Fingerprint,
    Heart,
    HandIcon,
    Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import UpdateStudentModal from "../studentModals/UpdateStudentModal";
import { Button } from "@/components/ui/button";

interface MyProfile_StudentProps {
    userInfo: any;
    roleData: any;
}

const MyProfile_Student = ({ userInfo, roleData }: MyProfile_StudentProps) => {
    const [isUpdateStudentModalOpen, setIsUpdateStudentModalOpen] = React.useState(false);

    const profilePhoto = roleData?.profilePhoto || roleData?.profileImage || userInfo.image || null;
    const joinDate = roleData?.createdAt ? format(new Date(roleData.createdAt), "MMMM d, yyyy") : "N/A";
    const dobValue = roleData?.dob ? format(new Date(roleData.dob), "MMMM d, yyyy") : "N/A";

    return (
        <div className="space-y-6">
            {/* HERO */}
            <div className="relative overflow-visible md:overflow-hidden bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/30 p-6 sm:p-10">
                <div className="absolute top-0 left-0 w-full h-40 sm:h-48 bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 opacity-95 rounded-t-[2.5rem]" />
                <div className="absolute inset-x-0 top-0 h-40 sm:h-48 bg-[url('/circuit-board.png')] opacity-10 rounded-t-[2.5rem]" />
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

                <div className="relative flex flex-col lg:flex-row items-center lg:items-end gap-8 sm:gap-10">
                    <div className="relative flex-shrink-0 mt-12 lg:mt-0">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 overflow-hidden border-4 border-white shadow-2xl bg-gray-100 flex items-center justify-center group relative ring-8 ring-white/10">
                            {profilePhoto ? (
                                <img src={profilePhoto} alt="profile" className="w-full h-full  object-cover transition duration-500 group-hover:scale-110" />
                            ) : (
                                <User className="w-16 h-16 text-gray-300" />
                            )}
                            <div 
                                className={cn(
                                    "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm cursor-pointer",
                                    userInfo.status !== "ACTIVE" && "pointer-events-none opacity-0"
                                )} 
                                onClick={() => userInfo.status === "ACTIVE" && setIsUpdateStudentModalOpen(true)}
                            >
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg" />
                    </div>

                    <div className="flex-1 min-w-0 text-center lg:text-left space-y-4 w-full">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black break-words tracking-tighter text-gray-900 drop-shadow-sm">
                                {userInfo.name}
                            </h1>
                            <div className="flex items-center gap-3 mx-auto lg:mx-0">
                                <BadgeCheck className={cn("w-6 h-6", userInfo.status === "ACTIVE" ? "text-green-500" : "text-red-500")} />
                                <Button 
                                    onClick={() => setIsUpdateStudentModalOpen(true)} 
                                    disabled={userInfo.status !== "ACTIVE"}
                                    size="sm" 
                                    variant="secondary" 
                                    className="rounded-full font-black text-[10px] uppercase tracking-widest px-6 shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                                >
                                    <Edit className="w-3.5 h-3.5 mr-2" />
                                    Update Profile
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 py-2 justify-center lg:justify-start">
                            <span className="flex items-center gap-2 bg-indigo-700 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200">
                                <ShieldCheck className="w-4 h-4" />
                                STUDENT
                            </span>
                            <div className="flex flex-wrap items-center gap-4">
                                <span className={cn(
                                    "flex items-center gap-2 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border shadow-sm backdrop-blur-md",
                                    userInfo.status === "ACTIVE" ? "bg-emerald-50/80 text-emerald-700 border-emerald-200" : "bg-rose-50/80 text-rose-700 border-rose-200"
                                )}>
                                    <div className={cn("w-2 h-2 rounded-full animate-pulse", userInfo.status === "ACTIVE" ? "bg-emerald-500" : "bg-rose-500")} />
                                    {userInfo.status}
                                </span>
                                <div className="flex items-center gap-3 text-gray-500 text-sm font-bold bg-white/50 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/50 shadow-sm truncate max-w-full">
                                    <Mail className="w-4 h-4 text-indigo-600" />
                                    {userInfo.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTIONS GRID */}
            {(userInfo.status === "INACTIVE" || userInfo.status === "SUSPENDED") && (
                <div className="bg-rose-50 border-2 border-rose-200 p-8 rounded-[2.5rem] flex items-center gap-8 animate-pulse shadow-xl">
                    <div className="w-16 h-16 bg-rose-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-lg shadow-rose-200 flex-shrink-0">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-rose-900 font-black uppercase tracking-[0.2em] text-sm">Student Access Restricted</h3>
                        <p className="text-rose-700 text-sm font-bold mt-2 leading-relaxed">
                            Your account is currently <span className="underline decoration-2 underline-offset-4">"{userInfo.status}"</span>. 
                            Academic records, payments, and dashboard features are locked. 
                            Please visit the administration office.
                        </p>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div className="lg:col-span-4 space-y-6 sm:space-y-8">
                    <div className="bg-white/70 backdrop-blur-2xl p-6 sm:p-8 rounded-[2rem] border border-white shadow-xl hover:shadow-2xl transition-all duration-500">
                        <SectionTitle icon={Fingerprint} title="Core Identity" color="text-indigo-600" />
                        <div className="space-y-1">
                            <InfoItem icon={Fingerprint} label="Registration ID" value={roleData?.registrationId} />
                            <InfoItem icon={BadgeCheck} label="Class Roll" value={`#${roleData?.classRoll || "N/A"}`} />
                            <InfoItem icon={GraduationCap} label="Academic Class" value={roleData?.class?.name || "Unassigned"} />
                            <InfoItem icon={Clock} label="System Enrollment" value={joinDate} />
                            <InfoItem icon={Phone} label="Contact Terminal" value={roleData?.guardianMobile || "N/A"} />
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:scale-150" />
                        <h4 className="font-black text-xs uppercase tracking-[0.3em] text-indigo-400 mb-6">Security Node Status</h4>
                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-end">
                                <span className="text-3xl font-black tracking-tighter">ENCRYPTED</span>
                                <ShieldCheck className="w-8 h-8 text-indigo-500" />
                            </div>
                            <div className="h-2.5 bg-white/10 rounded-full p-0.5 overflow-hidden">
                                <div className="h-full w-[94%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                            </div>
                            <p className="text-[10px] text-white/40 leading-relaxed font-bold tracking-wider uppercase">High-priority clearance detected. All biometric data remains sequestered.</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                    <div className="bg-white/70 backdrop-blur-2xl p-6 sm:p-10 rounded-[2rem] border border-white shadow-xl">
                        <SectionTitle icon={User} title="Biometric Dossier" color="text-pink-600" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <InfoItem icon={Calendar} label="Birth Date" value={dobValue} />
                            <InfoItem icon={User} label="Gender" value={roleData?.gender || "N/A"} />
                            <InfoItem icon={Heart} label="Blood Group" value={roleData?.bloodGroup || "N/A"} />
                            <InfoItem icon={Shield} label="Faith System" value={roleData?.religion || "N/A"} />
                            <InfoItem icon={BadgeCheck} label="B.C. Registry" value={roleData?.birthCertificateNo || "N/A"} />
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-2xl p-6 sm:p-10 rounded-[2rem] border border-white shadow-xl">
                        <SectionTitle icon={HandIcon} title="Family Verification" color="text-emerald-600" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100 flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-200">F</div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1 opacity-60">Father Figure</p>
                                    <p className="text-xl font-black text-gray-900 leading-tight">{roleData?.fatherName || "N/A"}</p>
                                </div>
                            </div>
                            <div className="p-6 bg-pink-50/50 rounded-3xl border border-pink-100 flex items-start gap-4">
                                <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-pink-200">M</div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-pink-600 mb-1 opacity-60">Mother Figure</p>
                                    <p className="text-xl font-black text-gray-900 leading-tight">{roleData?.motherName || "N/A"}</p>
                                </div>
                            </div>
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                                <InfoItem icon={Phone} label="Guardian Protocol Mobile" value={roleData?.guardianMobile || "N/A"} />
                                <InfoItem icon={Phone} label="Student Terminal Mobile" value={roleData?.studentMobile || "Unlisted"} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-2xl p-6 sm:p-10 rounded-[2rem] border border-white shadow-xl">
                        <SectionTitle icon={Home} title="Geospatial Coordinates" color="text-amber-600" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 mb-4 px-2 opacity-60">Current Residence</p>
                                <div className="p-6 bg-amber-50/50 rounded-3xl border border-amber-100 text-sm font-bold text-gray-700 leading-relaxed italic border-dashed">
                                    {roleData?.presentAddress || "N/A"}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-4 px-2 opacity-60">Permanent Domicile</p>
                                <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 text-sm font-bold text-gray-700 leading-relaxed italic border-dashed">
                                    {roleData?.permanentAddress || "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UpdateStudentModal
                student={roleData}
                isOpen={isUpdateStudentModalOpen}
                onOpenChange={setIsUpdateStudentModalOpen}
            />
        </div>
    );
};

const SectionTitle = ({ icon: Icon, title, color }: any) => (
    <div className="flex items-center gap-4 mb-8">
        <div className={cn("p-2.5 rounded-2xl bg-white shadow-md", color)}>
            <Icon size={20} />
        </div>
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900">{title}</h3>
        <div className="flex-1 h-px bg-gray-200/60" />
    </div>
)

const InfoItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-all duration-300 group">
        <div className="p-2.5 bg-white shadow-sm rounded-xl text-indigo-500 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1 opacity-70 group-hover:opacity-100 transition-opacity">{label}</p>
            <p className="font-bold text-gray-900 break-words group-hover:text-indigo-600 transition-colors">
                {value || "N/A"}
            </p>
        </div>
    </div>
);

export default MyProfile_Student;
