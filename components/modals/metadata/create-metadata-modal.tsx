"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMetdataModal } from "@/hooks/use-metadata-mdal";

const formSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  type: z.string().min(1),
});

export const CreateMetadataModal = () => {
  const router = useRouter();

  const modalUse = useMetdataModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      value: "",
      type: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Loading...");

    try {
      setLoading(true);
      const response = await axios.post(`/api/metadatas/`, values);

      if (response) {
        router.refresh();
        modalUse.onClose();
        toast.success("Report metadata created.", {
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

  return (
    <Modal
      title="Create Metadata"
      description=""
      isOpen={modalUse.isOpen}
      onClose={modalUse.onClose}
      size="w-[600px]"
    >
      <div>
        <div className="space-y-4 py-2 pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-xs">Label</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="display"
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
                name="value"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-xs">Value</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="value"
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
                    <FormLabel className="text-xs">Type (param name)</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="type"
                        {...field}
                        className="shadow-none py-5 rounded"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-x-2 pt-6 flex items-center justify-end">
                <Button
                  type="button"
                  disabled={loading}
                  variant={"outline"}
                  onClick={() => modalUse.onClose()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
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
