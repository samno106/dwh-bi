"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { departments, positions, roles, users } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { getHash } from "@/lib/hash-password";

const formSchema = z.object({
  full_name: z.string().min(1),
  staff_id: z.string().min(1),
  username: z.string().min(4),
  password: z.string().min(6),
  department_id: z.string().min(1),
  position_id: z.string().min(1),
  role_id: z.string().min(1),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  initailData: users | null;
  departments: departments[];
  positions: positions[];
  roles: roles[];
}

export const UserForm: React.FC<UserFormProps> = ({
  initailData,
  departments,
  positions,
  roles,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formTitle = initailData ? "Update User Form" : "Create User Form";
  const toasMessage = initailData ? "User updated." : "User created.";
  const button = initailData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initailData || {
      full_name: "",
      staff_id: "",
      username: "",
      password: "123cpbank!",
      department_id: "0",
      position_id: "0",
      role_id: "0",
    },
  });

  const onSubmit = async (values: UserFormValues) => {
    const toastId = toast.loading("Loading...");

    try {
      setLoading(true);
      if (initailData) {
        await axios.patch(`/api/users/${params.userId}`, values);
        router.push("/users");
        toast.success(toasMessage, {
          id: toastId,
        });
      } else {
        values.password = getHash(values.password);
        await axios.post("/api/users", values);
        values.department_id = "0";
        values.position_id = "0";
        values.role_id = "0";
        form.reset();
        toast.success(toasMessage, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.success("Internal server erorr.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 px-6 rounded-lg mt-5">
      <div className="py-2 flex justify-start items-center">
        <span className="text-gray-600 font-semibold px-2 text-sm">
          {formTitle}
        </span>
      </div>
      <div className="px-2 mt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel htmlFor="full_name" className="text-[11px]">
                      Fullname
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="full_name"
                        disabled={loading}
                        placeholder="Fullname"
                        {...field}
                        className="shadow-none py-5 rounded text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="staff_id"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel htmlFor="staff_id" className="text-[11px]">
                      Staff ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="staff_id"
                        disabled={loading}
                        placeholder="Staff ID"
                        {...field}
                        className="shadow-none py-5 rounded text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel htmlFor="username" className="text-[11px]">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        disabled={loading}
                        placeholder="Fullname"
                        {...field}
                        className="shadow-none py-5 rounded text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-[11px]">Department</FormLabel>
                    <Select
                      name="department_id"
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full shadow-none rounded py-5 text-xs">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Select Department</SelectItem>
                        {departments.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position_id"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-[11px]">Position</FormLabel>
                    <Select
                      name="position_id"
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full shadow-none rounded py-5 text-xs">
                          <SelectValue placeholder="Select Position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Select Position</SelectItem>
                        {positions.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        <SelectItem value="0">Select Role</SelectItem>

                        {roles.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-x-2 pt-6 flex items-center justify-end">
              <Button
                type="button"
                disabled={loading}
                variant={"outline"}
                onClick={() => router.push("/users")}
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
              >
                {button}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
