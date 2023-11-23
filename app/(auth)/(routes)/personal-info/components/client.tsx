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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { TOKEN_COOKIES } from "@/constant/api-end-point";
import { getToken } from "@/lib/init-token";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  department_id: z.string().min(1),
  position_id: z.string().min(1),
  role_id: z.string().min(1),
});

type UserFormValues = z.infer<typeof formSchema>;

export const PersonalClient = () => {
  const [user, setUser] = useState<users>();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<departments[]>([]);
  const [positions, setPositions] = useState<positions[]>([]);
  const [roles, setRoles] = useState<roles[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department_id: "0",
      position_id: "0",
      role_id: "0",
    },
  });

  const getUser = async () => {
    const userId = getToken(TOKEN_COOKIES.AUTH_ID);
    await axios.get(`/api/users/${userId}`).then((data) => {
      setUser(data.data);
    });
  };

  const getDepartments = async () => {
    await axios.get(`/api/departments`).then((data) => {
      setDepartments(data.data);
    });
  };

  const getPositions = async () => {
    await axios.get(`/api/positions`).then((data) => {
      setPositions(data.data);
    });
  };

  const getRoles = async () => {
    await axios.get(`/api/roles`).then((data) => {
      setRoles(data.data);
    });
  };

  const onSubmit = async (values: UserFormValues) => {
    const toastId = toast.loading("Loading...");

    try {
      setLoading(true);
      await axios.patch(`/api/users/synce/${user?.id}`, values);
      router.push("/");
      toast.success("Your info has been synced", {
        id: toastId,
      });
    } catch (error) {
      toast.success("Internal server erorr.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    getDepartments();
    getPositions();
    getRoles();
  }, []);

  return (
    <>
      <div className=" mt-5">
        <h3 className="text-md text-gray-500">Welcome , {user?.full_name}</h3>
        <h3 className="mb-5 text-xs font-bold uppercase text-gray-700">
          Fill in infomations
        </h3>

        <div className="mt-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          <ScrollArea className="h-[200px]">
                            <SelectItem value="0">Select Department</SelectItem>
                            {departments.map((item) => (
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
                          <ScrollArea className="h-[200px]">
                            <SelectItem value="0">Select Position</SelectItem>
                            {positions.map((item) => (
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
                          <ScrollArea className="h-[200px]">
                            <SelectItem value="0">Select Role</SelectItem>

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
              </div>
              <div className="space-x-2 pt-6 flex items-center justify-end">
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
