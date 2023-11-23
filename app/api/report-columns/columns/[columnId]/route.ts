import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      columnId: string;
    };
  }
) {
  try {
    const reportColumns = await prismadb.reportColumns.deleteMany({
      where: {
        id: params.columnId,
      },
    });
    await prismadb.$disconnect();
    return Response.json(reportColumns);
  } catch (error) {
    console.log("[REPORT_COLUMN_DELETE]", error);
    return new Response("Internal error", { status: 500 });
  }
}
