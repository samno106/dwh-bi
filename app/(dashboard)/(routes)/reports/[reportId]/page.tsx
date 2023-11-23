import prismadb from "@/lib/prismadb";
import ReportClient from "./components/client";

const ReportPage = async ({
  params,
}: {
  params: {
    reportId: string;
  };
}) => {
  const report = await prismadb.reports.findFirst({
    where: {
      id: `${params.reportId}`,
    },
    include: {
      reportRole: {
        include: {
          reportColumns: {
            orderBy: {
              ordering: "asc",
            },
          },
        },
      },
      params: true,
    },
  });

  const metaBranchs = await prismadb.metaDatas.findMany({
    where: {
      type: "param_branch",
    },
  });
  const metaCurrencies = await prismadb.metaDatas.findMany({
    where: {
      type: "param_ccy",
    },
  });

  const reportColumns = await prismadb.reportColumns.findMany({
    orderBy: {
      ordering: "asc",
    },
  });

  await prismadb.$disconnect();

  return (
    <div className="px-10 pb-10 pt-3 min-h-screen">
      <ReportClient
        report={report}
        reportColumns={reportColumns}
        reportRoles={report!.reportRole}
        reportParams={report!.params}
        metaBranchs={metaBranchs}
        metaCurrencies={metaCurrencies}
      />
    </div>
  );
};

export default ReportPage;
