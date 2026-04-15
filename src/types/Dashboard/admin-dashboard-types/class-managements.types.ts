export interface IClass {
  id: string;
  name: string;
  section?: string;
  AcademicLevelId: string;
  AcademicLevel?: {
    id: string;
    name: string;
    image: string;
    description: string;
  };
  classTeacher?: {
    teacher: {
      name: string;
    }
  };
  students?: any[]; // Full student objects
  studentHistories?: any[];
  createdAt: string;
  updatedAt: string | null;
  isDeleted: boolean;
}