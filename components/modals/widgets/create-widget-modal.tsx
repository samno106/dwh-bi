"use client";
import { Modal } from "@/components/ui/modal";
import { useWidgetModal } from "@/hooks/use-widget-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { metaDatas } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
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

const formSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  position: z.string().min(1),
});

export const CreateWidgetModal = () => {
  const router = useRouter();
  const useModals = useWidgetModal();
  const [types, setTypes] = useState<metaDatas[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "0",
      position: "0",
    },
  });

  const getTypes = async () => {
    await axios.get(`/api/metadatas/type/${"widget"}`).then((data) => {
      setTypes(data.data);
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const toastId = toast.loading("Loading...");

      setLoading(true);

      const response = await axios.post("/api/widgets", values);

      if (response) {
        // router.push(`/report-tamplate/${response.data.id}`);
        router.refresh();
        useModals.onClose();
        toast.success("Widget created.", {
          id: toastId,
        });
        form.reset();
        window.location.reload();
      }
    } catch (error) {
      toast.error("Internal server erorr.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <Modal
      title="Create Widget"
      description=""
      isOpen={useModals.isOpen}
      onClose={useModals.onClose}
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
                name="type"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-[11px]">Type </FormLabel>
                    <Select
                      name="type"
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
                        <ScrollArea className="h-[150px]">
                          <SelectItem value="0">Select type</SelectItem>

                          {types.map((item) => (
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

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-[11px]">Postion </FormLabel>
                    <Select
                      name="position"
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full shadow-none rounded py-5 text-xs">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className="h-[150px]">
                          <SelectItem value="0">Select position</SelectItem>
                          <SelectItem value="1">Top</SelectItem>
                          <SelectItem value="2">Bottom</SelectItem>
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
                  onClick={() => useModals.onClose()}
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
