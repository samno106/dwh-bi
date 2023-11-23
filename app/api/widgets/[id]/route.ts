import prismadb from "@/lib/prismadb";

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
    const { name, type, position } = body;

    if (!name) {
      return new Response("Name is required", { status: 400 });
    }

    const data = await prismadb.widgets.updateMany({
      where: {
        id: params.id,
      },
      data: {
        name,
        type,
        position,
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_PATCH]", error);
    return new Response("Internal error", { status: 500 });
  }
}

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
    if (!params.id) {
      return new Response("Widget id is required", { status: 400 });
    }

    const data = await prismadb.widgets.deleteMany({
      where: {
        id: params.id,
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_DELETE]", error);
    return new Response("Internal error", { status: 500 });
  }
}
