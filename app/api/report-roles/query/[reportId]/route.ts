import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      reportId: string;
    };
  }
) {
  try {
    const roles = await prismadb.reportRoles.findFirst({
      where: {
        report_id: params.reportId,
      },
      include: {
        reportColumns: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    await prismadb.$disconnect();
    return Response.json(roles);
  } catch (error) {
    console.log("[REPORT_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
