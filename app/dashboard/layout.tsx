import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Topbar from "@/components/dashboard/topbar";
import AppSidebar from "@/components/shareable/app-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <main className="p-8">{children}</main>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
