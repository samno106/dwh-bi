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
import {
  Binary,
  Calendar,
  DollarSign,
  LayoutList,
  WrapText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal";
import { useWidgetParamModal } from "@/hooks/use-widget-param-modal";
import { useWidgetLabelModal } from "@/hooks/use-widget-label-modal";

const formSchema = z.object({
  display: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1),
  widget_id: z.string(),
});

export const CreateWidgetLabelModal = () => {
  const params = useParams();
  const router = useRouter();

  const modalUse = useWidgetLabelModal();

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display: "",
      name: "",
      type: "text",
      widget_id: `${params.id}`,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Loading...");

    try {
      setLoading(true);
      values.type = type;
      values.widget_id = `${params.id}`;
      const response = await axios.post(
        `/api/widget-labels/${params.id}`,
        values
      );

      if (response) {
        router.refresh();
        modalUse.onClose();
        toast.success("Report label created.", {
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
      title="Create Label"
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
                name="display"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-xs">Display</FormLabel>
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
