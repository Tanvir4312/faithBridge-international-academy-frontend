
export interface IClass {
 id: string;
 name: string;
}

export interface IAcademicLevel {
 id: string;
 name: string;
 image: string;
 createdAt: string;
 classes: IClass[]

}