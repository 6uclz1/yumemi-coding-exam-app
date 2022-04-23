import { getPrefectures } from "../util/API";
import React from "react";
import { PrefecturesV1ApiType, PrefectureType } from "../types/api/api";

export const fetchPrefData = async (
  setPrefList: React.Dispatch<React.SetStateAction<PrefectureType[]>>
) => {
  const results: PrefecturesV1ApiType = await getPrefectures();
  const prefectures: PrefectureType[] = results.result;
  setPrefList(prefectures);
};
