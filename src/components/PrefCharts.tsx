import React, { useState, useLayoutEffect } from "react";
import "./PrefCharts.css";

// import { getPerYear } from "../util/API";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from "recharts";
import { fetchPopulationData } from "../module/fetchPopulationGraphData";

type PrefType = {
  prefCode: number;
  prefName: string;
};
type PropsType = {
  prefList: Array<PrefType>;
};
type gDataType = {
  [key: string]: number;
};
let lines: string[] = [];

const pushLines = (props: PropsType) => {
  lines = [];
  for (const pref of props.prefList) {
    lines.push(pref.prefName);
  }
};

const PrefCharts = (props: PropsType) => {
  const [graphData, setGraphData] = useState<Array<gDataType>>([]);

  useLayoutEffect(() => {
    fetchPopulationData(setGraphData, props);
    pushLines(props);
  }, [props]);

  return (
    <div className="PrefCharts">
      <div className="PrefCharts-container">
        <ResponsiveContainer width={"99%"} height={480}>
          <LineChart
            data={graphData}
            margin={{ top: 30, bottom: 10, right: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 10 }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              padding={{ top: 10 }}
              tickFormatter={(tick) => {
                return tick.toLocaleString();
              }}
            />
            <Tooltip
              formatter={(value: any) => {
                return value.toLocaleString() + "人";
              }}
            />
            <Legend />
            {lines.map((line, index) => {
              const h = index * (360 / 12);
              const strokeColor = `hsl(${h},70%,50%)`;
              return (
                <Line
                  type="linear"
                  key={index}
                  dataKey={line}
                  strokeWidth={3}
                  stroke={strokeColor}
                  activeDot={{ r: 4 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PrefCharts;
