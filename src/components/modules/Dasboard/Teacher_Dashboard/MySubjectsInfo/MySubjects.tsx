"use client";

import { gettAllInfoForTeacher } from "@/services/teacher-server-action/teacher-info.service";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  CheckCircle2,
  Mail,
  User,
  Loader2,
  Layers,
  GraduationCap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MySubjects = ({ teacherId }: { teacherId: string }) => {
  const { data: teacherInfoResponse, isLoading } = useQuery({
    queryKey: ["teacher-info", teacherId],
    queryFn: () => gettAllInfoForTeacher(teacherId),
  });

  const teacherInfo = teacherInfoResponse?.data;

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!teacherInfo) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      
      {/* COMPACT PROFILE HEADER */}
      <section className="relative overflow-hidden rounded-3xl border bg-card/50 backdrop-blur-md shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
        <Avatar className="h-28 w-28 md:h-20 md:w-20 border-2 border-primary/20 shrink-0">
          <AvatarImage src={teacherInfo.profilePhoto} alt={teacherInfo.name} />
          <AvatarFallback className="font-bold bg-primary/10 text-primary uppercase">{teacherInfo.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3 min-w-0 w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight truncate">{teacherInfo.name}</h1>
            <Badge variant="outline" className="text-[10px] uppercase font-black tracking-[0.2em] text-primary border-primary/20 w-fit mx-auto md:mx-0">
              {teacherInfo.designation}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-2 font-medium truncate">
            <Mail className="h-4 w-4 text-primary/60" /> {teacherInfo.email}
          </p>
        </div>
      </section>

      {/* CORE SUBJECT SECTION */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight">Teaching Assignments</h2>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Session 2026 Academic Year</p>
          </div>
        </div>

        {teacherInfo.teacherSubjects?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teacherInfo.teacherSubjects.map((item) => (
              <Card 
                key={item.subject.name} 
                className="group relative overflow-hidden border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-primary/10 group-hover:bg-primary transition-colors" />
                <CardHeader className="relative pb-3">
                  <div className="p-2 bg-primary/10 w-fit rounded-xl mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition">{item.subject.name}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-green-500" /> Primary Instructor
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
            <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold">No Academic Loads</h3>
            <p className="text-sm text-muted-foreground">Your subject assignments for this session will appear here.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MySubjects;