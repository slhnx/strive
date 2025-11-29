"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { LogOut, User2 } from "lucide-react";
import { useTheme } from "next-themes";

const Topbar = () => {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();

  return (
    <div className="topbar border-2 dark:border-white border-black py-2 px-6 hard-shadow">
      <div className="flex items-center justify-between">
        <h1 className="text-primay font-pixel">Strive</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-secondary p-4">
              <div className="flex items-center gap-2">
                <div className="user-info flex items-center gap-4"></div>
                <span className="font-pixel text-sm">
                  {user?.firstName || "User"}
                </span>
                <img
                  src={user?.imageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <User2 />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={(theme) => setTheme(theme)}
                      >
                        <DropdownMenuRadioItem value="light">
                          Light
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">
                          Dark
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuItem className="focus:bg-red-500">
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
