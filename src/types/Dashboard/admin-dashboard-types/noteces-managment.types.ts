enum NoticeType {
 GENERAL = "GENERAL",
 CLASS_SPECIFIC = "CLASS_SPECIFIC"
}

export interface INoticeData {
 id: string;
 title: string;
 type: NoticeType
 createdAt: string;
 noticeClasses: { class: { name: string } }[];
}
