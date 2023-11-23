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
    const { display, name, type, widget_id } = body;

    if (!display) {
      return new Response("display is required", { status: 400 });
    }

    if (!name) {
      return new Response("name is required", { status: 400 });
    }

    if (!widget_id) {
      return new Response("report is required", { status: 400 });
    }

    const data = await prismadb.widgetDisplays.create({
      data: {
        display,
        name,
        type,
        widget_id,
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_Label_POST]", error);
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
    const data = await prismadb.widgetDisplays.deleteMany({
      where: {
        id: params.widgetId,
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
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
    const data = await prismadb.widgetDisplays.findMany({
      where: {
        widget_id: params.widgetId,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_Label_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
