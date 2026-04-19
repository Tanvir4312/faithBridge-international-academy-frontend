"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getAllMedia } from "@/services/admin-srever-action/all-media.service";
import { AllMediaResponse } from "@/types/Dashboard/admin-dashboard-types/all-media.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { mediaColumns } from "./mediaColumns";
import MediaViewModal from "./MediaViewModal";
import CreateMediaModal from "./CreateMediaModal";
import DeleteMediaModal from "./DeleteMediaModal";

const AllMediaClient = () => {
  const [selectedMedia, setSelectedMedia] = useState<AllMediaResponse | null>(null);
  const [mediaToDelete, setMediaToDelete] = useState<AllMediaResponse | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: allMediaResponse, refetch } = useQuery({
    queryKey: ["all-media"],
    queryFn: getAllMedia,
  });

  const { data: allMedia = [] } = allMediaResponse || {};

  const handleView = (media: AllMediaResponse) => {
    setSelectedMedia(media);
    setIsViewModalOpen(true);
  };

  const handleDelete = (media: AllMediaResponse) => {
    setMediaToDelete(media);
    setIsDeleteModalOpen(true);
  }

  return (
    <div className="space-y-4">
      {/* View Modal */}
      <MediaViewModal
        media={selectedMedia}
        isOpen={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
      />

      {/* Delete Modal */}
      <DeleteMediaModal
        media={mediaToDelete}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Media Management</h1>
        <CreateMediaModal onSuccess={() => refetch()} />
      </div>

      <DataTable
        data={allMedia}
        columns={mediaColumns}
        actions={{ onView: handleView, onDelete: handleDelete }}
      />
    </div>
  );
};

export default AllMediaClient;