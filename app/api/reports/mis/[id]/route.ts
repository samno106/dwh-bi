import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const body = await req.json();
    const { mis } = body;
    console.log("MIS==>" + mis);

    const report = await prismadb.reports.updateMany({
      where: {
        id: params.id,
      },
      data: {
        mis,
      },
    });
    await prismadb.$disconnect();
    return Response.json(report);
  } catch (error) {
    console.log("[REPORT_PATCH]", error);
    return new Response("Internal error", { status: 500 });
  }
}
