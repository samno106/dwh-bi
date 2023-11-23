import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const response = await prismadb.metaDatas.findMany({
      where: {
        type: "report_category",
      },
    });
    await prismadb.$disconnect();
    return Response.json(response);
  } catch (error) {
    console.log("[META_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
