import { getPrefectures } from "../util/API";
import React from "react";
import { PrefecturesV1ApiType, PrefectureType } from "../types/api/api";

/**
 * 都道府県の情報を設定する
 *
 * @param setPrefList setPrefList関数
 */
export const fetchPrefData = async (
  setPrefList: React.Dispatch<React.SetStateAction<PrefectureType[]>>
) => {
  const results: PrefecturesV1ApiType = await getPrefectures();
  const prefectures: PrefectureType[] = results.result;
  setPrefList(prefectures);
};
