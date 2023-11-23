"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Modal } from "../../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReportRoleModal } from "@/hooks/use-report-role-modal";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  report_id: z.string().min(1),
  role_id: z.string().min(1),
});

export const CreatReportRoleModal = () => {
  const router = useRouter();

  const reportRoleModal = useReportRoleModal();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const getRoles = async () => {
    try {
      await axios.get("/api/roles").then((data) => {
        setRoles(data.data);
      });
    } catch (error) {}
  };

  const getColumns = async () => {
    console.log(reportRoleModal.reportId);
    await axios
      .get(`/api/report-roles/query/${reportRoleModal.reportId}`)
      .then((data) => {
        console.log(data.data);
      });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      report_id: "0",
      role_id: "0",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const columns = await axios
        .get(`/api/report-roles/query/${reportRoleModal.reportId}`)
        .then((data) => {
          if (data.data) {
            return data.data.reportColumns;
          } else {
            return null;
          }
        });

      values.report_id = reportRoleModal.reportId;

      if (columns != null) {
        const toastId = toast.loading("Loading...");

        setLoading(true);

        console.log(columns);

        const response = await axios.post("/api/report-roles", values);

        if (response) {
          const data = columns.map((item: any) => ({
            display: item.display,
            name: item.name,
            type: item.type,
            report_role_id: response.data.id,
            ordering: item.item,
          }));

          const res = await axios.post(
            `/api/report-columns/clone/${response.data.id}`,
            data
          );

          if (res) {
            router.refresh();
            reportRoleModal.onClose();
            toast.success("Role assigned.", {
              id: toastId,
            });
            form.reset();
          }
        }
      } else {
        const toastId = toast.loading("Loading...");

        setLoading(true);
        const response = await axios.post("/api/report-roles", values);
        if (response) {
          router.refresh();
          reportRoleModal.onClose();
          toast.success("Role assigned.", {
            id: toastId,
          });
          form.reset();
        }
      }
    } catch (error) {
      toast.error("Internal server erorr.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Modal
      title="Assign Role"
      description=""
      isOpen={reportRoleModal.isOpen}
      onClose={reportRoleModal.onClose}
      size="w-[500px]"
    >
      <div>
        <div className="space-y-4 py-2 pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="role_id"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-[11px]">Role</FormLabel>
                    <Select
                      name="role_id"
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full shadow-none rounded py-5 text-xs">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className="h-[250px]">
                          <SelectItem value="0">Select category</SelectItem>

                          {roles.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-x-2 pt-6 flex items-center justify-end">
                <Button
                  type="button"
                  disabled={loading}
                  variant={"outline"}
                  onClick={() => reportRoleModal.onClose()}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Assign
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
