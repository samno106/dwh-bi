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
import { useReportModal } from "@/hooks/use-report-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
});

export const CreateReportModal = () => {
  const router = useRouter();

  const reportModal = useReportModal();

  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const [categories, setCategories] = useState([
    {
      id: "",
      type: "",
      label: "",
      value: "",
    },
  ]);

  const getRoles = async () => {
    try {
      await axios.get("/api/roles").then((data) => {
        setRoles(data.data);
      });
    } catch (error) {}
  };

  const getGategory = async () => {
    try {
      await axios.get("/api/metadatas/query").then((data) => {
        setCategories(data.data);
      });
    } catch (error) {}
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "0",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const toastId = toast.loading("Loading...");

      setLoading(true);

      const response = await axios.post("/api/reports", values);

      if (response) {
        router.push(`/report-tamplate/${response.data.id}`);
        reportModal.onClose();
        toast.success("Report created.", {
          id: toastId,
        });
        form.reset();
      }
    } catch (error) {
      toast.error("Internal server erorr.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
    getGategory();
  }, []);

  return (
    <Modal
      title="Create Report"
      description=""
      isOpen={reportModal.isOpen}
      onClose={reportModal.onClose}
      size="w-[500px]"
    >
      <div>
        <div className="space-y-4 py-2 pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-xs">Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="name"
                        {...field}
                        className="shadow-none py-5 rounded"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-[11px]">Category </FormLabel>
                    <Select
                      name="category"
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full shadow-none rounded py-5 text-xs">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className="h-[250px]">
                          <SelectItem value="0">Select category</SelectItem>

                          {categories.map((item) => (
                            <SelectItem key={item.id} value={item.value}>
                              {item.label}
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
                  onClick={() => reportModal.onClose()}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
