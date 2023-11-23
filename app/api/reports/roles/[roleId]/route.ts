import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { roleId: string };
  }
) {
  try {
    const reports = await prismadb.reports.findMany({
      include: {
        reportRole: {
          where: {
            report_id: params.roleId,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    await prismadb.$disconnect();
    return Response.json(reports);
  } catch (error) {
    console.log("[REPORT_BY_ROLE_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
