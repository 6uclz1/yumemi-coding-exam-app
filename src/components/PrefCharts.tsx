// npm library
import React, { useState, useMemo, useLayoutEffect } from "react";
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

// module
import { fetchPopulationData } from "../module/FetchPopulationGraphData";

// style
import { PrefChartsContainerStyle, PrefChartsStyle } from "../style/Style";
import {
  contentStyle,
  itemStyle,
  labelStyle,
  wrapperStyle,
} from "../style/Chart";

// type
import { PrefectureType } from "../types/api/api";

type ChartDataType = {
  [key: string]: number;
};
let lines: PrefectureType[] = [];

const pushLines = (props: { prefList: PrefectureType[] }) => {
  lines = [];
  for (const pref of props.prefList) {
    lines.push({ prefCode: pref.prefCode, prefName: pref.prefName });
  }
};
/**
 * 都道府県の人口数の表を表示する
 *
 * @param props Props
 * @param {PropsType} props.prefList 都道府県リスト
 * @returns {React.ReactElement} JSX
 */
const PrefCharts = (props: {
  prefList: PrefectureType[];
}): React.ReactElement => {
  const [chartData, setChartData] = useState<Array<ChartDataType>>([]);

  useMemo(() => {
    fetchPopulationData(setChartData, props);
  }, [props]);

  useLayoutEffect(() => {
    pushLines(props);
  }, [props, chartData]);

  return (
    <div style={PrefChartsStyle}>
      <div style={PrefChartsContainerStyle}>
        <ResponsiveContainer width={"99%"} height={640}>
          <LineChart
            data={chartData}
            margin={{ top: 30, bottom: 30, right: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 10, fontWeight: "bold" }}
              padding={{ left: 10, right: 10 }}
              label={{
                value: "（年）",
                position: "insideBottomRight",
                fontSize: 10,
                offset: 10,
              }}
              height={40}
            />
            <YAxis
              tick={{ fontSize: 10, fontWeight: "bold" }}
              padding={{ top: 10 }}
              tickFormatter={(tick) => {
                return tick.toLocaleString();
              }}
              label={{
                value: "（人）",
                position: "top",
                fontSize: 10,
                offset: 4,
              }}
            />
            <Tooltip
              formatter={(value: any) => {
                return value.toLocaleString() + "人";
              }}
              labelFormatter={(label: any) => label + "年"}
              labelStyle={labelStyle}
              contentStyle={contentStyle}
              itemStyle={itemStyle}
            />
            <Legend wrapperStyle={wrapperStyle} />
            {lines.map((line, index) => {
              return (
                <Line
                  type="linear"
                  key={index}
                  dataKey={line.prefName}
                  strokeWidth={3}
                  stroke={`hsl(${line.prefCode * 30},100%,35%)`}
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
