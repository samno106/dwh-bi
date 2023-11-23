import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const reports = await prismadb.reports.findMany({
      include: {
        reportRole: true,
      },
      where: {
        category: params.id,
      },
      orderBy: {
        name: "asc",
      },
    });
    await prismadb.$disconnect();
    return Response.json(reports);
  } catch (error) {
    console.log("[REPORT_BY_CATEGORY_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
