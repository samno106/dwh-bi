import BaseNavbar from "@/components/layouts/base-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BaseNavbar />
      <main className="mt-16">{children}</main>
    </>
  );
}
