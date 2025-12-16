import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartNoAxesCombined, ChevronUp, Cog, Home, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton, UserButton, UserProfile } from "@clerk/nextjs";
import Image from "next/image";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "#",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Friends",
    url: "#",
    icon: User,
  },
  {
    title: "Settings",
    url: "#",
    icon: Cog,
  },
];

const AppSidebar = async () => {
  const user = await currentUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-primay font-pixel">Strive</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="p-3">
                  <Image
                    src={user?.imageUrl as string}
                    alt="User profile"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {user?.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <SignOutButton>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </SignOutButton>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
