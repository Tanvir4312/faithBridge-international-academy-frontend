export interface IClass {
 id: string;
 name: string;
 section: string;
 classTeacher: {
  teacher: {
   name: string;
  }
 };
 students: string[]
}