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
import {
  reportColumns,
  reportParams,
  reportRoles,
  reports,
  roles,
} from "@prisma/client";
import axios from "axios";
import {
  BarChartBig,
  Binary,
  Calendar,
  Check,
  ChevronRight,
  DollarSign,
  Expand,
  Home,
  LayoutList,
  ListChecks,
  Plus,
  Trash,
  WrapText,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useReportRoleModal } from "@/hooks/use-report-role-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FeildClientProps {
  report: reports | null;
  reportRoles: reportRoles[];
  roles: roles[];
  reportColumns: reportColumns[];
  reportParams: reportParams[];
}

const formSchema = z.object({
  code: z.string().min(1),
});

export const FieldClient: React.FC<FeildClientProps> = ({
  report,
  reportRoles,
  roles,
  reportColumns,
  reportParams,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalUse = useModal();
  const columnModal = useColumnModal();
  const reportRoleModal = useReportRoleModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [repColumns, setRepColumns] = useState(reportColumns);

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
        // form.reset();
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

  //delete role report
  const onDeleteRoleReport = async (id: string) => {
    var colms = reportColumns.filter((item) => item.report_role_id === id);
    // if (colms.length > 0) {
    //   toast.error("This role contain colums ready!");
    // } else {

    // }

    const toastId = toast.loading("Loading...");
    try {
      const response = await axios.delete(`/api/report-roles/${id}`);
      if (response) {
        router.refresh();
        toast.success("Report role deleted.", {
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setRepColumns(reportColumns);
  }, [reportColumns]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reportRole = repColumns.filter(
      (item) => item.id === result.draggableId
    );
    const items = Array.from(
      repColumns.filter(
        (itm) => itm.report_role_id === reportRole[0]["report_role_id"]
      )
    );

    const [reorderItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updateColumns = items.slice(startIndex, endIndex + 1);
    setRepColumns(items);

    const bulkUpdatData = updateColumns.map((col) => ({
      id: col.id,
      ordering: items.findIndex((item) => item.id === col.id),
    }));

    onReorder(bulkUpdatData);
  };

  const onReorder = async (
    updateData: {
      id: string;
      ordering: number;
    }[]
  ) => {
    const toastId = toast.loading("Loading...");

    try {
      await axios.put(`/api/report-columns/${report?.id}/columns/reorder/`, {
        list: updateData,
      });

      toast.success("Report column reordered.", {
        id: toastId,
      });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
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
                <span className="text-[11px]">Category</span>
              </div>
              <div className="p-2 rounded-md  border border-slate-200">
                <span className="text-xs text-gray-600 font-medium capitalize">
                  {report?.category}
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
                <h4 className="text-sm font-medium text-gray-600">Role</h4>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => reportRoleModal.onOpen(report?.id)}
                  className="w-6 h-6"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="px-5 pt-3">
                {reportRoles.map((item) => (
                  <div className="flex items-start justify-start" key={item.id}>
                    <Button
                      variant="outline"
                      onClick={() => onDeleteRoleReport(item.id)}
                      className="p-1 text-gray-600 mr-2 border-none shadow-none hover:text-red-500 hover:bg-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Button>
                    <Accordion className="w-full" type="single" collapsible>
                      <AccordionItem value={item.id}>
                        <AccordionTrigger className="py-2">
                          <div className="text-[10px]">{item.role["name"]}</div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-0">
                          <div>
                            <DragDropContext onDragEnd={onDragEnd}>
                              <Droppable droppableId="reportCols">
                                {(provided) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {repColumns
                                      .filter(
                                        (reCol) =>
                                          reCol.report_role_id === item.id
                                      )
                                      .map((col, index) => (
                                        <Draggable
                                          key={col.id}
                                          draggableId={col.id}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <div
                                              className="flex justify-between items-center p-1.5 px-2 rounded border border-blue-100 bg-blue-50 my-2"
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                            >
                                              <div className="flex items-center">
                                                <div
                                                  className="pr-2 text-gray-500 hover:text-blue-400 border-r border-r-gray-400 mr-2"
                                                  {...provided.dragHandleProps}
                                                >
                                                  <Expand className="w-3.5 h-3.5" />
                                                </div>
                                                <div className="text-[10px] font-medium text-gray-500 flex items-center mr-2">
                                                  <div>
                                                    {iconType(col.type)}
                                                  </div>
                                                </div>
                                                <div className="text-[10px] font-medium flex items-center mr-2">
                                                  <div>
                                                    {col.display} ( {col.name} )
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="flex items-center justify-between w-5">
                                                <Button
                                                  disabled={loading}
                                                  type="button"
                                                  onClick={() =>
                                                    onDeleteColumn(col.id)
                                                  }
                                                  size="icon"
                                                  variant="ghost"
                                                  className="w-4 h-4 text-gray-500"
                                                >
                                                  <Trash className="w-3 h-3" />
                                                </Button>
                                              </div>
                                            </div>
                                          )}
                                        </Draggable>
                                      ))}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </DragDropContext>
                            <div className="rounded">
                              {!repColumns.length ? (
                                <div className="flex justify-center items-center mb-2">
                                  <h4 className="text-xs text-gray-400">
                                    No columns
                                  </h4>
                                </div>
                              ) : (
                                ""
                              )}

                              <div className="flex justify-center mt-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => columnModal.onOpen(item.id)}
                                  className=" shadow-none rounded-sm text-[8px] bg-white p-2 hover:bg-white hover:text-blue-500"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-3 h-3"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 6v12m6-6H6"
                                    />
                                  </svg>

                                  <span>Create Column</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </div>
              {/* <div className="px-5 pt-3">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="reportCols">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {repColumns.map((col, index) => (
                          <Draggable
                            key={col.id}
                            draggableId={col.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="flex justify-between items-center p-1.5 px-2 rounded border border-blue-100 bg-blue-50 my-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div className="flex items-center">
                                  <div
                                    className="pr-2 text-gray-500 hover:text-blue-400 border-r border-r-gray-400 mr-2"
                                    {...provided.dragHandleProps}
                                  >
                                    <Expand className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="text-[10px] font-medium text-gray-500 flex items-center mr-2">
                                    <div>{iconType(col.type)}</div>
                                  </div>
                                  <div className="text-[10px] font-medium flex items-center mr-2">
                                    <div>
                                      {col.display} ( {col.name} )
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between w-5">
                                  <Button
                                    disabled={loading}
                                    type="button"
                                    onClick={() => onDeleteColumn(col.id)}
                                    size="icon"
                                    variant="ghost"
                                    className="w-4 h-4 text-gray-500"
                                  >
                                    <Trash className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                
              </div> */}
              {!reportRoles.length ? (
                <div className="flex justify-center items-center mt-3">
                  <h4 className="text-xs text-gray-400">No role assign</h4>
                </div>
              ) : (
                ""
              )}

              <div className="py-3 px-5 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => reportRoleModal.onOpen(report?.id)}
                  className=" shadow-none rounded-sm"
                >
                  Assign Role
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
