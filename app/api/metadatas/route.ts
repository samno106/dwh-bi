import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { label, value, type } = body;

    if (!label) {
      return new Response("label is required", { status: 400 });
    }

    if (!value) {
      return new Response("value is required", { status: 400 });
    }

    if (!type) {
      return new Response("type is required", { status: 400 });
    }

    const metadatas = await prismadb.metaDatas.create({
      data: {
        label,
        value,
        type,
      },
    });
    await prismadb.$disconnect();
    return Response.json(metadatas);
  } catch (error) {
    console.log("[META_POST]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const response = await prismadb.metaDatas.findMany({
      orderBy: {
        type: "asc",
      },
    });
    await prismadb.$disconnect();
    return Response.json(response);
  } catch (error) {
    console.log("[META_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
