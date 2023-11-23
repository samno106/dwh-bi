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
    const { name, category } = body;

    if (!name) {
      return new Response("Name is required", { status: 400 });
    }

    const report = await prismadb.reports.updateMany({
      where: {
        id: params.reportId,
      },
      data: {
        name,
        category,
      },
    });
    await prismadb.$disconnect();
    return Response.json(report);
  } catch (error) {
    console.log("[REPORT_PATCH]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
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
    const report = await prismadb.reports.deleteMany({
      where: {
        id: params.reportId,
      },
    });
    await prismadb.$disconnect();
    return Response.json(report);
  } catch (error) {
    console.log("[REPORT_DELETE]", error);
    return new Response("Internal error", { status: 500 });
  }
}
