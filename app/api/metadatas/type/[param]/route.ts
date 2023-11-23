import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { param: string };
  }
) {
  try {
    const response = await prismadb.metaDatas.findMany({
      where: {
        type: params.param,
      },
    });
    await prismadb.$disconnect();
    return Response.json(response);
  } catch (error) {
    console.log("[META_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
