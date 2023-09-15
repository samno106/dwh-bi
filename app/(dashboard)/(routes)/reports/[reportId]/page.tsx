import prismadb from "@/lib/prismadb";
import ReportClient from "./components/client";

const ReportPage = async ({
  params,
}: {
  params: {
    reportId: string;
  };
}) => {
  const report = await prismadb.reports.findUnique({
    include: {
      columns: {
        orderBy: {
          ordering: "asc",
        },
      },
      params: true,
    },
    where: {
      id: `${params.reportId}`,
    },
  });
  return (
    <div className="px-10 py-10 min-h-screen">
      <ReportClient report={report} reportColumns={report!.columns} />
    </div>
  );
};

export default ReportPage;
