"use client";

import { gettAllInfoForTeacher } from "@/services/teacher-server-action/teacher-info.service";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  Mail,
  User,
  Loader2,
  GraduationCap,
  Layers,
  Users,
  Bell,
  ChevronRight,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useMemo } from "react";
import NoticeDetailModal from "./NoticeDetailModal";
import StudentDetailsForTeacher from "./StudentDetailsForTeacher";
import { Button } from "@/components/ui/button";

const TeacherDashboardInfo = ({ teacherId }: { teacherId: string }) => {
  const [selectedNotice, setSelectedNotice] = useState<any | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const { data: teacherInfoResponse, isLoading } = useQuery({
    queryKey: ["teacher-info", teacherId],
    queryFn: () => gettAllInfoForTeacher(teacherId),
  });

  const teacherInfo = teacherInfoResponse?.data;

  const classData = teacherInfo?.classTeacher?.class;
  const students = classData?.students || [];

  const stats = useMemo(() => {
    return {
      total: students?.length,
      boys: students?.filter((s: any) => s.gender === "MALE")?.length,
      girls: students?.filter((s: any) => s.gender === "FEMALE")?.length,
    };
  }, [students]);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!teacherInfo) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-10">

      <NoticeDetailModal
        notice={selectedNotice}
        isOpen={!!selectedNotice}
        onOpenChange={(open) => !open && setSelectedNotice(null)}
      />
      <StudentDetailsForTeacher
        student={selectedStudent}
        classData={classData}
        isOpen={!!selectedStudent}
        onOpenChange={(open: boolean) => !open && setSelectedStudent(null)}
      />

      {/* PROFILE CARD */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />

        <div className="relative pt-16 pb-10 px-6 md:px-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-background shadow-2xl">
              <AvatarImage src={teacherInfo.profilePhoto} alt={teacherInfo.name} />
              <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                {teacherInfo.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CheckCircle2 className="absolute bottom-2 right-2 h-7 w-7 text-green-500 bg-white rounded-full p-1 shadow" />
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{teacherInfo.name}</h1>
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                {teacherInfo.user.status}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" />{teacherInfo.email}</span>
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" />Faculty Member</span>
            </div>

            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary">
                <Layers className="h-3.5 w-3.5" />
                {teacherInfo.teacherSubjects?.length || 0} Subjects
              </div>
              <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="h-3.5 w-3.5 text-primary" />
                {teacherInfo.designation}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLASS MANAGEMENT SECTION */}
      {classData ? (
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Class Teacher of {classData.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-3 gap-4">
              {[
                { label: "Total Students", value: stats.total, color: "text-primary", bg: "bg-primary/5" },
                { label: "Boys", value: stats.boys, color: "text-blue-500", bg: "bg-blue-50" },
                { label: "Girls", value: stats.girls, color: "text-pink-500", bg: "bg-pink-50" }
              ].map((stat, i) => (
                <Card key={`${stat.label}-${i}`} className={`border-none ${stat.bg} shadow-none`}>
                  <CardHeader className="p-4 pb-0"><CardDescription className="text-[10px] font-black uppercase tracking-widest">{stat.label}</CardDescription></CardHeader>
                  <CardContent className="p-4 pt-1"><span className={`text-4xl font-black ${stat.color}`}>{stat.value}</span></CardContent>
                </Card>
              ))}

              <Card className="col-span-3 overflow-hidden border">
                <CardHeader className="bg-muted/30 pb-4"><CardTitle className="text-sm font-bold uppercase tracking-wider">Student Listing</CardTitle></CardHeader>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-bold tracking-widest border-b">
                      <tr><th className="px-6 py-4">Roll</th><th className="px-6 py-4">Full Name</th><th className="px-6 py-4">Gender</th><th className="px-6 py-4 text-right">Details</th></tr>
                    </thead>
                    <tbody className="divide-y">
                      {students.map((student: any, i: number) => (
                        <tr key={student.id || student.registrationId || i} className="hover:bg-muted/20 transition-colors group">
                          <td className="px-6 py-4 font-bold">{student.classRoll}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8"><AvatarImage src={student.profileImage} /><AvatarFallback>{student.nameEn.charAt(0)}</AvatarFallback></Avatar>
                              <div><p className="font-semibold">{student.nameEn}</p><p className="text-[10px] text-muted-foreground uppercase">{student.registrationId}</p></div>
                            </div>
                          </td>
                          <td className="px-6 py-4 capitalize"><Badge variant="outline" className={student.gender === "MALE" ? "text-blue-500" : "text-pink-500"}>{student.gender.toLowerCase()}</Badge></td>
                          <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" onClick={() => setSelectedStudent(student)}><ArrowRight className="h-4 w-4" /></Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Class Notices</h3>
              </div>
              <div className="space-y-3">
                {classData.notices?.length > 0 ? (
                  classData.notices?.map((item: any, i: number) => {
                    const notice = item.notice;
                    return (
                      <Card key={notice.id || notice.title || i} className="border bg-card/50 hover:border-primary/50 transition cursor-pointer group" onClick={() => setSelectedNotice(notice)}>
                        <CardHeader className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-primary uppercase">{notice.type}</p>
                              <CardTitle className="text-sm line-clamp-1">{notice.title}</CardTitle>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition" />
                          </div>
                        </CardHeader>
                      </Card>
                    );
                  })
                ) : (
                  <div className="p-10 border border-dashed rounded-xl text-center text-muted-foreground italic text-xs">No active notices.</div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold">Departmental Faculty</h3>
          <p className="text-sm text-muted-foreground">You are currently focused on subject instruction for this session.</p>
        </Card>
      )}
    </div>
  );
};

export default TeacherDashboardInfo;
