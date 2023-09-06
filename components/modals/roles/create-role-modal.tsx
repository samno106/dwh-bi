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
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRoleModal } from "@/hooks/use-role-modal";

const formSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
});

export const CreateRoleModal = () => {
  const router = useRouter();

  const roleModal = useRoleModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/roles", values);

      if (response) {
        router.refresh();
        roleModal.onClose();
        toast.success("Role created.");
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
      title="Create Role"
      description=""
      isOpen={roleModal.isOpen}
      onClose={roleModal.onClose}
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
                  onClick={() => roleModal.onClose()}
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
