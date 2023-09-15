import React from "react";
import { ReportTamplateClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { ReportColumn } from "./components/columns";

const ReportTamplatePages = async () => {
  const reports = await prismadb.reports.findMany({
    include: {
      role: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedReports: ReportColumn[] = reports.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    status: item.status,
    role_id: item.role_id,
    role: item.role.name,
  }));

  return (
    <div className="px-10 py-10 min-h-screen">
      <ReportTamplateClient data={formattedReports} />
    </div>
  );
};

export default ReportTamplatePages;
