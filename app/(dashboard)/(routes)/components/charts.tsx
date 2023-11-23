"use client";

import React, { useEffect, useState } from "react";
import { LineCharts } from "./line-charts";
import { BarCharts } from "./bar-charts";
import { PieCharts } from "./pie-charts";
import toast from "react-hot-toast";
import { API_END_POINT, TOKEN_COOKIES } from "@/constant/api-end-point";
import axios from "axios";
import { convertMonth } from "@/lib/convert-month";
import { getToken } from "@/lib/init-token";
import { months } from "moment";
import moment from "moment";

interface ChartsProps {
  type: string | null;
  code: string | null;
  title: string | null;
  widgetId: string | null;
}

export const Charts: React.FC<ChartsProps> = ({
  type,
  code,
  title,
  widgetId,
}) => {
  const [labels, setLabels] = useState([{}]);
  const [qty, setQty] = useState([{}]);
  const [amount, setAmount] = useState([{}]);
  const [query, setQuery] = useState("");

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
            if (item["LABEL"].length > 3) {
              isLabel = moment(item["LABEL"]).format("ll");
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
    var query;
    var strQuery = code;
    query = strQuery
      ?.replaceAll("param_month", `${parseInt("3")}`)
      .replaceAll("param_branch", `'KPI'`);
    setQuery(`${query}`);
    console.log(query);
    getInitData();
  }, [query]);

  const showChart = () => {
    switch (type) {
      case "line_chart":
        return (
          <LineCharts
            code={code ?? ""}
            title={title ?? ""}
            widgetId={widgetId}
          />
        );
        break;
      case "bar_chart":
        return (
          <BarCharts
            code={code ?? ""}
            title={title ?? ""}
            widgetId={widgetId}
          />
        );
        break;
      case "pie_chart":
        return (
          <PieCharts
            code={code ?? ""}
            title={title ?? ""}
            widgetId={widgetId}
          />
        );
        break;
    }
  };

  return showChart();
};

export default Charts;
