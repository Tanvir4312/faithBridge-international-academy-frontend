"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAdmissionTimeConfig, updateAdmissionTimeConfig } from "@/services/admin-srever-action/admission-time-config.service"
import { GetAdmissionTimeConfig } from "@/types/Dashboard/admin-dashboard-types/admission-time-config.types"
import { useEffect } from "react"

const admissionConfigSchema = z.object({
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  isActive: z.boolean(),
  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be a 4-digit number (e.g., 2026)"),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return data.endDate > data.startDate
  }
  return true
}, {
  message: "End date must be after the start date",
  path: ["endDate"],
})

export type TAdmissionConfigForm = z.infer<typeof admissionConfigSchema>

interface AdmissionConfigModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  configData?: GetAdmissionTimeConfig | null
}

export default function AdmissionConfigModal({
  isOpen,
  onOpenChange,
  configData,
}: AdmissionConfigModalProps) {
  const queryClient = useQueryClient()
  const isEditMode = !!configData

  const form = useForm<TAdmissionConfigForm>({
    resolver: zodResolver(admissionConfigSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      isActive: false,
      year: new Date().getFullYear().toString(),
    },
  })

  useEffect(() => {
    if (configData && isOpen) {
      form.reset({
        startDate: new Date(configData.startDate),
        endDate: new Date(configData.endDate),
        isActive: configData.isActive,
        year: configData.year || new Date().getFullYear().toString(),
      })
    } else if (!isEditMode && isOpen) {
      form.reset({
        startDate: undefined as any,
        endDate: undefined as any,
        isActive: false,
        year: new Date().getFullYear().toString(),
      })
    }
  }, [configData, form, isOpen, isEditMode])

  const mutation = useMutation({
    mutationFn: async (values: TAdmissionConfigForm) => {
      const payload = {
        ...values,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
      }
      if (isEditMode && configData?.id) {
        return updateAdmissionTimeConfig(configData.id, payload)
      }
      return createAdmissionTimeConfig(payload)
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message)
        queryClient.invalidateQueries({ queryKey: ["admission-config"] })
        onOpenChange(false)
        form.reset()
      } else {
        toast.error(res.message || "Something went wrong")
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to save admission config")
    },
  })

  const onSubmit = (values: TAdmissionConfigForm) => {
    mutation.mutate(values)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Update" : "Add"} Admission Time Config</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 2026" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value instanceof Date ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value instanceof Date ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Active Status
                    </FormLabel>
                    <FormDescription>
                      Check this to make this admission period active.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : isEditMode ? "Update Config" : "Create Config"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
