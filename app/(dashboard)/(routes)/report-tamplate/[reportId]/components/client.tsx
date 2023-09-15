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
import { Textarea } from "@/components/ui/textarea";
import { useColumnModal } from "@/hooks/use-column-modal";
import { useModal } from "@/hooks/use-modal";
import { reportColumns, reportParams, reports, roles } from "@prisma/client";
import axios from "axios";
import {
  BarChartBig,
  Binary,
  Calendar,
  Check,
  ChevronRight,
  DollarSign,
  Home,
  Plus,
  Trash,
  WrapText,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

interface FeildClientProps {
  report: reports | null;
  role: roles | null;
  reportColumns: reportColumns[];
  reportParams: reportParams[];
}

const formSchema = z.object({
  code: z.string().min(1),
});

export const FieldClient: React.FC<FeildClientProps> = ({
  report,
  role,
  reportColumns,
  reportParams,
}) => {
  const modalUse = useModal();
  const columnModal = useColumnModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: `${report?.code}`,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const toastId = toast.loading("Loading...");

      setLoading(true);

      const response = await axios.patch(
        `/api/reports/query/${report?.id}`,
        values
      );

      if (response) {
        router.refresh();
        form.reset();
        toast.success("Report query created", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Internal server erorr.");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteColumn = async (id: string) => {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      const response = await axios.delete(`/api/report-columns/columns/${id}`);
      if (response) {
        router.refresh();
        toast.success("Report column deleted.", {
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

  const onDeleteParam = async (id: string) => {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      const response = await axios.delete(`/api/report-params/params/${id}`);
      if (response) {
        router.refresh();
        toast.success("Report param deleted.", {
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

  return (
    <div>
      <div className="flex justify-between items-center"></div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">
          Report Column & Params
        </h1>

        <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-gray-600 dark:text-gray-200">
            <Home className="w-4 h-4" />
          </Link>

          <span className="mx-3 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
            <ChevronRight className="w-4 h-4" />
          </span>

          <Link
            href="/report-tamplate"
            className="flex items-center text-gray-600 -px-2 dark:text-gray-200 hover:underline"
          >
            <BarChartBig className="w-4 h-4" />
            <span className="mx-2 text-xs">Report Tamplates</span>
          </Link>

          <span className="mx-3 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
            <ChevronRight className="w-4 h-4" />
          </span>

          <Link
            href="#"
            className="flex items-center text-blue-600 -px-2 dark:text-blue-400 hover:underline"
          >
            <span className="mx-2 text-xs">Add Column</span>
          </Link>
        </div>
      </div>

      <div className="bg-white px-4 rounded-lg mt-5">
        <div className="overflow-x-auto py-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="relative">
              <div className="text-[11px] text-gray-400 py-1 px-1.5 absolute bg-white left-2 -top-3">
                Name
              </div>
              <div className="p-2 rounded-md  border border-slate-200">
                <span className="text-xs text-gray-600 font-medium">
                  {report?.name}
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="text-xs text-gray-400 py-1 px-1.5 absolute bg-white left-2 -top-3">
                <span className="text-[11px]">Role</span>
              </div>
              <div className="p-2 rounded-md  border border-slate-200">
                <span className="text-xs text-gray-600 font-medium">
                  {role?.name}
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

      <h1 className="text-sm font-semibold text-gray-700 mt-8">
        Column Sections
      </h1>

      <div className="mt-4">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-2 gap-8">
            <div className="rounded-lg bg-white ">
              <div className="flex justify-between items-center border-b px-5 py-2">
                <h4 className="text-sm font-medium text-gray-600">Columns</h4>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => columnModal.onOpen()}
                  className="w-6 h-6"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="px-5 pt-3">
                {reportColumns.map((item) => (
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
                          onClick={() => onDeleteColumn(item.id)}
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
                  size="sm"
                  variant="outline"
                  onClick={() => columnModal.onOpen()}
                  className=" shadow-none rounded-sm"
                >
                  Create Column
                </Button>
              </div>
            </div>

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
                {reportParams.map((item) => (
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
    </div>
  );
};

export default FieldClient;
