"use client";
import { useEffect, useState } from "react";
import { Bar, Line, PolarArea, Doughnut, Pie } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  departments,
  metaDatas,
  users,
  widgetParams,
  widgets,
} from "@prisma/client";
import { CalendarInline } from "@/components/ui/calendar-inline";
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_END_POINT, TOKEN_COOKIES } from "@/constant/api-end-point";
import { getToken } from "@/lib/init-token";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { convertMonth } from "@/lib/convert-month";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface ChartsProps {
  title: string;
  code: string;
  widgetId: string | null;
}

Chart.register(ChartDataLabels);

export const PieCharts: React.FC<ChartsProps> = ({ title, code, widgetId }) => {
  const [deparment, setDepartment] = useState<departments>();
  const [reportDate, setReportDate] = React.useState(
    moment().subtract(1, "day").format("DD-MMM-YYYY")
  );
  const [branch, setBranch] = useState("MBR");
  const [metaBranch, setMetaBranch] = useState<metaDatas[]>([]);

  const [labels, setLabels] = useState([{}]);
  const [qty, setQty] = useState([{}]);
  const [amount, setAmount] = useState([{}]);
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = React.useState(
    moment().subtract(7, "day").format("DD-MMM-YYYY")
  );
  const [toDate, setToDate] = React.useState(
    moment().subtract(1, "day").format("DD-MMM-YYYY")
  );
  const [widgetParams, setWidgetParams] = useState<widgetParams[]>([]);
  const [paramSize, setParamSize] = useState(0);
  const [months, setMonths] = useState("3");

  const getUser = async () => {
    const userId = getToken(TOKEN_COOKIES.AUTH_ID);
    await axios.get(`/api/users/${userId}`).then((data) => {
      setDepartment(data.data.department);

      //set default branch
      if (data.data.department?.type !== "HO") {
        setBranch(data.data.department?.code ?? "MBR");
      }
    });
  };

  const getMetada = async () => {
    await axios.get(`/api/metadatas/type/${"param_branch"}`).then((data) => {
      setMetaBranch(data.data);
    });
  };

  const getWidgetParams = async () => {
    await axios.get("/api/widget-params/" + widgetId).then((data) => {
      setWidgetParams(data.data);
    });
  };

  const getInitData = async () => {
    try {
      await axios
        .post(
          `${process.env.API_URL + API_END_POINT.REPORTS}`,
          {},
          {
            params: {
              query: query,
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken(TOKEN_COOKIES.TOKEN_NAME)}`,
            },
          }
        )
        .then(({ data }) => {
          let labels = data.data.map((item: any) => {
            var isLabel;
            if (item["LABEL"].length > 4) {
              isLabel = moment(item["LABEL"]).format("ll");
            } else if (item["LABEL"].length == 4) {
              isLabel = item["LABEL"];
            } else {
              isLabel = convertMonth(item["LABEL"]);
            }

            return isLabel;
          });
          let qty = data.data.map((item: any) => {
            return item["QTY"];
          });
          let amount = data.data.map((item: any) => {
            return item["AMOUNT"];
          });
          console.log(data.data);
          setLabels(labels);
          setQty(qty);
          setAmount(amount);
        });
    } catch (error) {
      toast.error("Internal server erorr!");
    }
  };

  useEffect(() => {
    getUser();
    getMetada();
    getWidgetParams();

    //set default branch
    if (deparment?.type !== "HO") {
      setBranch(deparment?.code ?? "MBR");
    }

    let paramCol = widgetParams.filter((pmcl) => pmcl.type === "date");
    setParamSize(paramCol.length);

    var query;
    var strQuery = code;
    // if (paramCol.length === 2) {
    //   query = strQuery
    //     ?.replaceAll(
    //       "param_from_date",
    //       `'${moment(fromDate).format("DD-MMM-YYYY")}'`
    //     )
    //     .replaceAll(
    //       "param_to_date",
    //       `'${moment(toDate).format("DD-MMM-YYYY")}'`
    //     )
    //     .replaceAll("param_branch", "'" + `${branch}` + "'");
    // } else {
    //   query = strQuery
    //     ?.replaceAll("param_month", `${parseInt(months)}`)
    //     .replaceAll("param_branch", "'" + `${branch}` + "'");
    // }

    if (paramCol.length == 2) {
      query = strQuery
        ?.replaceAll(
          "param_from_date",
          `'${moment(fromDate).format("DD-MMM-YYYY")}'`
        )
        .replaceAll(
          "param_to_date",
          `'${moment(toDate).format("DD-MMM-YYYY")}'`
        )
        .replaceAll("param_branch", "'" + `${branch}` + "'");
    } else if (paramCol.length == 1) {
      query = strQuery
        ?.replaceAll(
          "param_report_date",
          `'${moment(reportDate).format("DD-MMM-YYYY")}'`
        )
        .replaceAll("param_branch", "'" + `${branch}` + "'");
    } else {
      query = strQuery
        ?.replaceAll("param_month", `${parseInt(months)}`)
        .replaceAll("param_branch", "'" + `${branch}` + "'");
    }

    if (branch === "all") {
      query = query?.replaceAll("AND BRANCH=" + `${branch}`, "");
    }

    setQuery(`${query}`);
    console.log(query);
    getInitData();
  }, [branch, fromDate, toDate, months, reportDate, query]);

  return (
    <div className="bg-white p-3 rounded-md w-full">
      <div className="py-2 px-3 w-full  rounded-md flex justify-between items-center">
        <h4 className="text-md text-gray-700 font-medium">{title}</h4>

        <div className="px-3 flex items-center">
          <span className="px-3 py-1.5  rounded-md text-sm text-blue-700 font-medium">
            Filter
          </span>
          {widgetParams.map((param) =>
            param.type === "date" ? (
              param.name !== "param_report_date" ? (
                <Popover key={param.id}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[180px] h-10 justify-start text-left font-normal shadow-none hover:bg-white mx-1",
                        !(param.name === "param_from_date"
                          ? fromDate
                          : toDate) && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {(
                        param.name === "param_from_date" ? fromDate : toDate
                      ) ? (
                        moment(
                          param.name === "param_from_date" ? fromDate : toDate
                        ).format("DD-MMM-YYYY")
                      ) : (
                        <span className="text-xs text-gray-400">
                          {param.display}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={
                        param.name === "param_from_date" ? fromDate : toDate
                      }
                      onSelect={
                        param.name === "param_from_date"
                          ? setFromDate
                          : setToDate
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Popover key={param.id}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[180px] h-10 justify-start text-left font-normal shadow-none hover:bg-white mx-1",
                        !reportDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {reportDate ? (
                        moment(reportDate).format("DD-MMM-YYYY")
                      ) : (
                        <span className="text-xs text-gray-400">
                          {param.display}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={reportDate}
                      onSelect={setReportDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )
            ) : param.type === "select" ? (
              param.name === "param_month" ? (
                <Select
                  key={param.id}
                  onValueChange={setMonths}
                  defaultValue={months}
                >
                  <SelectTrigger className="w-[120px] h-[40px] ml-2 text-xs bg-white">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea>
                      <SelectItem value="">{param.display}</SelectItem>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              ) : (
                <Select
                  key={param.id}
                  onValueChange={setBranch}
                  defaultValue={branch}
                >
                  <SelectTrigger className="w-[100px] h-[40px] ml-2 text-xs bg-white">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-[280px]">
                      {/* <SelectItem value="">{param.display}</SelectItem> */}
                      <SelectItem value="all">All Branchs</SelectItem>
                      {deparment?.type === "Branch"
                        ? metaBranch
                            .filter((item) => item.value === deparment.code)
                            .map((branch, index) => (
                              <SelectItem key={index} value={branch.value}>
                                {branch.label}
                              </SelectItem>
                            ))
                        : metaBranch.map((branch, index) => (
                            <SelectItem key={index} value={branch.value}>
                              {branch.label}
                            </SelectItem>
                          ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              )
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5">
        <div className="h-[200px] w-full flex justify-center">
          <Doughnut
            data={{
              labels: labels,
              datasets: [
                {
                  label: "QUANTITY",
                  data: qty,
                  backgroundColor: [
                    "#1074FF",
                    "#FF7043",
                    "#00D37B",
                    "#7E57C2",
                    "#00A0E0",
                    "#EEC000",
                  ],
                  borderColor: "#FFFFFF",
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
                datalabels: {
                  display: false,
                  color: "#fff",
                  anchor: "end",
                  align: "start",
                  offset: 10,
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 100,
                  backgroundColor: (context) => {
                    return context.dataset.backgroundColor;
                  },
                  font: {
                    weight: "bold",
                    size: "10",
                    lineHeight: "1.5",
                  },
                },
              },
            }}
          />
        </div>
        <div className="h-[200px] w-full flex justify-center">
          <Pie
            data={{
              labels: labels,
              datasets: [
                {
                  label: "AMOUNTS",
                  data: amount,
                  backgroundColor: [
                    "#1074FF",
                    "#FF7043",
                    "#00D37B",
                    "#7E57C2",
                    "#00A0E0",
                    "#EEC000",
                  ],
                  borderColor: "#FFFFFF",
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
                datalabels: {
                  display: false,
                  color: "#fff",
                  anchor: "end",
                  align: "start",
                  offset: 10,
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 100,
                  backgroundColor: (context) => {
                    return context.dataset.backgroundColor;
                  },
                  font: {
                    weight: "bold",
                    size: "10",
                    lineHeight: "1.5",
                  },
                  formatter: (value) => {
                    return value + " $";
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
