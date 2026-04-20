
export interface IExamsData {
 id: string;
 name: string;
 year: string;
 formFillupStart: Date;
 formFillupEnd: Date;
 examDate?: Date;
 createdAt: string;
 formFillupStatus?: string[];
 isDeleted?: boolean;
 formFillups?: IFormFillup[];
}

export interface IFormFillup {
 id: string;
 paymentStatus: string;
 status: string;
 registrationNo: string;
 classRoll: string;
 admitCard?: string;
 student: IStudent;
}

export interface IStudent {
 id: string;
 nameEn: string;
 nameBn?: string;
 registrationId: string;
 profileImage?: string;
 studentMobile?: string;
 guardianMobile?: string;
 gender?: string;
 bloodGroup?: string;
 religion?: string;
 dob?: string;
 presentAddress?: string;
 permanentAddress?: string;
}

export interface IExamCreatePayload {
 name: string;
 year: string;
 formFillupStart: string;
 formFillupEnd: string;
 examDate: string;
}

export interface IExamUpdatePayload {
  name?: string;
  year?: string;
  formFillupStart?: string;
  formFillupEnd?: string;
  examDate?: string;
}