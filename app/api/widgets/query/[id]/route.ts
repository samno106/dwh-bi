import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  params: {
    params: { id: string };
  }
) {
  try {
    const data = await prismadb.widgets.findUnique({
      where: {
        id: params.params.id,
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function PATCH(
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
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return new Response("code is required", { status: 400 });
    }

    const data = await prismadb.widgets.updateMany({
      where: {
        id: params.id,
      },
      data: {
        code,
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_PATCH]", error);
    return new Response("Internal error", { status: 500 });
  }
}
