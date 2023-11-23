import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { metadataId: string };
  }
) {
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

    const metadatas = await prismadb.metaDatas.updateMany({
      where: {
        id: params.metadataId,
      },
      data: {
        label,
        value,
        type,
      },
    });
    await prismadb.$disconnect();
    return Response.json(metadatas);
  } catch (error) {
    console.log("[META_PATH]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { metadataId: string };
  }
) {
  try {
    const metadatas = await prismadb.metaDatas.deleteMany({
      where: {
        id: params.metadataId,
      },
    });
    await prismadb.$disconnect();
    return Response.json(metadatas);
  } catch (error) {
    console.log("[META_PATH]", error);
    return new Response("Internal error", { status: 500 });
  }
}
