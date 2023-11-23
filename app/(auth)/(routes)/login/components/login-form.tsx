"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, KeyRound, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { API_END_POINT, TOKEN_COOKIES } from "@/constant/api-end-point";
import { setId, setToken } from "@/lib/init-token";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      values.username = values.username.replaceAll(" ", "").toLowerCase();
      await axios
        .post(`${process.env.API_URL + "" + API_END_POINT.AUTH}`, values)
        .then(({ data }) => {
          if (data.status.code == 200) {
            setToken(data.data.jwttoken);
            setId(data.data.id);
            if (data.data.department_id != "null") {
              router.push("/");
            } else {
              router.push("/personal-info");
            }

            toast.success("You're login success.", {
              id: toastId,
            });

            return data.data.jwttoken;
          } else if (data.status.code == 401) {
            toast.error("username or password is incorrect", {
              id: toastId,
            });
          }
        });
    } catch (error) {
      toast.error("Internal server error.", {
        id: toastId,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium leading-6 text-gray-600">
                  Username
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="w-4 h-4 absolute top-3 left-2 text-gray-500" />
                    <Input
                      disabled={loading}
                      placeholder="Username"
                      {...field}
                      className="rounded py-5 pl-9 border-gray-300 text-xs"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel className="text-xs font-medium leading-6 text-gray-600">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute top-3 left-2 text-gray-500" />
                    <Input
                      type="password"
                      disabled={loading}
                      placeholder="Password"
                      {...field}
                      className="rounded py-5 pl-9 border-gray-300 text-xs"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-8 flex">
            <Button
              type="submit"
              disabled={loading}
              size="icon"
              className="ml-auto rounded-full w-11 h-11"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
