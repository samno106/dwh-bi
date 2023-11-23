import Link from "next/link";
import WdScriptClient from "./components/client";
import { BarChartBig, ChevronRight, Home } from "lucide-react";
import prismadb from "@/lib/prismadb";

const WidgetTemplatePage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const widgets = await prismadb.widgets.findUnique({
    where: {
      id: params.id,
    },
  });

  const widgetParams = await prismadb.widgetParams.findMany({
    where: {
      widget_id: params.id,
    },
  });

  const widgetLabels = await prismadb.widgetDisplays.findMany({
    where: {
      widget_id: params.id,
    },
  });

  const widgetRoles = await prismadb.widgetRoles.findMany({
    where: {
      widget_id: params.id,
    },
    include: {
      role: true,
    },
  });

  return (
    <div className="px-10 py-10 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-gray-700">
          Widget Script & Params
        </h1>

        <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-gray-600 dark:text-gray-200">
            <Home className="w-4 h-4" />
          </Link>

          <span className="mx-3 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
            <ChevronRight className="w-4 h-4" />
          </span>

          <Link
            href="/widget-template"
            className="flex items-center text-gray-600 -px-2 dark:text-gray-200 hover:underline"
          >
            <BarChartBig className="w-4 h-4" />
            <span className="mx-2 text-xs">Widget Tamplates</span>
          </Link>

          <span className="mx-3 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
            <ChevronRight className="w-4 h-4" />
          </span>

          <Link
            href="#"
            className="flex items-center text-blue-600 -px-2 dark:text-blue-400 hover:underline"
          >
            <span className="mx-2 text-xs">Script</span>
          </Link>
        </div>
      </div>
      <WdScriptClient
        id={params.id}
        data={widgets}
        widgetParams={widgetParams}
        widgetLabels={widgetLabels}
        widgetRoles={widgetRoles}
      />
    </div>
  );
};

export default WidgetTemplatePage;
