"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

const formSchema = z.object({
  name: z.string().min(1),
  short_name: z.string().min(1),
  code: z.string().min(1),
});

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      short_name: "",
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/departments", values);
      toast.success("Department created.");
    } catch (error) {
      toast.success("Internal server erorr.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" pb-b py-5 flex justify-center items-center">
        <div>Dahshboard Page</div>
      </div>
    </>
  );
};

export default DashboardPage;
