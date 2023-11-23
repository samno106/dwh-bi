"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  widgetDisplays,
  widgetParams,
  widgetRoles,
  widgets,
} from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Binary,
  Calendar,
  Check,
  DollarSign,
  LayoutList,
  Plus,
  Trash,
  WrapText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useWidgetParamModal } from "@/hooks/use-widget-param-modal";
import { useWidgetLabelModal } from "@/hooks/use-widget-label-modal";
import { useWidgetRoleModal } from "@/hooks/use-widget-role-modal";

interface WdScriptClientProps {
  id: string;
  data: widgets | null;
  widgetParams: widgetParams[];
  widgetLabels: widgetDisplays[];
  widgetRoles: widgetRoles[];
}

const formSchema = z.object({
  code: z.string().min(1),
});

export const WdScriptClient: React.FC<WdScriptClientProps> = ({
  id,
  data,
  widgetParams,
  widgetLabels,
  widgetRoles,
}) => {
  const [widget, setWidget] = useState<widgets>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const modalUse = useWidgetParamModal();
  const modalLabel = useWidgetLabelModal();
  const widgetRoleModal = useWidgetRoleModal();

  const iconType = (item: string) => {
    if (item === "text") {
      return <WrapText className="w-4 h-4" />;
    }

    if (item === "int") {
      return <Binary className="w-4 h-4" />;
    }

    if (item === "float") {
      return <DollarSign className="w-4 h-4" />;
    }

    if (item === "date") {
      return <Calendar className="w-4 h-4" />;
    }

    if (item === "select") {
      return <LayoutList className="w-4 h-4" />;
    }
  };

  const getWdigetById = async () => {
    await axios.get(`/api/widgets/query/${id}`).then((data) => {
      console.log(data.data);
      setWidget(data.data);
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: `${data?.code || null}`,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const toastId = toast.loading("Loading...");
      setLoading(true);
      const response = await axios.patch(
        `/api/widgets/query/${widget?.id}`,
        values
      );

      if (response) {
        router.refresh();
        toast.success("Widget query created", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Internal server erorr.");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteParam = async (id: string) => {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      const response = await axios.delete(`/api/widget-params/${id}`);
      if (response) {
        router.refresh();
        toast.success("Widget param deleted.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Internal server erorr.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const onDeleteRole = async (id: string) => {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      const response = await axios.delete(`/api/widget-role/${id}`);
      if (response) {
        router.refresh();
        toast.success("Widget role deleted.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Internal server erorr.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWdigetById();
  }, []);

  return (
    <div>
      <div className="bg-white px-4 rounded-lg mt-5">
        <div className="overflow-x-auto py-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="relative">
              <div className="text-[11px] text-gray-400 py-1 px-1.5 absolute bg-white left-2 -top-3">
                Name
              </div>
              <div className="p-2 rounded-md  border border-slate-200">
                <span className="text-xs text-gray-600 font-medium">
                  {data?.name}
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="text-xs text-gray-400 py-1 px-1.5 absolute bg-white left-2 -top-3">
                <span className="text-[11px]">Type</span>
              </div>
              <div className="p-2 rounded-md  border border-slate-200">
                <span className="text-xs text-gray-600 font-medium capitalize">
                  {data?.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-sm font-semibold text-gray-700 mt-8">SQL Query</h1>

      <div className="bg-white px-4 rounded-lg mt-5">
        <div className=" py-5 m-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Pass your sql query here..."
                        className="h-44"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex">
                <Button
                  type="submit"
                  disabled={loading}
                  size="icon"
                  className="rounded-full ml-auto"
                >
                  <Check className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="mt-5 p-5 rounded-md bg-white">
          <div className="rounded-lg bg-white ">
            <div className="flex justify-between items-center border-b px-5 py-2">
              <h4 className="text-sm font-medium text-gray-600">Role</h4>
              <Button
                onClick={() => widgetRoleModal.onOpen(id)}
                size="icon"
                variant="ghost"
                className="w-6 h-6"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-5 pt-3">
              {widgetRoles.map((item) => (
                <div
                  key={item.id}
                  className="p-1.5 px-2 rounded border border-blue-100 bg-blue-50 my-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                      <div className="text-[10px] font-medium flex items-center mr-2">
                        <div>{item.role["name"]}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-5">
                      <Button
                        disabled={loading}
                        type="button"
                        onClick={() => onDeleteRole(item.id)}
                        size="icon"
                        variant="ghost"
                        className="w-4 h-4 text-gray-500"
                      >
                        <Trash className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!widgetRoles.length ? (
              <div className="flex justify-center items-center mt-3">
                <h4 className="text-xs text-gray-400">No role assign</h4>
              </div>
            ) : (
              ""
            )}
            <div className="py-3 px-5 flex justify-end">
              <Button
                onClick={() => widgetRoleModal.onOpen(id)}
                size="sm"
                variant="outline"
                className=" shadow-none rounded-sm"
              >
                Assign Role
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-5 p-5 rounded-md bg-white">
          <div className="rounded-lg bg-white ">
            <div className="flex justify-between items-center border-b px-5 py-2">
              <h4 className="text-sm font-medium text-gray-600">Params</h4>
              <Button
                onClick={() => modalUse.onOpen()}
                size="icon"
                variant="ghost"
                className="w-6 h-6"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-5 pt-3">
              {widgetParams.map((item) => (
                <div
                  key={item.id}
                  className="p-1.5 px-2 rounded border border-blue-100 bg-blue-50 my-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                      <div className="text-[10px] font-medium text-gray-500 flex items-center mr-2">
                        <div>{iconType(item.type)}</div>
                      </div>
                      <div className="text-[10px] font-medium flex items-center mr-2">
                        <div>
                          {item.display} ( {item.name} )
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-5">
                      <Button
                        disabled={loading}
                        type="button"
                        onClick={() => onDeleteParam(item.id)}
                        size="icon"
                        variant="ghost"
                        className="w-4 h-4 text-gray-500"
                      >
                        <Trash className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-3 px-5 flex justify-end">
              <Button
                onClick={() => modalUse.onOpen()}
                size="sm"
                variant="outline"
                className=" shadow-none rounded-sm"
              >
                Create Param
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WdScriptClient;
