import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(
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
    const { list } = await req.json();

    for (let item of list) {
      await prismadb.reportColumns.update({
        where: {
          id: item.id,
        },
        data: {
          ordering: item.ordering,
        },
      });
    }
    await prismadb.$disconnect();
    return new NextResponse("Success", { status: 200 });
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
