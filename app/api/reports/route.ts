import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role_id } = body;

    if (!name) {
      return new Response("Name is required", { status: 400 });
    }

    if (!role_id) {
      return new Response("Role is required", { status: 400 });
    }

    const report = await prismadb.reports.create({
      data: {
        name,
        role_id,
      },
    });
    return Response.json(report);
  } catch (error) {
    console.log("[REPORT_POST]", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const roles = await prismadb.reports.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return Response.json(roles);
  } catch (error) {
    console.log("[REPORT_GET]", error);
    return new Response("Internal error", { status: 500 });
  }
}
