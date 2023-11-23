import prismadb from "@/lib/prismadb";
import FieldClient from "./components/client";

export const ReportTamplatePage = async ({
  params,
}: {
  params: {
    reportId: string;
  };
}) => {
  const report = await prismadb.reports.findFirst({
    include: {
      reportRole: true,
    },
    where: {
      id: params.reportId,
    },
  });

  const reportRoles = await prismadb.reportRoles.findMany({
    include: {
      report: true,
      role: true,
    },
    where: {
      report_id: params.reportId,
    },
  });

  const roles = await prismadb.roles.findMany();

  const reportColumns =
    (await prismadb.reportColumns.findMany({
      orderBy: {
        ordering: "asc",
      },
    })) || [];

  const reportParams =
    (await prismadb.reportParams.findMany({
      where: {
        report_id: params.reportId,
      },
    })) || [];

  return (
    <div className="px-10 py-10 min-h-screen">
      <FieldClient
        report={report}
        reportRoles={reportRoles}
        roles={roles}
        reportColumns={reportColumns}
        reportParams={reportParams}
      />
    </div>
  );
};

export default ReportTamplatePage;
