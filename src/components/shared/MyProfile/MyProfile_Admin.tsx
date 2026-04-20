"use client";

import React from "react";
import { ShieldCheck, Mail, User, Clock, Phone, MapPin, Edit, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import UpdateAdminModal from "../adminModals/UpdateAdminModal";
import { Button } from "@/components/ui/button";

interface MyProfile_AdminProps {
    userInfo: any;
    roleData: any;
}

const MyProfile_Admin = ({ userInfo, roleData }: MyProfile_AdminProps) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);

    const profilePhoto = roleData?.profilePhoto || roleData?.profileImage || userInfo.image || null;
    const joinDate = userInfo.createdAt ? format(new Date(userInfo.createdAt), "MMMM d, yyyy") : "N/A";

    return (
        <div className="w-full space-y-6 animate-in fade-in duration-700">
            {/* ADMIN HERO */}
            <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/30 p-10">
                <div className="absolute top-0 left-0 w-full h-32 bg-indigo-900 opacity-95 rounded-t-[2.5rem]" />
                <div className="relative flex flex-col lg:flex-row items-center lg:items-end gap-8">
                    <div className="relative flex-shrink-0 mt-6 lg:mt-0">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center group relative ring-8 ring-white/10">
                            {profilePhoto ? (
                                <img src={profilePhoto} alt="profile" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                            ) : (
                                <User className="w-16 h-16 text-gray-300" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm cursor-pointer" onClick={() => setIsUpdateModalOpen(true)}>
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 text-center lg:text-left space-y-3">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                            <h1 className="text-3xl lg:text-5xl font-black text-gray-900">{userInfo.name}</h1>
                            <Button onClick={() => setIsUpdateModalOpen(true)} size="sm" variant="secondary" className="rounded-full font-black text-[10px] uppercase tracking-widest px-6 shadow-xl hover:scale-105 active:scale-95 transition-all mx-auto lg:mx-0">
                                <Edit className="w-3.5 h-3.5 mr-2" />
                                Update Profile
                            </Button>
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                             <span className="flex items-center gap-2 bg-indigo-700 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4" />
                                ADMIN
                            </span>
                            <div className="flex items-center gap-3 text-gray-500 text-sm font-bold bg-white/50 px-4 py-1.5 rounded-xl border border-white/50">
                                <Mail className="w-4 h-4 text-indigo-600" />
                                {userInfo.email}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-white shadow-xl lg:col-span-1">
                     <SectionTitle icon={Clock} title="Time Logistics" color="text-indigo-600" />
                     <div className="space-y-1">
                        <InfoItem icon={Clock} label="Member Since" value={joinDate} />
                        <InfoItem icon={Phone} label="Contact" value={roleData?.contactNumber || "N/A"} />
                        <InfoItem icon={MapPin} label="Base Location" value={roleData?.address || "Headquarters"} />
                     </div>
                </div>
                <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-white shadow-xl lg:col-span-2">
                     <SectionTitle icon={ShieldCheck} title="Privilege Protocol" color="text-emerald-600" />
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
                         <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                             <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1 opacity-60">Authorization Level</p>
                             <p className="text-2xl font-black text-gray-900">MANAGEMENT</p>
                         </div>
                         <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100">
                             <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mb-1 opacity-60">System Status</p>
                             <p className="text-2xl font-black text-gray-900">{userInfo.status}</p>
                         </div>
                     </div>
                </div>
            </div>

            <UpdateAdminModal 
                admin={{...roleData, name: userInfo.name}} 
                isOpen={isUpdateModalOpen} 
                onOpenChange={setIsUpdateModalOpen} 
            />
        </div>
    );
};


const SectionTitle = ({ icon: Icon, title, color }: any) => (
    <div className="flex items-center gap-4 mb-4">
        <div className={cn("p-2 rounded-xl bg-white shadow-sm", color)}>
            <Icon size={16} />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{title}</h3>
    </div>
)

const InfoItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-all duration-300 group">
        <div className="p-2 bg-white shadow-sm rounded-xl text-indigo-500 group-hover:scale-110 transition-transform duration-300">
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

export default MyProfile_Admin;
