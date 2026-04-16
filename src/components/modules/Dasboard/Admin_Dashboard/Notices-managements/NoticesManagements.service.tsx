"use client"

import DataTable from "@/components/shared/table/DataTable"
import { getAllNotice } from "@/services/admin-srever-action/notices-managements"
import { useQuery } from "@tanstack/react-query"
import { noticesColumns } from "./noticesColumns"
import { INoticeData } from "@/types/Dashboard/admin-dashboard-types/noteces-managment.types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Megaphone } from "lucide-react"
import CreateNoticeModal from "./CreateNoticeModal"
import ViewNoticeModal from "./ViewNoticeModal"
import DeleteNoticeModal from "./DeleteNoticeModal"

const NoticesManagements = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedNotice, setSelectedNotice] = useState<INoticeData | null>(null)

    const { data: noticeResponse, isLoading, refetch } = useQuery({
        queryKey: ["notices"],
        queryFn: getAllNotice
    })

    const { data: notices = [] } = noticeResponse || {}

    const handleView = (data: INoticeData) => {
        setSelectedNotice(data)
        setIsViewModalOpen(true)
    }

    const handleDelete = (data: INoticeData) => {
        setSelectedNotice(data)
        setIsDeleteModalOpen(true)
    }

    return (
        <div className="space-y-6 p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background p-6 rounded-[2rem] border shadow-sm text-left">
                <div className="space-y-1 text-left">
                    <h1 className="text-3xl font-black tracking-tight text-primary flex items-center gap-3">
                        <Megaphone className="h-8 w-8" />
                        Bulletin Board
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest pl-1">Broadcast important updates and school news</p>
                </div>

                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                    <Plus className="h-5 w-5" />
                    CREATE NEW NOTICE
                </Button>
            </div>

            <DataTable
                data={notices}
                columns={noticesColumns}
                isLoading={isLoading}
                emptyMessage="The bulletin board is currently empty."
                actions={
                    {
                        onView: handleView,
                        onDelete: handleDelete
                    }
                }
            />

            <CreateNoticeModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                refetch={refetch}
            />

            <ViewNoticeModal
                open={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
                notice={selectedNotice}
            />

            <DeleteNoticeModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                notice={selectedNotice}
                refetch={refetch}
            />
        </div>
    )
}

export default NoticesManagements 