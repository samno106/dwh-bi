import prismadb from "@/lib/prismadb";

export async function POST(
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
    const { display, name, type, report_id } = body;

    if (!display) {
      return new Response("display is required", { status: 400 });
    }

    if (!name) {
      return new Response("name is required", { status: 400 });
    }

    if (!report_id) {
      return new Response("report is required", { status: 400 });
    }

    const reportColumns = await prismadb.reportColumns.create({
      data: {
        display,
        name,
        type,
        report_id,
      },
    });
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
      reportId: string;
    };
  }
) {
  try {
    const reportColumns = await prismadb.reportColumns.findMany({
      where: {
        report_id: params.reportId,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return Response.json(reportColumns);
  } catch (error) {
    console.log("[REPORT_COLUMN_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
