import prismadb from "@/lib/prismadb";
import { RootClient } from "./components/client";

const ClientPage = async ({
  params,
}: {
  params: {
    clientId: string;
  };
}) => {
  return (
    <div className="p-10 min-h-screen">
      <RootClient clientId={params.clientId} />
    </div>
  );
};

export default ClientPage;
