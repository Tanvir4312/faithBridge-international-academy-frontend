"use client"

import { getAdmissionTimeConfig } from "@/services/admin-srever-action/admission-time-config.service"
import { useQuery } from "@tanstack/react-query"
import { admissionConfigColumns } from "./admissionConfigColumns"
import DataTable from "@/components/shared/table/DataTable"
import { GetAdmissionTimeConfig } from "@/types/Dashboard/admin-dashboard-types/admission-time-config.types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AdmissionConfigModal from "./modals/AdmissionConfigModal"

const AdmissionTimeConfig = () => {
 const [isModalOpen, setIsModalOpen] = useState(false)
 const [selectedConfig, setSelectedConfig] = useState<GetAdmissionTimeConfig | null>(null)

 const { data: admissionTimeConfigResponse, isLoading } = useQuery({
  queryKey: ["admission-config"],
  queryFn: getAdmissionTimeConfig,
 })

 const admissionConfig = admissionTimeConfigResponse?.data || []

 const handleCreate = () => {
  setSelectedConfig(null)
  setIsModalOpen(true)
 }

 const handleUpdate = (data: GetAdmissionTimeConfig) => {
  setSelectedConfig(data)
  setIsModalOpen(true)
 }

 return (
  <div className="space-y-4">
   <DataTable
    data={admissionConfig}
    columns={admissionConfigColumns}
    isLoading={isLoading}
    toolbarAction={
     <Button onClick={handleCreate} className="rounded-xl font-bold">
      <Plus className="w-4 h-4 mr-2" />
      Create Config
     </Button>
    }
    actions={{
     onEdit: handleUpdate
    }}
   />

   <AdmissionConfigModal
    isOpen={isModalOpen}
    onOpenChange={setIsModalOpen}
    configData={selectedConfig}
   />
  </div>
 )
}

export default AdmissionTimeConfig
