// https://opendata.resas-portal.go.jp/api/v1/prefectures

export type PrefectureType = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesV1ApiType = {
  message: null;
  result: PrefectureType[];
};
