import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, type, position } = body;

    if (!name) {
      return new Response("Name is required", { status: 400 });
    }

    const data = await prismadb.widgets.create({
      data: {
        name,
        type,
        position,
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_POST]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const data = await prismadb.widgets.findMany({
      include: {
        widgetRoles: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    await prismadb.$disconnect();
    return Response.json(data);
  } catch (error) {
    console.log("[WIDGET_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
