
export interface IClass {
  id: string;
  name: string;
}

export interface IAcademicLevel {
  id: string;
  name: string;
  description?: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  classes?: IClass[];
}