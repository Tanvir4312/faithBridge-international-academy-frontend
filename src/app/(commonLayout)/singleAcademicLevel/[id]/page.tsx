import { getSingleAcademicLevel } from "@/services/common-server-action/singleAcademicLevel.service";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Info } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client"

const AcademicLevelDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: academicLevel } = await getSingleAcademicLevel(id);

  if (!academicLevel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <Info className="w-12 h-12 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-muted-foreground">Academic Level not found</h2>
          <Button asChild variant="outline">
            <Link href="/">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button asChild variant="ghost" className="mb-8 hover:bg-accent/50 -ml-4 transition-all duration-300">
            <Link href="/">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Overview
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Content (7 cols) */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-4 py-1 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary border-none">
                  Discovery
                </Badge>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-tight uppercase">
                {academicLevel.name}
              </h1>
              
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-full" />
                <div className="pl-8 py-2">
                  <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground/90 font-medium">
                    {academicLevel.description}
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-4"
            >
              <div className="h-px w-24 bg-primary/30" />
            </motion.div>
          </motion.div>

          {/* Right Side: Image (5 cols) */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 via-purple-500/20 to-transparent rounded-[2.5rem] blur-3xl opacity-40" />
              <div className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-card dark:border-zinc-900">
                <Image
                  src={academicLevel.image}
                  alt={academicLevel.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AcademicLevelDetailsPage;
