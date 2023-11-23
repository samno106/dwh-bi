import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      widgetId: string;
    };
  }
) {
  try {
    const body = await req.json();
    const { role_id } = body;

    if (!role_id) {
      return new Response("role is required", { status: 400 });
    }

    const data = await prismadb.widgetRoles.create({
      data: {
        widget_id: params.widgetId,
        role_id,
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_ROLE_POST]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      widgetId: string;
    };
  }
) {
  try {
    const data = await prismadb.widgetRoles.deleteMany({
      where: {
        id: params.widgetId,
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_ROLE_DELETE]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      widgetId: string;
    };
  }
) {
  try {
    const data = await prismadb.widgetRoles.findMany({
      where: {
        widget_id: params.widgetId,
      },
      orderBy: {
        created_at: "asc",
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_ROLE_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
