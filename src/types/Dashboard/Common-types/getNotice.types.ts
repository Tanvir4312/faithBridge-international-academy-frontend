import { NoticeType } from "../admin-dashboard-types/noteces-managment.types";

export interface IGetSingleNoticeData {
 id: string;
 title: string;
 details?: string;
 type: NoticeType;
 createdAt: string;
 authorId: string;

}