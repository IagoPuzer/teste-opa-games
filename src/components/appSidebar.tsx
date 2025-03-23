"use client";

import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FaGooglePlay } from "react-icons/fa";
import { MdVideoSettings, MdOutlineFavoriteBorder } from "react-icons/md";


const data = {
  navMain: [
    {
      title: "Biblioteca",
      items: [
        {
          title: "Videos",
          url: "/",
          icon: <MdVideoSettings />,
        },
        {
          title: "Favoritos",
          url: "/favorites",
          icon: <MdOutlineFavoriteBorder />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Sidebar
      collapsible="icon"
      className={`transition-transform duration-300 ${
        isOpen ? "w-46" : "w-20"
      }`}
      {...props}
    >
      <div
        className={`flex ${
          isOpen
            ? "items-center justify-between p-4"
            : "flex-col items-center p-2"
        }`}
      >
        <div className="flex items-center">
          <FaGooglePlay className="text-2xl" />
          {isOpen && (
            <h1 className="ml-2 text-lg font-bold">Play Video</h1>
          )}{" "}
        </div>
        <SidebarTrigger
          className={`hidden md:flex md:absolute top-14 right-[-21px] bg-gray-200 border border-gray-300 rounded-full p-2 h-10 w-10 shadow-lg hover:bg-gray-300 hover:shadow-xl transition-all duration-200 ease-in-out cursor-pointer ${
            isOpen ? "" : "rotate-180"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <SidebarHeader></SidebarHeader>
      <SidebarContent className="mt-6">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-lg">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-4">
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="text-4xl">
                        {item.icon}
                        {isOpen && (
                          <span className="text-base">{item.title}</span>
                        )}{" "}
                        {/* Exibe o título apenas se o sidebar estiver aberto */}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
