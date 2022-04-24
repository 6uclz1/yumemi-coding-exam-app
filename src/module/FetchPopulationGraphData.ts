import React from "react";
import { getPerYear } from "../util/API";
import { PrefectureType } from "../types/api/api";

type PropsType = {
  prefList: Array<PrefectureType>;
};
type PopulationDataType = {
  year: number;
  value: number;
};
type ChartDataType = {
  [key: string]: number;
};

export const fetchPopulationData = async (
  setGraphData: React.Dispatch<React.SetStateAction<ChartDataType[]>>,
  props: PropsType
) => {
  const workMap: any = {};

  for (const pref of props.prefList) {
    const results: any = await getPerYear(pref.prefCode);

    const populationDataList: PopulationDataType[] =
      results.result.data[0].data;
    populationDataList.forEach((populationData: PopulationDataType) => {
      const year: number = populationData.year;
      // まだその年のキーが存在しない場合、キーを作成する
      if (typeof workMap[year] === "undefined") {
        workMap[year] = {};
        workMap[year].year = year;
      }
      workMap[year][pref.prefName] = populationData.value;
    });
  }
  const chartData: Array<ChartDataType> = createChartData(workMap);
  setGraphData(chartData);
};

const createChartData = (workMap: { [x: string]: ChartDataType }) => {
  const chartData: Array<ChartDataType> = [];
  for (const workKey in workMap) {
    chartData.push(workMap[workKey]);
  }
  return chartData;
};
