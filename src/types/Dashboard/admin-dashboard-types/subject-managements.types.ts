export interface ITeacherSubject {
 teacher: {
  id: string;
  name: string;
  email: string
  profilePhoto: string
  contactNumber: string
  createdAt: string
 }
}

export interface ISubject {
 id: string;
 name: string;
 teacherSubjects: ITeacherSubject[];
}

