import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      reportRoleId: string;
    };
  }
) {
  try {
    const body = await req.json();
    const { display, name, type, report_role_id } = body;

    if (!display) {
      return new Response("display is required", { status: 400 });
    }

    if (!name) {
      return new Response("name is required", { status: 400 });
    }

    if (!report_role_id) {
      return new Response("report is required", { status: 400 });
    }

    const lastColumn = await prismadb.reportColumns.findFirst({
      where: {
        report_role_id: params.reportRoleId,
      },
      orderBy: {
        ordering: "desc",
      },
    });

    const newColumn = lastColumn ? lastColumn.ordering + 1 : 1;

    const reportColumns = await prismadb.reportColumns.create({
      data: {
        display,
        name,
        type,
        report_role_id,
        ordering: newColumn,
      },
    });
    await prismadb.$disconnect();
    return Response.json(reportColumns);
  } catch (error) {
    console.log("[REPORT_COLUMN_POST]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      reportRoleId: string;
    };
  }
) {
  try {
    const reportColumns = await prismadb.reportColumns.findMany({
      where: {
        report_role_id: params.reportRoleId,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    await prismadb.$disconnect();
    return Response.json(reportColumns);
  } catch (error) {
    console.log("[REPORT_COLUMN_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
