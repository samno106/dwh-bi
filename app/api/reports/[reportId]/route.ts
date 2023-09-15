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
    const { name, role_id } = body;

    if (!name) {
      return new Response("Name is required", { status: 400 });
    }

    if (!role_id) {
      return new Response("Role is required", { status: 400 });
    }

    const report = await prismadb.reports.updateMany({
      where: {
        id: params.reportId,
      },
      data: {
        name,
        role_id,
      },
    });
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
    return Response.json(report);
  } catch (error) {
    console.log("[REPORT_DELETE]", error);
    return new Response("Internal error", { status: 500 });
  }
}
