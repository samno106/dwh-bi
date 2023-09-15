"use client";

import {
  BadgePercent,
  BarChart,
  BarChart3,
  BarChartBig,
  BarChartHorizontalBig,
  Briefcase,
  Cable,
  Component,
  Database,
  Grip,
  Home,
  LayoutGrid,
  LineChart,
  PieChart,
  QrCode,
  Radar,
  Radiation,
  Repeat,
  Settings,
  ShieldCheck,
  User2,
  Users2,
  Wallet,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { reports } from "@prisma/client";

interface DropdownMenuProps {
  reportLists: reports[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ reportLists }) => {
  const pathname = usePathname();

  const generalManagRoutes = [
    {
      href: "/users",
      label: "User Management",
      icon: <Users2 className="w-4 h-4 mr-2" />,
      active: pathname === "/users",
    },
    {
      href: "/report-manage",
      label: "Report Management",
      icon: <BarChartHorizontalBig className="w-4 h-4 mr-2" />,
      active: pathname === "/report-manage",
    },
    {
      href: "/widget-manage",
      label: "Widget Management",
      icon: <QrCode className="w-4 h-4 mr-2" />,
      active: pathname === "/widget-manage",
    },
  ];

  const generalSettingRoutes = [
    {
      href: "/departments",
      label: "Department / Branch",
      icon: <Home className="w-4 h-4 mr-2" />,
      active: pathname === "/departments",
    },
    {
      href: "/positions",
      label: "Positions",
      icon: <Briefcase className="w-4 h-4 mr-2" />,
      active: pathname === "/positions",
    },
    {
      href: "/roles",
      label: "Roles",
      icon: <Radiation className="w-4 h-4 mr-2" />,
      active: pathname === "/roles",
    },
    {
      href: "/report-tamplate",
      label: "Report Tamplate",
      icon: <BarChartBig className="w-4 h-4 mr-2" />,
      active: pathname === "/report-tamplate",
    },
    {
      href: "/widget-template",
      label: "Widget Template",
      icon: <Component className="w-4 h-4 mr-2" />,
      active: pathname === "/widget-template",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" className="shadow-none h-8 w-8 rounded-lg">
          <Grip className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white p-5 pb-8 rounded shadow-xl border mt-3 w-auto">
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col">
            <div className="px-4 py-1 bg-blue-50 rounded  flex items-center">
              <LineChart className="w-4 h-4 text-gray-700 mr-2" />
              <div className="py-1 text-gray-600 text-xs font-medium">
                General Report
              </div>
            </div>
            <ul className="mt-2">
              {reportLists.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/reports/${item.id}`}
                    className={cn(
                      " text-gray-700 px-3 py-2 my-2 text-xs hover:bg-blue-100 hover:text-blue-700 flex items-center rounded"
                    )}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    <span className="text-xs mt-1">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="px-4 py-1 bg-blue-50 rounded flex items-center">
              <Database className="w-4 h-4 text-gray-700 mr-2" />
              <div className="py-1 text-gray-600 text-xs font-medium">
                General Management
              </div>
            </div>
            <ul className="mt-2">
              {generalManagRoutes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={cn(
                      " text-gray-700 px-3 my-2 py-2 text-xs hover:bg-blue-100 hover:text-blue-700 flex items-center rounded",
                      route.active
                        ? "bg-blue-100 text-blue-700"
                        : "bg-white text-gray-700"
                    )}
                  >
                    {route.icon}
                    <span className="text-xs mt-1">{route.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="px-3 py-1 bg-blue-50 rounded flex items-center">
              <Settings className="w-4 h-4 text-gray-700 mr-2" />
              <div className="py-1 text-gray-600 text-xs font-medium">
                General Setting
              </div>
            </div>
            <ul className="mt-2">
              {generalSettingRoutes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={cn(
                      " text-gray-700 px-3 py-2 my-2 text-xs hover:bg-blue-100 hover:text-blue-700 flex items-center rounded",
                      route.active
                        ? "bg-blue-100 text-blue-700"
                        : "bg-white text-gray-700"
                    )}
                  >
                    {route.icon}
                    <span className="text-xs mt-1">{route.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
