import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      paramId: string;
    };
  }
) {
  try {
    const reportParams = await prismadb.reportParams.deleteMany({
      where: {
        id: params.paramId,
      },
    });
    await prismadb.$disconnect();
    return Response.json(reportParams);
  } catch (error) {
    console.log("[REPORT_PARAM}_DELETE]", error);
    return new Response("Internal error", { status: 500 });
  }
}
