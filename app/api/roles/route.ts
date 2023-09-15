import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, code } = body;

    if (!name) {
      return new Response("Name is required", { status: 400 });
    }

    if (!code) {
      return new Response("Code is required", { status: 400 });
    }

    const positions = await prismadb.roles.create({
      data: {
        name,
        code,
      },
    });
    return Response.json(positions);
  } catch (error) {
    console.log("[ROLE_POST]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const roles = await prismadb.roles.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return Response.json(roles);
  } catch (error) {
    console.log("[ROLE_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
