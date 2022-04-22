import React, { useState, useLayoutEffect } from "react";
import "./PrefCharts.css";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

type PrefType = {
  prefCode: number;
  prefName: string;
};
type PropsType = {
  prefList: Array<PrefType>;
};
type gDataType = {
  year: number;
  [key: string]: number;
};
const fetchCatFactsData = async (
  setGraphData: React.Dispatch<React.SetStateAction<gDataType[]>>,
  props: PropsType
) => {
  type PopulationDataType = {
    year: number;
    value: number;
  };
  type PrefDataType = {
    [key: string]: PopulationDataType;
  };
  const prefData: PrefDataType = {};
  for (const pref of props.prefList) {
    const res = await fetch(
      "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
        pref.prefCode,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "FXpRNLpjvvMd3rOz9dZsANvhY5ScNLa9P4H86OLb",
        },
      }
    );
    const data = await res.json();
    prefData[pref.prefName] = data.result.data[0].data;
  }

  type gDataType = {
    year: number;
    [key: string]: number;
  };
  const gDataList: Array<gDataType> = [];
  const yearList: Array<number> = [
    1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
    2020, 2025, 2030, 2035, 2040, 2045,
  ];

  for (const year of yearList) {
    let populationObject: gDataType = { year };
    for (const [key, value] of Object.entries(prefData)) {
      const v: any = value;
      const prefDataList: any = v.filter(
        (v: PopulationDataType) => v.year === year
      );
      populationObject = { ...populationObject, [key]: prefDataList[0].value };
    }
    gDataList.push(populationObject);
  }
  setGraphData(gDataList);
};

const PrefCharts = (props: PropsType) => {
  const [graphData, setGraphData] = useState<Array<gDataType>>([]);

  useLayoutEffect(() => {
    fetchCatFactsData(setGraphData, props);
  }, [props]);

  return (
    <div className="PrefCharts">
      <div className="PrefCharts-container">
        <ResponsiveContainer width={"100%"} height={480}>
          <ComposedChart
            data={graphData}
            margin={{ top: 30, bottom: 10, right: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 10 }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis tick={{ fontSize: 10 }} padding={{ top: 10 }} />
            <Tooltip />
            <Legend />
            {Object.entries(props.prefList).map(([key, value]: any) => {
              return (
                <Line
                  type="linear"
                  key={key}
                  dataKey={value.prefName}
                  strokeWidth={3}
                  stroke={
                    "#" + Math.floor(Math.random() * 16777215).toString(16)
                  }
                  activeDot={{ r: 8 }}
                  isAnimationActive={false}
                />
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PrefCharts;
