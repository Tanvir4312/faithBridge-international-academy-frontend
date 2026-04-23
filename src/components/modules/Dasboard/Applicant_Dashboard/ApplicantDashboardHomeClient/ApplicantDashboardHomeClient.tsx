"use client"

import { useQuery } from "@tanstack/react-query";
import { getMyApplicationInfo } from "@/services/applicant-server-action/application.service";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Clock,
    Mail,
    ShieldCheck,
    Sparkles,
    FileText,
    ArrowRight,
    School
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const ApplicantDashboardHomeClient = ({ applicantId }: { applicantId: string }) => {
    const { data: applicationResponse, isLoading } = useQuery({
        queryKey: ["my-application", applicantId],
        queryFn: () => getMyApplicationInfo(applicantId),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    const application = applicationResponse?.data;


    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-10">
                <Skeleton className="h-64 w-full rounded-[3.5rem]" />
                <Skeleton className="h-96 w-full rounded-[4rem]" />
            </div>
        )
    }

    if (!application) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="bg-gray-100 p-6 rounded-full">
                    <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-xl font-bold text-gray-500 uppercase tracking-widest italic">No application found</p>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* 🏫 Welcome Banner */}
            <div className="relative group rounded-[3.5rem] p-[2px] bg-gradient-to-br from-primary via-purple-500 to-indigo-600 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-white/95 backdrop-blur-3xl rounded-[3.4rem]" />

                <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative">
                        <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl overflow-hidden ring-4 ring-primary/20 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 relative">
                            {application.profileImage ? (
                                <Image
                                    src={application.profileImage}
                                    alt={application.nameEn || 'Profile'}
                                    fill
                                    className="object-cover relative z-10"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center relative z-10">
                                    <FileText className="w-12 h-12 text-slate-300" />
                                </div>
                            )}
                        </div>
                        <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-2xl shadow-xl animate-bounce z-20">
                            <Sparkles className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-3">
                        {application.admissionYear && (
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest">
                                Session {application.admissionYear}
                            </Badge>
                        )}
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight italic">
                            Hello, <span className="text-primary">{application.nameEn?.split(' ')[0] || 'Student'}!</span>
                        </h1>
                        <p className="text-lg font-bold text-slate-500 uppercase tracking-widest max-w-lg">
                            Welcome to your admission portal dashboard.
                        </p>
                    </div>
                </div>
            </div>

            {/* 📌 Main Status Message Card */}
            <Card className="rounded-[4rem] border-none shadow-2xl shadow-primary/10 bg-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <School className="h-64 w-64 text-primary" />
                </div>

                <CardContent className="p-10 md:p-16 space-y-12 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-8">
                        {/* Status Icon with Pulse Ring */}
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-full animate-ping scale-150 ${application.status === 'REJECTED' ? 'bg-rose-400/20' : application.status === 'APPROVED' ? 'bg-emerald-400/20' : 'bg-amber-400/20'}`} />
                            <div className={`relative z-10 h-24 w-24 rounded-full flex items-center justify-center border-4 border-white shadow-xl ${application.status === 'REJECTED' ? 'bg-rose-50' : application.status === 'APPROVED' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                                <Clock className={`h-10 w-10 ${application.status === 'REJECTED' ? 'text-rose-500' : application.status === 'APPROVED' ? 'text-emerald-500' : 'text-amber-500'}`} />
                            </div>
                        </div>

                        <div className="space-y-6 max-w-3xl">
                            <Badge className={`${application.status === 'APPROVED' ? 'bg-emerald-500 shadow-emerald-200' : application.status === 'REJECTED' ? 'bg-rose-500 shadow-rose-200' : 'bg-amber-500 shadow-amber-200'} text-white px-8 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-lg`}>
                                Application {application.status}
                            </Badge>

                            <div className="space-y-4">
                                {application.status === 'REJECTED' ? (
                                    <>
                                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 italic leading-tight">
                                            We regret to inform you that your application was <span className="text-rose-500 underline decoration-rose-400 underline-offset-8">not accepted</span>.
                                        </h2>

                                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-relaxed italic p-3">
                                            "Unfortunately, the school authority is unable to offer you admission at this time. We wish you the very best in your future academic endeavors."
                                        </p>
                                    </>
                                ) : application.status === 'APPROVED' ? (
                                    <>
                                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 italic leading-tight">
                                            Congratulations! Your application has been <span className="text-emerald-500 underline decoration-emerald-400 underline-offset-8">approved</span>.
                                        </h2>

                                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-relaxed italic p-3">
                                            "The school authority has successfully reviewed and approved your application. Welcome to Faithbridge International School!"
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 italic leading-tight">
                                            Your application was received by <span className="text-primary underline decoration-amber-400 underline-offset-8">school authority</span>.
                                        </h2>

                                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-relaxed italic p-3">
                                            "The school authority will review your application and inform you about its status.
                                            You are kindly requested to wait until then."
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Timeline/Next Steps */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10 border-t border-slate-100">
                        {application.status === 'REJECTED' ? (
                            <div className="col-span-1 lg:col-span-2 p-8 rounded-[3rem] bg-rose-50/50 border border-rose-100/50 flex flex-col items-center justify-center text-center gap-4">
                                <div className="p-4 bg-white rounded-full shadow-sm text-rose-500">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-400">Need Help?</p>
                                    <p className="text-sm font-bold text-slate-700 leading-tight max-w-lg">
                                        If you believe there has been a mistake or would like to request further details regarding the decision, please contact the admission office.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-8 rounded-[3rem] bg-indigo-50/50 border border-indigo-100/50 md:flex items-start gap-6 group hover:bg-indigo-50 transition-colors">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-500 shrink-0 group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 md:pt-0 pt-2">Notification</p>
                                        <p className="text-sm font-bold text-slate-700 leading-tight">
                                            If your application is approved, you will be notified via email.
                                        </p>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[3rem] bg-emerald-50/50 border border-emerald-100/50 md:flex items-start gap-6 group hover:bg-emerald-50 transition-colors">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-500 shrink-0 group-hover:scale-110 transition-transform">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 md:pt-0 pt-2">Next Step</p>
                                        <p className="text-sm font-bold text-slate-700 leading-tight">
                                            After approval, you will need to log in again using your email.
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="text-center pt-8">
                        <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                            Thank you for applying to <span className="text-slate-900">Faithbridge International School</span>.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Link Card */}
            <div className="flex justify-center">
                <Link href="/dashboard/my-application" className="inline-flex items-center gap-3 px-8 py-3 bg-white rounded-full border border-slate-100 shadow-xl group cursor-pointer hover:border-primary transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">Check Detailed Portfolio</span>
                    <FileText className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-all" />
                </Link>
            </div>
        </div>
    );
};

export default ApplicantDashboardHomeClient;
