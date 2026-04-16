export interface ITeacherSubject {
 teacher: {
  id: string;
  name: string;
  email: string
  profilePhoto: string
  contactNumber: string
  createdAt: string;
  qualification: string;
  designation: string;
 },
 isPrimary: boolean;
}

export interface ISubject {
 id: string;
 name: string;
 teacherSubjects: ITeacherSubject[];
}

