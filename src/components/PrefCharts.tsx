import React, { useState, useLayoutEffect } from "react";
import "./PrefCharts.css";

import { getPerYear } from "../util/API";

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
const fetchPopulationData = async (
  setGraphData: React.Dispatch<React.SetStateAction<gDataType[]>>,
  props: PropsType
) => {
  type PopulationDataType = {
    year: number;
    value: number;
  };
  const workMap: any = {};

  lines = [];
  for (const pref of props.prefList) {
    const results: any = await getPerYear(pref.prefCode);

    lines.push(pref.prefName);
    const populationDataList: PopulationDataType[] =
      results.result.data[0].data;
    populationDataList.forEach((populationData: PopulationDataType) => {
      const year: number = populationData.year;
      if (typeof workMap[year] === "undefined") {
        workMap[year] = {};
        workMap[year].year = year;
      }
      workMap[year][pref.prefName] = populationData.value;
    });
  }
  const gDataList: Array<gDataType> = [];
  for (const workKey in workMap) {
    gDataList.push(workMap[workKey]);
  }
  setGraphData(gDataList);
};

const PrefCharts = (props: PropsType) => {
  const [graphData, setGraphData] = useState<Array<gDataType>>([]);

  // const CustomTooltip = ({ active, payload, label }: any) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div>
  //         <p className="label">{`${label}`}</p>
  //         {payload.map((v: any, index: any) => {
  //           // const h = index * (360 / 12);
  //           // const strokeColor = `hsl(${h},70%,50%)`;
  //           console.log(v);
  //           return (
  //             <p className="label" key={index}>
  //               {`${v.dataKey}: ${v.value.toLocaleString()} 人`}
  //             </p>
  //           );
  //         })}
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  useLayoutEffect(() => {
    fetchPopulationData(setGraphData, props);
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
              // a={}
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
              // content={<CustomTooltip />}
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
