import prismadb from "@/lib/prismadb";

export async function POST(
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
    const data = await req.json();

    const reportColumns = await prismadb.reportColumns.createMany({
      data,
    });
    await prismadb.$disconnect();
    return Response.json(reportColumns);
  } catch (error) {
    console.log("[REPORT_COLUMN_POST]", error);
    return new Response("Internal error", { status: 500 });
  }
}
