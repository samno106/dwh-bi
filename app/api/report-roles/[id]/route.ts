import prismadb from "@/lib/prismadb";

export async function DELETE(
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
    const report = await prismadb.reportRoles.deleteMany({
      where: {
        id: params.id,
      },
    });
    await prismadb.$disconnect();
    return Response.json(report);
  } catch (error) {
    console.log("[REPORT_ROLE_DELETE]", error);
    return new Response("Internal error", { status: 500 });
  }
}
