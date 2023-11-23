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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWidgetRoleModal } from "@/hooks/use-widget-role-modal";

const formSchema = z.object({
  role_id: z.string().min(1),
});

export const CreatWidgetRoleModal = () => {
  const router = useRouter();
  const widgetRoleModal = useWidgetRoleModal();
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role_id: "0",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/widget-role/${widgetRoleModal.widgetId}`,
        values
      );

      if (response) {
        router.refresh();
        widgetRoleModal.onClose();
        toast.success("Report param created.", {
          id: toastId,
        });
        form.reset();
      }
    } catch (error) {
      toast.error("Internal server erorr.", {
        id: toastId,
      });
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
      isOpen={widgetRoleModal.isOpen}
      onClose={widgetRoleModal.onClose}
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
                  onClick={() => widgetRoleModal.onClose()}
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
