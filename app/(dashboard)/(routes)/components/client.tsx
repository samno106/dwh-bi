"use client";

import EmptyCard from "@/components/cards/statistic-card/EmptyCard";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { TOKEN_COOKIES } from "@/constant/api-end-point";
import { getToken } from "@/lib/init-token";
import { departments, metaDatas, users, widgets } from "@prisma/client";
import { CalendarInline } from "@/components/ui/calendar-inline";

import Charts from "./charts";

interface DashboardClientProps {
  metaBranchs: metaDatas[];
}

export const DashboardClient: React.FC<DashboardClientProps> = ({
  metaBranchs,
}) => {
  const [reportDate, setReportDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);
  const [customerLoan, setCustomerLoan] = useState([]);

  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  const [s, setS] = useState(0);

  const [user, setUser] = useState<users>();
  const [deparment, setDepartment] = useState<departments>();
  const [widgets, setWidgets] = useState<widgets[]>([]);

  const [branch, setBranch] = useState("");

  const getUser = async () => {
    const userId = getToken(TOKEN_COOKIES.AUTH_ID);
    await axios.get(`/api/users/${userId}`).then((data) => {
      setDepartment(data.data.department);
      setUser(data.data);
    });
  };

  const getWidgets = async () => {
    await axios.get("/api/widgets").then((data) => {
      setWidgets(data.data);
    });
  };

  const clock = () => {
    const d = new Date();
    setH(d.getHours() % 24 || 24);
    setM(d.getMinutes());
    setS(d.getSeconds());
  };

  useEffect(() => {
    getUser();
    getWidgets();
    setInterval(() => {
      clock();
    }, 1000);
  }, [reportDate, branch]);

  return (
    <div>
      <div className="px-10 pt-10 w-full">
        <div className="flex">
          <div className="rounded-md bg-white w-8/12 shadow mr-5 p-2 ">
            {widgets
              .filter((data) => data.position === "1")
              .map((item) =>
                item.widgetRoles.map((widgetRole: any) =>
                  widgetRole.role_id === user?.role_id ? (
                    <div className="h-auto flex" key={widgetRole.id}>
                      <Charts
                        widgetId={item.id}
                        type={item.type}
                        code={item?.code}
                        title={item.name}
                      />
                    </div>
                  ) : (
                    ""
                  )
                )
              )}
          </div>
          <div className="w-3/6 relative flex items-start rounded-md shadow bg-white h-[310px]">
            <div className="w-full flex flex-col items-center justify-center">
              <CalendarInline
                mode="single"
                selected={date}
                onSelect={setDate}
                className=" bg-white rounded-md"
              />
              <div className="px-5 mt-5 text-lg font-semibold text-gray-700">
                {moment().format("ll")}
              </div>
            </div>
            <div className="bg-gradient-to-t from-sky-500 to-blue-800 p-2 rounded-md h-full w-full flex items-center justify-center">
              <div className="text-center flex flex-col justify-center items-center">
                <h3 className="relative text-[46px] h-full text-blue-600 font-semibold bg-white py-1 px-5 rounded-2xl">
                  <span className="text-[10px] p-1 rounded-xl bg-blue-600 text-white absolute top-1 right-1">
                    {h > 12 ? "PM" : "AM"}
                  </span>
                  <div className="mt-2">{h.toString().padStart(2, "0")}</div>
                </h3>
                <div className="grid grid-cols-2 gap-5 mt-3">
                  <div className="text-[20px] text-white font-semibold flex flex-col">
                    <span>{m.toString().padStart(2, "0")}</span>
                    <span className="text-[8px] uppercase font-normal">
                      minutes
                    </span>
                  </div>
                  <div className="text-[20px] text-white font-semibold flex flex-col">
                    <span>{s.toString().padStart(2, "0")}</span>
                    <span className="text-[8px] uppercase font-normal">
                      secounds
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {widgets
        .filter((data) => data.position !== "1")
        .map((item) =>
          item.widgetRoles.map((widgetRole: any) =>
            widgetRole.role_id === user?.role_id ? (
              <div className="px-10 mt-8" key={widgetRole.id}>
                <Charts
                  widgetId={item.id}
                  type={item.type}
                  code={item?.code}
                  title={item.name}
                />
              </div>
            ) : (
              ""
            )
          )
        )}
    </div>
  );
};

export default DashboardClient;
