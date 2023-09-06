"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Modal } from "../../ui/modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PositionColumn } from "@/app/(dashboard)/positions/components/columns";

interface UpdatePositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PositionColumn;
}

const formSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
});

export const UpdatePositionModal: React.FC<UpdatePositionModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      code: data.code,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.patch(`/api/positions/${data.id}`, values);

      if (response) {
        router.refresh();
        onClose.call(false);
        toast.success("Position updated.");
        form.reset();
      }
    } catch (error) {
      toast.error("Internal server erorr.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Udpate Position"
      description=""
      isOpen={isOpen}
      onClose={onClose}
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
                name="code"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-xs">Code</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="code"
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
                  disabled={loading}
                  variant={"outline"}
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Save Change
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
