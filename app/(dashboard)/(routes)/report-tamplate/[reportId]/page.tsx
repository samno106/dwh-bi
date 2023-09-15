import prismadb from "@/lib/prismadb";
import FieldClient from "./components/client";

export const ReportTamplatePage = async ({
  params,
}: {
  params: {
    reportId: string;
  };
}) => {
  const report = await prismadb.reports.findUnique({
    include: {
      role: true,
    },
    where: {
      id: params.reportId,
    },
  });

  const role = await prismadb.roles.findUnique({
    where: {
      id: report?.role_id,
    },
  });

  const reportColumns = await prismadb.reportColumns.findMany({
    where: {
      report_id: params.reportId,
    },
    orderBy: {
      ordering: "asc",
    },
  });

  const reportParams = await prismadb.reportParams.findMany({
    where: {
      report_id: params.reportId,
    },
  });

  return (
    <div className="px-10 py-10 min-h-screen">
      <FieldClient
        report={report}
        role={role}
        reportColumns={reportColumns}
        reportParams={reportParams}
      />
    </div>
  );
};

export default ReportTamplatePage;
