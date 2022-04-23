import React from "react";
import { getPerYear } from "../util/API";

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

export const fetchPopulationData = async (
  setGraphData: React.Dispatch<React.SetStateAction<gDataType[]>>,
  props: PropsType
) => {
  type PopulationDataType = {
    year: number;
    value: number;
  };
  const workMap: any = {};

  for (const pref of props.prefList) {
    const results: any = await getPerYear(pref.prefCode);

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
