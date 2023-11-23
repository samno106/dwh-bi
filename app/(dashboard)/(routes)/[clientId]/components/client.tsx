"use client";

import { TOKEN_COOKIES } from "@/constant/api-end-point";
import { getToken } from "@/lib/init-token";
import { metaDatas, reportRoles, reports, users } from "@prisma/client";
import axios from "axios";
import {
  Cable,
  CheckCircle2,
  ChevronDown,
  LineChart,
  Loader2,
  PieChart,
  Radar,
  Repeat,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface RootClientProps {
  clientId: string;
}
export const RootClient: React.FC<RootClientProps> = ({ clientId }) => {
  const [user, setUser] = useState<users>();
  const [reports, setReports] = useState<reports[]>([]);
  const [categories, setCategories] = useState<metaDatas[]>([]);

  const getUser = async () => {
    const userId = getToken(TOKEN_COOKIES.AUTH_ID);
    await axios.get(`/api/users/${userId}`).then((data) => {
      setUser(data.data);
    });
  };

  const getCategory = async () => {
    try {
      await axios.get("/api/metadatas/type/report_category").then((data) => {
        setCategories(data.data);
      });
    } catch (error) {}
  };

  const getReportByCategory = async () => {
    if (clientId === "risk") {
      await axios.get(`/api/reports`).then((data) => {
        setReports(data.data);
      });
    } else {
      await axios.get(`/api/reports/category/${clientId}`).then((data) => {
        setReports(data.data);
      });
    }
  };

  useEffect(() => {
    getUser();
    getCategory();
    getReportByCategory();
  }, []);

  return (
    <>
      <h3 className="capitalize font-semibold text-gray-700">
        {clientId} Department
      </h3>
      <div className="py-5 bg-white rounded-md mt-5">
        <h4 className="text-sm font-medium text-gray-500 border-b-2 w-full px-5 pb-3 flex items-center">
          {!user ? (
            <Loader2 className="animate-spin w-4 h-4 text-blue-500" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          )}
          <span className="ml-2 uppercase">Report Lists</span>
        </h4>
        <div className="py-4">
          <ul className="divide-y-2 divide-slate-100">
            {clientId !== "risk" ? (
              user ? (
                reports.length > 0 ? (
                  reports.map((item, key) =>
                    item.reportRole.map((role: any) =>
                      role.role_id === user.role_id ? (
                        <li key={key}>
                          <Link
                            target="_blank"
                            href={`/reports/${item.id}`}
                            className="py-2 px-5 w-full flex items-center hover:text-blue-500 text-gray-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 text-blue-400 mr-2"
                            >
                              <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 00-3-3h-3.879a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H6a3 3 0 00-3 3v3.162A3.756 3.756 0 014.094 9h15.812zM4.094 10.5a2.25 2.25 0 00-2.227 2.568l.857 6A2.25 2.25 0 004.951 21H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-2.227-2.568H4.094z" />
                            </svg>

                            <span className="text-xs font-medium">
                              {item.name}
                            </span>
                          </Link>
                        </li>
                      ) : (
                        ""
                      )
                    )
                  )
                ) : (
                  <li className="px-5 flex justify-center w-full">
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-11 h-11 text-blue-400 mr-2"
                      >
                        <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 00-3-3h-3.879a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H6a3 3 0 00-3 3v3.162A3.756 3.756 0 014.094 9h15.812zM4.094 10.5a2.25 2.25 0 00-2.227 2.568l.857 6A2.25 2.25 0 004.951 21H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-2.227-2.568H4.094z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-[15px] text-gray-400 font-semibold">
                          NO
                        </span>
                        <span className="text-sm text-gray-400 uppercase">
                          List
                        </span>
                      </div>
                    </div>
                  </li>
                )
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </ul>
          <div className="grid grid-cols-3 gap-8 p-3 px-5">
            {(clientId === "risk" && user?.department.code === "rsd") ||
            (clientId === "risk" && user?.role.code === "it_admin")
              ? categories
                  .filter((cat) => cat.value !== "risk")
                  .map((category) => (
                    <div key={category.id}>
                      <div className="flex  items-center text-sm font-medium text-gray-700 py-1.5 px-3 w-full rounded-sm ">
                        {category.value === "operation" ? (
                          <Repeat className="w-4 h-4 mr-2" />
                        ) : (
                          ""
                        )}

                        {category.value === "credit" ? (
                          <PieChart className="w-4 h-4 mr-2" />
                        ) : (
                          ""
                        )}
                        {category.value === "business" ? (
                          <LineChart className="w-4 h-4 mr-2" />
                        ) : (
                          ""
                        )}
                        {category.value === "finance" ? (
                          <Wallet className="w-4 h-4 mr-2" />
                        ) : (
                          ""
                        )}
                        {category.value === "complaince" ? (
                          <Cable className="w-4 h-4 mr-2" />
                        ) : (
                          ""
                        )}
                        {category.value === "audit" ? (
                          <Radar className="w-4 h-4 mr-2" />
                        ) : (
                          ""
                        )}
                        <span>{category.label}</span>

                        {/* <ChevronDown className="w-4 h-4" /> */}
                      </div>

                      <ul className="divide-y-2 divide-slate-100 px-4 mt-2">
                        {user
                          ? reports
                              .filter(
                                (fl) => fl.category === category.value && fl.mis
                              )
                              .map((item) =>
                                item ? (
                                  <li key={item.id}>
                                    <Link
                                      target="_blank"
                                      href={`/reports/${item.id}`}
                                      className="py-2 w-full flex items-center hover:text-blue-500 text-blue-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-4 text-gray-400 mr-2"
                                      >
                                        <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 00-3-3h-3.879a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H6a3 3 0 00-3 3v3.162A3.756 3.756 0 014.094 9h15.812zM4.094 10.5a2.25 2.25 0 00-2.227 2.568l.857 6A2.25 2.25 0 004.951 21H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-2.227-2.568H4.094z" />
                                      </svg>

                                      <span className="text-xs font-medium">
                                        {item.name}
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  ""
                                )
                              )
                          : ""}
                      </ul>
                    </div>
                  ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};
