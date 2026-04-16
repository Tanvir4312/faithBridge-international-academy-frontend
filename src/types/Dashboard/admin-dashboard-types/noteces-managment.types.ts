
export enum NoticeType {
 GENERAL = "GENERAL",
 CLASS_SPECIFIC = "CLASS_SPECIFIC"
}

export interface INoticeData {
 id: string;
 title: string;
 details?: string;
 type: NoticeType;
 createdAt: string;
 authorId: string;
 noticeClasses: { 
    class: { 
        id: string;
        name: string 
    } 
 }[];
}

export interface ICreateNoticesPayload {
    title: string;
    details?: string;
    type: "GENERAL" | "CLASS_SPECIFIC";
    noticeClasses?: string[];
}
