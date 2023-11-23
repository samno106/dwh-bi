"use client";

import {
  BadgePercent,
  BarChart,
  BarChart3,
  BarChartBig,
  BarChartHorizontalBig,
  Briefcase,
  Building,
  Cable,
  Component,
  Database,
  DatabaseBackup,
  DollarSign,
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
import { reports, users } from "@prisma/client";

interface DropdownMenuProps {
  reportLists: reports[];
  role: string;
  label: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  reportLists,
  role,
  label,
}) => {
  const pathname = usePathname();

  const generalManagRoutes = [
    {
      href: "/users",
      label: "User Management",
      icon: <Users2 className="w-4 h-4 mr-2" />,
      active: pathname === "/users",
    },
    {
      href: "/report-tamplate",
      label: "Report Management",
      icon: <BarChartHorizontalBig className="w-4 h-4 mr-2" />,
      active: pathname === "/report-tamplate",
    },
    {
      href: "/widget-template",
      label: "Widget Management",
      icon: <QrCode className="w-4 h-4 mr-2" />,
      active: pathname === "/widget-template",
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
      href: "/metadata",
      label: "Metadata",
      icon: <DatabaseBackup className="w-4 h-4 mr-2" />,
      active: pathname === "/metadata",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="shadow-none h-8 w-auto px-2 rounded-lg flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>

          {label !== "" ? (
            <span className="text-xs text-white ml-2">{label}</span>
          ) : (
            ""
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white p-5 pb-8 rounded shadow-xl border mt-3 w-auto">
        <div
          className={cn(
            "grid gap-8",
            role === "it_admin" ? "grid-cols-2" : "grid-cols-1"
          )}
        >
          {/* <div className="flex flex-col">
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
          </div> */}
          {role === "it_admin" ? (
            <>
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
            </>
          ) : (
            <></>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
