import prismadb from "@/lib/prismadb";

export async function PATCH(
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
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return new Response("Code is required", { status: 400 });
    }

    const report = await prismadb.reports.updateMany({
      where: {
        id: params.reportId,
      },
      data: {
        code,
      },
    });
    return Response.json(report);
  } catch (error) {
    console.log("[REPORT_PATCH]", error);
    return new Response("Internal error", { status: 500 });
  }
}
